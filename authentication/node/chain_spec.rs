use sc_service::ChainType;
use sp_core::sr25519;
use node_template_runtime::{AccountId, BalancesConfig, GenesisConfig, Signature, SudoConfig};

/// Specialized chain specification type for the node template
pub type ChainSpec = sc_service::GenericChainSpec<GenesisConfig>;

/// Generates an account ID from a seed phrase using SR25519 cryptography
fn generate_account_id_from_seed<TPublic: sp_core::crypto::Pair>(
    seed: &str,
) -> AccountId
where
    AccountId: From<<TPublic::Seed as sp_core::crypto::Pair>::Public>,
{
    TPublic::from_string(&format!("//{}", seed))
        .expect("Seed generation should never fail for static inputs")
        .public()
        .into()
}

/// Creates a development chain configuration with test accounts
pub fn development_config() -> Result<ChainSpec, String> {
    let mut chain_properties = sc_chain_spec::Properties::new();
    chain_properties.insert("tokenSymbol".into(), "UNIT".into());
    chain_properties.insert("tokenDecimals".into(), 12.into());

    Ok(ChainSpec::from_genesis(
        "Development Chain",
        "dev",
        ChainType::Development,
        move || {
            create_testnet_genesis(
                // Initial validator authorities
                vec![generate_account_id_from_seed::<sr25519::Pair>("Alice")],
                // Sudo (superuser) account
                generate_account_id_from_seed::<sr25519::Pair>("Alice"),
                // Pre-funded accounts
                vec![
                    generate_account_id_from_seed::<sr25519::Pair>("Alice"),
                    generate_account_id_from_seed::<sr25519::Pair>("Bob"),
                    generate_account_id_from_seed::<sr25519::Pair>("Charlie"),
                ],
            )
        },
        Vec::new(),    // Bootnodes
        None,          // Telemetry
        None,          // Protocol ID
        Some(chain_properties),
        None,          // Extensions
    ))
}

/// Constructs the initial storage state for FRAME pallets
fn create_testnet_genesis(
    authorities: Vec<AccountId>,
    sudo_key: AccountId,
    funded_accounts: Vec<AccountId>,
) -> GenesisConfig {
    GenesisConfig {
        frame_system: Some(node_template_runtime::SystemConfig {
            code: node_template_runtime::WASM_BINARY
                .expect("WASM binary unavailable - rebuild with WASM support")
                .to_vec(),
            changes_trie_config: Default::default(),
        }),
        
        pallet_balances: Some(BalancesConfig {
            balances: funded_accounts
                .into_iter()
                .map(|account| (account, 1_152_921_504_606_846_976)) // 1 << 60 = 1,152,921,504,606,846,976 units
                .collect(),
        }),
        
        pallet_sudo: Some(SudoConfig { 
            key: sudo_key 
        }),
        
        ..Default::default()
    }
}