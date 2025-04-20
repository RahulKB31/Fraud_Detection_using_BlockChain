use sc_service::{
    error::Error as ServiceError,
    Configuration,
    AbstractService,
};
use sp_runtime::traits::Block as BlockT;
use node_template_runtime::{
    self,
    opaque::Block,
    RuntimeApi,
};
use sc_executor::native_executor_instance;

// Native executor instance configuration
native_executor_instance!(
    pub Executor,
    node_template_runtime::api::dispatch,
    node_template_runtime::native_version,
);

/// Constructs a new full node service instance
pub fn new_full(config: Configuration) -> Result<impl AbstractService, ServiceError> {
    let inherent_data_providers = sp_inherents::InherentDataProviders::new();

    // Initialize core components
    let (client, backend, keystore_container, task_manager) = 
        sc_service::new_full_parts::<Block, RuntimeApi, Executor>(&config)?;
    let client = sc_service::Arc::new(client);

    // Chain selection strategy
    let select_chain = sc_consensus::LongestChain::new(backend.clone());

    // Transaction pool configuration
    let transaction_pool = sc_transaction_pool::BasicPool::new_full(
        config.transaction_pool.clone(),
        config.prometheus_registry(),
        task_manager.spawn_handle(),
        client.clone(),
    );

    // Import queue setup
    let import_queue = sc_consensus_manual_seal::import_queue(
        Box::new(client.clone()),
        &task_manager.spawn_handle(),
        config.prometheus_registry(),
    )?;

    // Network protocol configuration
    let network_protocol = node_template_runtime::opaque::Block::protocol_id();
    let network_config = sc_network::config::NetworkConfiguration::new(
        &config.network,
        network_protocol,
        client.clone(),
        client.version().clone(),
        config.prometheus_registry().as_ref(),
    );

    // Network worker initialization
    let network = sc_network::NetworkWorker::new(
        sc_network::config::FullNetworkConfiguration {
            network_config,
            client: client.clone(),
            import_queue,
            block_announce_validator_builder: None,
        }
    )?;

    // RPC extensions builder
    let rpc_extensions_builder = {
        let client = client.clone();
        let pool = transaction_pool.clone();

        Box::new(move |deny_unsafe, _| {
            let deps = crate::rpc::FullDeps {
                client: client.clone(),
                pool: pool.clone(),
                deny_unsafe,
            };

            crate::rpc::create_full(deps)
        })
    };

    // Assemble full service
    Ok(sc_service::new_full_base(
        config,
        client,
        backend,
        keystore_container,
        task_manager,
        inherent_data_providers,
        network,
        transaction_pool,
        rpc_extensions_builder,
        import_queue,
        None, // No custom block announcement validator
    )?)
}
