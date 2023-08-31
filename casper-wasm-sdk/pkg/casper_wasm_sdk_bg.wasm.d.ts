/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export function __wbg_dictionaryaddr_free(a: number): void;
export function dictionaryaddr_new(a: number, b: number, c: number): void;
export function __wbg_sessionstrparams_free(a: number): void;
export function sessionstrparams_new(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number, q: number, r: number, s: number, t: number): number;
export function sessionstrparams_session_hash(a: number, b: number): void;
export function sessionstrparams_set_session_hash(a: number, b: number, c: number): void;
export function sessionstrparams_session_name(a: number, b: number): void;
export function sessionstrparams_set_session_name(a: number, b: number, c: number): void;
export function sessionstrparams_session_package_hash(a: number, b: number): void;
export function sessionstrparams_set_session_package_hash(a: number, b: number, c: number): void;
export function sessionstrparams_session_package_name(a: number, b: number): void;
export function sessionstrparams_set_session_package_name(a: number, b: number, c: number): void;
export function sessionstrparams_session_path(a: number, b: number): void;
export function sessionstrparams_set_session_path(a: number, b: number, c: number): void;
export function sessionstrparams_session_args_simple(a: number): number;
export function sessionstrparams_set_session_args_simple(a: number, b: number): void;
export function sessionstrparams_session_args_json(a: number, b: number): void;
export function sessionstrparams_set_session_args_json(a: number, b: number, c: number): void;
export function sessionstrparams_session_args_complex(a: number, b: number): void;
export function sessionstrparams_set_session_args_complex(a: number, b: number, c: number): void;
export function sessionstrparams_session_version(a: number, b: number): void;
export function sessionstrparams_set_session_version(a: number, b: number, c: number): void;
export function sessionstrparams_session_entry_point(a: number, b: number): void;
export function sessionstrparams_set_session_entry_point(a: number, b: number, c: number): void;
export function sessionstrparams_is_session_transfer(a: number): number;
export function sessionstrparams_set_is_session_transfer(a: number, b: number): void;
export function __wbg_eraid_free(a: number): void;
export function eraid_new(a: number): number;
export function eraid_value(a: number): number;
export function __wbg_getblocktransfersoptions_free(a: number): void;
export function __wbg_get_getblocktransfersoptions_node_address(a: number, b: number): void;
export function __wbg_set_getblocktransfersoptions_node_address(a: number, b: number, c: number): void;
export function __wbg_get_getblocktransfersoptions_maybe_block_id_as_string(a: number, b: number): void;
export function __wbg_set_getblocktransfersoptions_maybe_block_id_as_string(a: number, b: number, c: number): void;
export function __wbg_get_getblocktransfersoptions_maybe_block_identifier(a: number): number;
export function __wbg_set_getblocktransfersoptions_maybe_block_identifier(a: number, b: number): void;
export function __wbg_get_getblocktransfersoptions_verbosity(a: number): number;
export function __wbg_set_getblocktransfersoptions_verbosity(a: number, b: number): void;
export function sdk_get_block_transfers_options(a: number, b: number): number;
export function sdk_get_block_transfers(a: number, b: number): number;
export function __wbg_transferaddr_free(a: number): void;
export function transferaddr_new(a: number, b: number, c: number): void;
export function fromTransfer(a: number, b: number): number;
export function __wbg_bytes_free(a: number): void;
export function bytes_new(): number;
export function __wbg_argssimple_free(a: number): void;
export function __wbg_getblockoptions_free(a: number): void;
export function __wbg_get_getblockoptions_node_address(a: number, b: number): void;
export function __wbg_set_getblockoptions_node_address(a: number, b: number, c: number): void;
export function __wbg_get_getblockoptions_maybe_block_id_as_string(a: number, b: number): void;
export function __wbg_set_getblockoptions_maybe_block_id_as_string(a: number, b: number, c: number): void;
export function __wbg_get_getblockoptions_maybe_block_identifier(a: number): number;
export function __wbg_set_getblockoptions_maybe_block_identifier(a: number, b: number): void;
export function __wbg_get_getblockoptions_verbosity(a: number): number;
export function __wbg_set_getblockoptions_verbosity(a: number, b: number): void;
export function sdk_get_block_options(a: number, b: number): number;
export function sdk_get_block(a: number, b: number): number;
export function sdk_chain_get_block(a: number, b: number): number;
export function __wbg_accounthash_free(a: number): void;
export function accounthash_new(a: number, b: number, c: number): void;
export function accounthash_fromFormattedStr(a: number, b: number, c: number): void;
export function accounthash_fromPublicKey(a: number): number;
export function accounthash_toFormattedString(a: number, b: number): void;
export function accounthash_fromUint8Array(a: number, b: number): number;
export function accounthash_toJson(a: number): number;
export function __wbg_deploystrparams_free(a: number): void;
export function deploystrparams_new(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number): number;
export function deploystrparams_secret_key(a: number, b: number): void;
export function deploystrparams_set_secret_key(a: number, b: number, c: number): void;
export function deploystrparams_timestamp(a: number, b: number): void;
export function deploystrparams_set_timestamp(a: number, b: number, c: number): void;
export function deploystrparams_setDefaultTimestamp(a: number): void;
export function deploystrparams_ttl(a: number, b: number): void;
export function deploystrparams_set_ttl(a: number, b: number, c: number): void;
export function deploystrparams_setDefaultTTL(a: number): void;
export function deploystrparams_chain_name(a: number, b: number): void;
export function deploystrparams_set_chain_name(a: number, b: number, c: number): void;
export function deploystrparams_session_account(a: number, b: number): void;
export function deploystrparams_set_session_account(a: number, b: number, c: number): void;
export function __wbg_dictionaryitemstrparams_free(a: number): void;
export function dictionaryitemstrparams_new(): number;
export function dictionaryitemstrparams_setAccountNamedKey(a: number, b: number, c: number, d: number, e: number, f: number, g: number): void;
export function dictionaryitemstrparams_setContractNamedKey(a: number, b: number, c: number, d: number, e: number, f: number, g: number): void;
export function dictionaryitemstrparams_setUref(a: number, b: number, c: number, d: number, e: number): void;
export function dictionaryitemstrparams_setDictionary(a: number, b: number, c: number): void;
export function dictionaryitemstrparams_toJson(a: number): number;
export function __wbg_publickey_free(a: number): void;
export function publickey_new(a: number, b: number, c: number): void;
export function publickey_fromUint8Array(a: number, b: number): number;
export function publickey_toJson(a: number): number;
export function __wbg_uref_free(a: number): void;
export function uref_new(a: number, b: number, c: number, d: number): void;
export function uref_fromUint8Array(a: number, b: number, c: number): number;
export function uref_toJson(a: number): number;
export function __wbg_getbalanceoptions_free(a: number): void;
export function __wbg_get_getbalanceoptions_node_address(a: number, b: number): void;
export function __wbg_set_getbalanceoptions_node_address(a: number, b: number, c: number): void;
export function __wbg_get_getbalanceoptions_state_root_hash_as_string(a: number, b: number): void;
export function __wbg_set_getbalanceoptions_state_root_hash_as_string(a: number, b: number, c: number): void;
export function __wbg_get_getbalanceoptions_state_root_hash(a: number): number;
export function __wbg_set_getbalanceoptions_state_root_hash(a: number, b: number): void;
export function __wbg_get_getbalanceoptions_purse_uref_as_string(a: number, b: number): void;
export function __wbg_set_getbalanceoptions_purse_uref_as_string(a: number, b: number, c: number): void;
export function __wbg_get_getbalanceoptions_purse_uref(a: number): number;
export function __wbg_set_getbalanceoptions_purse_uref(a: number, b: number): void;
export function __wbg_get_getbalanceoptions_verbosity(a: number): number;
export function __wbg_set_getbalanceoptions_verbosity(a: number, b: number): void;
export function sdk_get_balance_options(a: number, b: number): number;
export function sdk_get_balance(a: number, b: number): number;
export function sdk_state_get_balance(a: number, b: number): number;
export function __wbg_getdeployoptions_free(a: number): void;
export function __wbg_get_getdeployoptions_node_address(a: number, b: number): void;
export function __wbg_set_getdeployoptions_node_address(a: number, b: number, c: number): void;
export function __wbg_get_getdeployoptions_deploy_hash(a: number): number;
export function __wbg_set_getdeployoptions_deploy_hash(a: number, b: number): void;
export function __wbg_get_getdeployoptions_finalized_approvals(a: number): number;
export function __wbg_set_getdeployoptions_finalized_approvals(a: number, b: number): void;
export function __wbg_get_getdeployoptions_verbosity(a: number): number;
export function __wbg_set_getdeployoptions_verbosity(a: number, b: number): void;
export function sdk_get_deploy_options(a: number, b: number): number;
export function sdk_get_deploy(a: number, b: number): number;
export function sdk_info_get_deploy(a: number, b: number): number;
export function __wbg_getdictionaryitemoptions_free(a: number): void;
export function __wbg_get_getdictionaryitemoptions_node_address(a: number, b: number): void;
export function __wbg_set_getdictionaryitemoptions_node_address(a: number, b: number, c: number): void;
export function __wbg_get_getdictionaryitemoptions_state_root_hash_as_string(a: number, b: number): void;
export function __wbg_set_getdictionaryitemoptions_state_root_hash_as_string(a: number, b: number, c: number): void;
export function __wbg_get_getdictionaryitemoptions_state_root_hash(a: number): number;
export function __wbg_set_getdictionaryitemoptions_state_root_hash(a: number, b: number): void;
export function __wbg_get_getdictionaryitemoptions_dictionary_item_params(a: number): number;
export function __wbg_set_getdictionaryitemoptions_dictionary_item_params(a: number, b: number): void;
export function __wbg_get_getdictionaryitemoptions_dictionary_item_identifier(a: number): number;
export function __wbg_set_getdictionaryitemoptions_dictionary_item_identifier(a: number, b: number): void;
export function __wbg_get_getdictionaryitemoptions_verbosity(a: number): number;
export function __wbg_set_getdictionaryitemoptions_verbosity(a: number, b: number): void;
export function sdk_get_dictionary_item_options(a: number, b: number): number;
export function sdk_get_dictionary_item(a: number, b: number): number;
export function sdk_state_get_dictionary_item(a: number, b: number): number;
export function sdk_sign_deploy(a: number, b: number, c: number, d: number): number;
export function sdk_query_contract_dict_options(a: number, b: number): number;
export function sdk_query_contract_dict(a: number, b: number): number;
export function log(a: number, b: number): void;
export function error(a: number, b: number): void;
export function __wbg_querycontractdictoptions_free(a: number): void;
export function __wbg_get_querycontractdictoptions_verbosity(a: number): number;
export function __wbg_set_querycontractdictoptions_dictionary_item_params(a: number, b: number): void;
export function __wbg_set_getdeployoptions_deploy_hash_as_string(a: number, b: number, c: number): void;
export function __wbg_set_querycontractdictoptions_state_root_hash_as_string(a: number, b: number, c: number): void;
export function __wbg_set_querycontractdictoptions_state_root_hash(a: number, b: number): void;
export function __wbg_set_querycontractdictoptions_node_address(a: number, b: number, c: number): void;
export function __wbg_set_querycontractdictoptions_dictionary_item_identifier(a: number, b: number): void;
export function __wbg_get_querycontractdictoptions_state_root_hash(a: number): number;
export function __wbg_set_querycontractdictoptions_verbosity(a: number, b: number): void;
export function __wbg_get_getdeployoptions_deploy_hash_as_string(a: number, b: number): void;
export function __wbg_get_querycontractdictoptions_state_root_hash_as_string(a: number, b: number): void;
export function __wbg_get_querycontractdictoptions_dictionary_item_params(a: number): number;
export function __wbg_get_querycontractdictoptions_dictionary_item_identifier(a: number): number;
export function __wbg_get_querycontractdictoptions_node_address(a: number, b: number): void;
export function __wbg_accessrights_free(a: number): void;
export function accessrights_NONE(): number;
export function accessrights_READ(): number;
export function accessrights_WRITE(): number;
export function accessrights_ADD(): number;
export function accessrights_READ_ADD(): number;
export function accessrights_READ_WRITE(): number;
export function accessrights_ADD_WRITE(): number;
export function accessrights_READ_ADD_WRITE(): number;
export function accessrights_new(a: number, b: number): void;
export function accessrights_from_bits(a: number, b: number, c: number): number;
export function accessrights_is_readable(a: number): number;
export function accessrights_is_writeable(a: number): number;
export function accessrights_is_addable(a: number): number;
export function accessrights_is_none(a: number): number;
export function __wbg_blockhash_free(a: number): void;
export function blockhash_new(a: number, b: number, c: number): void;
export function blockhash_fromDigest(a: number, b: number): void;
export function blockhash_toJson(a: number): number;
export function contracthash_new(a: number, b: number, c: number): void;
export function contracthash_fromFormattedStr(a: number, b: number, c: number): void;
export function contracthash_toFormattedString(a: number, b: number): void;
export function contracthash_fromUint8Array(a: number, b: number): number;
export function contractpackagehash_new(a: number, b: number, c: number): void;
export function contractpackagehash_fromFormattedStr(a: number, b: number, c: number): void;
export function contractpackagehash_toFormattedString(a: number, b: number): void;
export function contractpackagehash_fromUint8Array(a: number, b: number): number;
export function __wbg_deploy_free(a: number): void;
export function deploy_new(a: number): number;
export function deploy_toJson(a: number): number;
export function deploy_withPaymentAndSession(a: number, b: number, c: number): number;
export function deploy_withTransfer(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number): number;
export function deploy_withTTL(a: number, b: number, c: number, d: number, e: number): number;
export function deploy_withTimestamp(a: number, b: number, c: number, d: number, e: number): number;
export function deploy_withChainName(a: number, b: number, c: number, d: number, e: number): number;
export function deploy_withAccount(a: number, b: number, c: number, d: number): number;
export function deploy_withEntryPoint(a: number, b: number, c: number, d: number, e: number): number;
export function deploy_withHash(a: number, b: number, c: number, d: number): number;
export function deploy_withPackageHash(a: number, b: number, c: number, d: number): number;
export function deploy_withModuleBytes(a: number, b: number, c: number, d: number): number;
export function deploy_withSecretKey(a: number, b: number, c: number): number;
export function deploy_withStandardPayment(a: number, b: number, c: number, d: number, e: number): number;
export function deploy_withPayment(a: number, b: number, c: number, d: number): number;
export function deploy_withSession(a: number, b: number, c: number, d: number): number;
export function deploy_validateDeploySize(a: number): number;
export function deploy_isValid(a: number): number;
export function deploy_hasValidHash(a: number): number;
export function deploy_isExpired(a: number): number;
export function deploy_sign(a: number, b: number, c: number): number;
export function deploy_footprint(a: number): number;
export function deploy_approvalsHash(a: number): number;
export function deploy_isTransfer(a: number): number;
export function deploy_isStandardPayment(a: number, b: number): number;
export function deploy_isStoredContract(a: number): number;
export function deploy_isStoredContractPackage(a: number): number;
export function deploy_isModuleBytes(a: number): number;
export function deploy_isByName(a: number): number;
export function deploy_byName(a: number, b: number): void;
export function deploy_entryPointName(a: number, b: number): void;
export function deploy_paymentAmount(a: number, b: number): number;
export function deploy_args(a: number): number;
export function deploy_addArg(a: number, b: number, c: number, d: number): number;
export function deployhash_new(a: number, b: number, c: number): void;
export function deployhash_fromDigest(a: number, b: number): void;
export function deployhash_toJson(a: number): number;
export function __wbg_paymentstrparams_free(a: number): void;
export function paymentstrparams_new(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number, q: number, r: number, s: number, t: number, u: number): number;
export function paymentstrparams_payment_amount(a: number, b: number): void;
export function paymentstrparams_set_payment_amount(a: number, b: number, c: number): void;
export function paymentstrparams_payment_hash(a: number, b: number): void;
export function paymentstrparams_set_payment_hash(a: number, b: number, c: number): void;
export function paymentstrparams_payment_name(a: number, b: number): void;
export function paymentstrparams_set_payment_name(a: number, b: number, c: number): void;
export function paymentstrparams_payment_package_hash(a: number, b: number): void;
export function paymentstrparams_set_payment_package_hash(a: number, b: number, c: number): void;
export function paymentstrparams_payment_package_name(a: number, b: number): void;
export function paymentstrparams_set_payment_package_name(a: number, b: number, c: number): void;
export function paymentstrparams_payment_path(a: number, b: number): void;
export function paymentstrparams_set_payment_path(a: number, b: number, c: number): void;
export function paymentstrparams_payment_args_simple(a: number): number;
export function paymentstrparams_set_payment_args_simple(a: number, b: number): void;
export function paymentstrparams_payment_args_json(a: number, b: number): void;
export function paymentstrparams_set_payment_args_json(a: number, b: number, c: number): void;
export function paymentstrparams_payment_args_complex(a: number, b: number): void;
export function paymentstrparams_set_payment_args_complex(a: number, b: number, c: number): void;
export function paymentstrparams_payment_version(a: number, b: number): void;
export function paymentstrparams_set_payment_version(a: number, b: number, c: number): void;
export function paymentstrparams_payment_entry_point(a: number, b: number): void;
export function paymentstrparams_set_payment_entry_point(a: number, b: number, c: number): void;
export function __wbg_dictionaryitemidentifier_free(a: number): void;
export function dictionaryitemidentifier_newFromAccountInfo(a: number, b: number, c: number, d: number, e: number, f: number, g: number): void;
export function dictionaryitemidentifier_newFromContractInfo(a: number, b: number, c: number, d: number, e: number, f: number, g: number): void;
export function dictionaryitemidentifier_newFromSeedUref(a: number, b: number, c: number, d: number, e: number): void;
export function dictionaryitemidentifier_newFromDictionaryKey(a: number, b: number, c: number): void;
export function dictionaryitemidentifier_toJson(a: number): number;
export function digest__new(a: number, b: number, c: number): void;
export function digest_fromDigest(a: number, b: number, c: number): void;
export function digest_toJson(a: number): number;
export function __wbg_key_free(a: number): void;
export function key_new(a: number, b: number): void;
export function key_toJson(a: number): number;
export function key_fromURef(a: number): number;
export function key_fromDeployInfo(a: number): number;
export function key_fromAccount(a: number): number;
export function key_fromHash(a: number): number;
export function key_fromTransfer(a: number, b: number): number;
export function key_fromEraInfo(a: number): number;
export function key_fromBalance(a: number): number;
export function key_fromBid(a: number): number;
export function key_fromWithdraw(a: number): number;
export function key_fromDictionaryAddr(a: number): number;
export function key_asDictionaryAddr(a: number): number;
export function key_fromSystemContractRegistry(): number;
export function key_fromEraSummary(): number;
export function key_fromUnbond(a: number): number;
export function key_fromChainspecRegistry(): number;
export function key_fromChecksumRegistry(): number;
export function key_toFormattedString(a: number, b: number): void;
export function key_fromFormattedString(a: number, b: number): void;
export function key_fromDictionaryKey(a: number, b: number, c: number): number;
export function key_isDictionaryKey(a: number): number;
export function key_intoAccount(a: number): number;
export function key_intoHash(a: number): number;
export function key_asBalance(a: number): number;
export function key_intoURef(a: number): number;
export function key_urefToHash(a: number): number;
export function key_withdrawToUnbond(a: number): number;
export function sdk_transfer(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number): number;
export function __wbg_geterainfooptions_free(a: number): void;
export function __wbg_get_geterainfooptions_node_address(a: number, b: number): void;
export function __wbg_set_geterainfooptions_node_address(a: number, b: number, c: number): void;
export function __wbg_get_geterainfooptions_maybe_block_id_as_string(a: number, b: number): void;
export function __wbg_set_geterainfooptions_maybe_block_id_as_string(a: number, b: number, c: number): void;
export function __wbg_get_geterainfooptions_maybe_block_identifier(a: number): number;
export function __wbg_set_geterainfooptions_maybe_block_identifier(a: number, b: number): void;
export function __wbg_get_geterainfooptions_verbosity(a: number): number;
export function __wbg_set_geterainfooptions_verbosity(a: number, b: number): void;
export function sdk_get_era_info_options(a: number, b: number): number;
export function sdk_get_era_info(a: number, b: number): number;
export function sdk_get_era_summary_options(a: number, b: number): number;
export function sdk_get_era_summary(a: number, b: number): number;
export function sdk_get_peers(a: number, b: number, c: number, d: number): number;
export function sdk_get_state_root_hash_options(a: number, b: number): number;
export function sdk_get_state_root_hash(a: number, b: number): number;
export function sdk_chain_get_state_root_hash(a: number, b: number): number;
export function __wbg_getspeculativeexecoptions_free(a: number): void;
export function __wbg_get_getspeculativeexecoptions_node_address(a: number, b: number): void;
export function __wbg_set_getspeculativeexecoptions_node_address(a: number, b: number, c: number): void;
export function __wbg_get_getspeculativeexecoptions_deploy_as_string(a: number, b: number): void;
export function __wbg_set_getspeculativeexecoptions_deploy_as_string(a: number, b: number, c: number): void;
export function __wbg_get_getspeculativeexecoptions_deploy(a: number): number;
export function __wbg_set_getspeculativeexecoptions_deploy(a: number, b: number): void;
export function __wbg_get_getspeculativeexecoptions_maybe_block_id_as_string(a: number, b: number): void;
export function __wbg_set_getspeculativeexecoptions_maybe_block_id_as_string(a: number, b: number, c: number): void;
export function __wbg_get_getspeculativeexecoptions_maybe_block_identifier(a: number): number;
export function __wbg_set_getspeculativeexecoptions_maybe_block_identifier(a: number, b: number): void;
export function __wbg_get_getspeculativeexecoptions_verbosity(a: number): number;
export function __wbg_set_getspeculativeexecoptions_verbosity(a: number, b: number): void;
export function sdk_get_speculative_exec_options(a: number, b: number): number;
export function sdk_speculative_exec(a: number, b: number): number;
export function sdk_make_deploy(a: number, b: number, c: number, d: number): number;
export function __wbg_get_geterasummaryoptions_verbosity(a: number): number;
export function __wbg_get_getstateroothashoptions_verbosity(a: number): number;
export function __wbg_set_geterasummaryoptions_maybe_block_id_as_string(a: number, b: number, c: number): void;
export function __wbg_set_getstateroothashoptions_block_id_as_string(a: number, b: number, c: number): void;
export function __wbg_set_geterasummaryoptions_maybe_block_identifier(a: number, b: number): void;
export function __wbg_set_getstateroothashoptions_block_identifier(a: number, b: number): void;
export function sdk_new(): number;
export function __wbg_get_geterasummaryoptions_maybe_block_identifier(a: number): number;
export function __wbg_get_getstateroothashoptions_block_identifier(a: number): number;
export function __wbg_set_geterasummaryoptions_node_address(a: number, b: number, c: number): void;
export function __wbg_set_getstateroothashoptions_node_address(a: number, b: number, c: number): void;
export function __wbg_geterasummaryoptions_free(a: number): void;
export function __wbg_getstateroothashoptions_free(a: number): void;
export function __wbg_sdk_free(a: number): void;
export function digest_fromString(a: number, b: number, c: number): void;
export function __wbg_set_geterasummaryoptions_verbosity(a: number, b: number): void;
export function __wbg_set_getstateroothashoptions_verbosity(a: number, b: number): void;
export function __wbg_contracthash_free(a: number): void;
export function __wbg_contractpackagehash_free(a: number): void;
export function __wbg_deployhash_free(a: number): void;
export function __wbg_digest_free(a: number): void;
export function __wbg_get_geterasummaryoptions_maybe_block_id_as_string(a: number, b: number): void;
export function __wbg_get_getstateroothashoptions_block_id_as_string(a: number, b: number): void;
export function __wbg_get_geterasummaryoptions_node_address(a: number, b: number): void;
export function __wbg_get_getstateroothashoptions_node_address(a: number, b: number): void;
export function sdk_get_validator_changes(a: number, b: number, c: number, d: number): number;
export function __wbg_urefaddr_free(a: number): void;
export function urefaddr_new(a: number, b: number, c: number): void;
export function __wbg_blockidentifier_free(a: number): void;
export function blockidentifier_new(a: number): number;
export function blockidentifier_from_hash(a: number): number;
export function blockidentifier_fromHeight(a: number): number;
export function blockidentifier_toJson(a: number): number;
export function globalstateidentifier_fromStateRootHash(a: number): number;
export function globalstateidentifier_toJson(a: number): number;
export function __wbg_path_free(a: number): void;
export function path_new(a: number): number;
export function path_toJson(a: number): number;
export function path_toString(a: number, b: number): void;
export function __wbg_purseidentifier_free(a: number): void;
export function purseidentifier_fromPublicKey(a: number): number;
export function purseidentifier_fromAccountHash(a: number): number;
export function purseidentifier_fromURef(a: number): number;
export function sdk_deploy(a: number, b: number, c: number, d: number, e: number, f: number, g: number): number;
export function __wbg_getaccountoptions_free(a: number): void;
export function __wbg_get_getaccountoptions_node_address(a: number, b: number): void;
export function __wbg_set_getaccountoptions_node_address(a: number, b: number, c: number): void;
export function __wbg_get_getaccountoptions_account_identifier(a: number, b: number): void;
export function __wbg_set_getaccountoptions_account_identifier(a: number, b: number, c: number): void;
export function __wbg_get_getaccountoptions_public_key(a: number): number;
export function __wbg_set_getaccountoptions_public_key(a: number, b: number): void;
export function __wbg_get_getaccountoptions_maybe_block_id_as_string(a: number, b: number): void;
export function __wbg_set_getaccountoptions_maybe_block_id_as_string(a: number, b: number, c: number): void;
export function __wbg_get_getaccountoptions_maybe_block_identifier(a: number): number;
export function __wbg_set_getaccountoptions_maybe_block_identifier(a: number, b: number): void;
export function __wbg_get_getaccountoptions_verbosity(a: number): number;
export function __wbg_set_getaccountoptions_verbosity(a: number, b: number): void;
export function sdk_get_account_options(a: number, b: number): number;
export function sdk_get_account(a: number, b: number): number;
export function sdk_state_get_account_info(a: number, b: number): number;
export function __wbg_getauctioninfooptions_free(a: number): void;
export function __wbg_get_getauctioninfooptions_node_address(a: number, b: number): void;
export function __wbg_set_getauctioninfooptions_node_address(a: number, b: number, c: number): void;
export function __wbg_get_getauctioninfooptions_maybe_block_id_as_string(a: number, b: number): void;
export function __wbg_set_getauctioninfooptions_maybe_block_id_as_string(a: number, b: number, c: number): void;
export function __wbg_get_getauctioninfooptions_maybe_block_identifier(a: number): number;
export function __wbg_set_getauctioninfooptions_maybe_block_identifier(a: number, b: number): void;
export function __wbg_get_getauctioninfooptions_verbosity(a: number): number;
export function __wbg_set_getauctioninfooptions_verbosity(a: number, b: number): void;
export function sdk_get_auction_info_options(a: number, b: number): number;
export function sdk_get_auction_info(a: number, b: number): number;
export function __wbg_querybalanceoptions_free(a: number): void;
export function __wbg_get_querybalanceoptions_purse_identifier(a: number): number;
export function __wbg_set_querybalanceoptions_purse_identifier(a: number, b: number): void;
export function __wbg_get_querybalanceoptions_verbosity(a: number): number;
export function __wbg_set_querybalanceoptions_verbosity(a: number, b: number): void;
export function __wbg_get_querybalanceoptions_global_state_identifier(a: number): number;
export function __wbg_set_querybalanceoptions_global_state_identifier(a: number, b: number): void;
export function __wbg_get_querybalanceoptions_state_root_hash_as_string(a: number, b: number): void;
export function __wbg_set_querybalanceoptions_state_root_hash_as_string(a: number, b: number, c: number): void;
export function __wbg_get_querybalanceoptions_state_root_hash(a: number): number;
export function __wbg_set_querybalanceoptions_state_root_hash(a: number, b: number): void;
export function __wbg_get_querybalanceoptions_maybe_block_id_as_string(a: number, b: number): void;
export function __wbg_set_querybalanceoptions_maybe_block_id_as_string(a: number, b: number, c: number): void;
export function sdk_query_balance_options(a: number, b: number): number;
export function sdk_query_balance(a: number, b: number): number;
export function __wbg_queryglobalstateoptions_free(a: number): void;
export function __wbg_get_queryglobalstateoptions_node_address(a: number, b: number): void;
export function __wbg_set_queryglobalstateoptions_node_address(a: number, b: number, c: number): void;
export function __wbg_get_queryglobalstateoptions_global_state_identifier_as_string(a: number, b: number): void;
export function __wbg_set_queryglobalstateoptions_global_state_identifier_as_string(a: number, b: number, c: number): void;
export function __wbg_get_queryglobalstateoptions_global_state_identifier(a: number): number;
export function __wbg_set_queryglobalstateoptions_global_state_identifier(a: number, b: number): void;
export function __wbg_get_queryglobalstateoptions_state_root_hash_as_string(a: number, b: number): void;
export function __wbg_set_queryglobalstateoptions_state_root_hash_as_string(a: number, b: number, c: number): void;
export function __wbg_get_queryglobalstateoptions_state_root_hash(a: number): number;
export function __wbg_set_queryglobalstateoptions_state_root_hash(a: number, b: number): void;
export function __wbg_get_queryglobalstateoptions_maybe_block_id_as_string(a: number, b: number): void;
export function __wbg_set_queryglobalstateoptions_maybe_block_id_as_string(a: number, b: number, c: number): void;
export function __wbg_get_queryglobalstateoptions_key_as_string(a: number, b: number): void;
export function __wbg_set_queryglobalstateoptions_key_as_string(a: number, b: number, c: number): void;
export function __wbg_get_queryglobalstateoptions_path_as_string(a: number, b: number): void;
export function __wbg_set_queryglobalstateoptions_path_as_string(a: number, b: number, c: number): void;
export function __wbg_get_queryglobalstateoptions_path(a: number): number;
export function __wbg_set_queryglobalstateoptions_path(a: number, b: number): void;
export function __wbg_get_queryglobalstateoptions_verbosity(a: number): number;
export function __wbg_set_queryglobalstateoptions_verbosity(a: number, b: number): void;
export function sdk_query_global_state_options(a: number, b: number): number;
export function sdk_query_global_state(a: number, b: number): number;
export function sdk_make_transfer(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number): number;
export function __wbg_querycontractkeyoptions_free(a: number): void;
export function __wbg_get_querycontractkeyoptions_node_address(a: number, b: number): void;
export function __wbg_set_querycontractkeyoptions_node_address(a: number, b: number, c: number): void;
export function __wbg_get_querycontractkeyoptions_state_root_hash_as_string(a: number, b: number): void;
export function __wbg_set_querycontractkeyoptions_state_root_hash_as_string(a: number, b: number, c: number): void;
export function __wbg_get_querycontractkeyoptions_state_root_hash(a: number): number;
export function __wbg_set_querycontractkeyoptions_state_root_hash(a: number, b: number): void;
export function __wbg_get_querycontractkeyoptions_maybe_block_id_as_string(a: number, b: number): void;
export function __wbg_set_querycontractkeyoptions_maybe_block_id_as_string(a: number, b: number, c: number): void;
export function __wbg_get_querycontractkeyoptions_contract_key_as_string(a: number, b: number): void;
export function __wbg_set_querycontractkeyoptions_contract_key_as_string(a: number, b: number, c: number): void;
export function __wbg_get_querycontractkeyoptions_contract_key(a: number): number;
export function __wbg_set_querycontractkeyoptions_contract_key(a: number, b: number): void;
export function __wbg_get_querycontractkeyoptions_path_as_string(a: number, b: number): void;
export function __wbg_set_querycontractkeyoptions_path_as_string(a: number, b: number, c: number): void;
export function __wbg_get_querycontractkeyoptions_path(a: number): number;
export function __wbg_set_querycontractkeyoptions_path(a: number, b: number): void;
export function __wbg_get_querycontractkeyoptions_verbosity(a: number): number;
export function __wbg_set_querycontractkeyoptions_verbosity(a: number, b: number): void;
export function sdk_query_contract_key_options(a: number, b: number): number;
export function sdk_query_contract_key(a: number, b: number): number;
export function hexToString(a: number, b: number, c: number): void;
export function hexToUint8Array(a: number, b: number, c: number): void;
export function jsonPrettyPrint(a: number, b: number): number;
export function privateToPublicKey(a: number, b: number): number;
export function getTimestamp(): number;
export function globalstateidentifier_fromBlockHeight(a: number): number;
export function __wbg_set_querybalanceoptions_purse_identifier_as_string(a: number, b: number, c: number): void;
export function __wbg_set_querybalanceoptions_global_state_identifier_as_string(a: number, b: number, c: number): void;
export function __wbg_set_queryglobalstateoptions_key(a: number, b: number): void;
export function globalstateidentifier_fromBlockHash(a: number): number;
export function __wbg_get_queryglobalstateoptions_key(a: number): number;
export function __wbg_set_querybalanceoptions_node_address(a: number, b: number, c: number): void;
export function __wbg_globalstateidentifier_free(a: number): void;
export function __wbg_get_querybalanceoptions_purse_identifier_as_string(a: number, b: number): void;
export function __wbg_get_querybalanceoptions_global_state_identifier_as_string(a: number, b: number): void;
export function __wbg_get_querybalanceoptions_node_address(a: number, b: number): void;
export function globalstateidentifier_new(a: number): number;
export function __wbg_hashaddr_free(a: number): void;
export function hashaddr_new(a: number, b: number, c: number): void;
export function sdk_get_node_status(a: number, b: number, c: number, d: number): number;
export function sdk_put_deploy(a: number, b: number, c: number, d: number, e: number): number;
export function sdk_account_put_deploy(a: number, b: number, c: number, d: number, e: number): number;
export function sdk_install(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number): number;
export function sdk_speculative_deploy(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number): number;
export function sdk_speculative_transfer(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number): number;
export function sdk_get_chainspec(a: number, b: number, c: number, d: number): number;
export function sdk_list_rpcs(a: number, b: number, c: number, d: number): number;
export function sdk_call_entrypoint(a: number, b: number, c: number, d: number, e: number, f: number, g: number): number;
export function __wbindgen_malloc(a: number, b: number): number;
export function __wbindgen_realloc(a: number, b: number, c: number, d: number): number;
export const __wbindgen_export_2: WebAssembly.Table;
export function wasm_bindgen__convert__closures__invoke1_mut__hf4f051b17cdcd1a7(a: number, b: number, c: number): void;
export function __wbindgen_add_to_stack_pointer(a: number): number;
export function __wbindgen_free(a: number, b: number, c: number): void;
export function __wbindgen_exn_store(a: number): void;
export function wasm_bindgen__convert__closures__invoke2_mut__h2d860cbe7308b412(a: number, b: number, c: number, d: number): void;
