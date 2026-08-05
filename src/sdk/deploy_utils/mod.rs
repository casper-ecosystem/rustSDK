#![allow(deprecated)]

pub(crate) mod make_deploy;
#[allow(deprecated)]
pub(crate) use make_deploy::make_deploy;

pub(crate) mod make_transfer;
#[allow(deprecated)]
pub(crate) use make_transfer::make_transfer;

pub(crate) mod sign_deploy;
