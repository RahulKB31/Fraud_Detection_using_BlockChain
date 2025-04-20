/// Module declarations for runtime pallets
pub mod product_auth;

/// Public exports of pallet interfaces for runtime composition
pub use product_auth::*;

#[cfg(feature = "std")]
pub use product_auth::pallet::*;