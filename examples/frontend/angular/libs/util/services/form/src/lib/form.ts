import { config } from "@util/config";
import { PricingMode } from "casper-sdk";

export type option = {
  value: string,
  label: string;
  default?: boolean;
};

export type InputField = {
  id: string;
  type?: string;
  wrap_class?: string;
  class: string;
  label: string;
  label_class?: string;
  name: string;
  controlName: string;
  placeholder?: string;
  e2e: string;
  state_name?: string[];
  storage_name?: string;
  config_name?: string;
  maxlength?: string,
  pattern?: string,
  placeholder_config_value?: string;
  change?: string;
  disabled_when?: string[];
  options?: option[];
  enabled_when?: string[];
  required?: boolean;
  hidden?: boolean;
};

export type InputContainer = {
  input?: InputField;
  textarea?: InputField;
  select?: InputField;
  required?: boolean;
  wasm_button?: boolean;
  file_button?: boolean;
};

const blockIdentifierHeight: InputField = {
  id: 'blockIdentifierHeightElt',
  type: 'search',
  wrap_class: 'col-lg-3 col-xl-2 mb-2',
  class: 'form-control',
  label: 'Block Height',
  name: 'block_identifier_height',
  controlName: 'blockIdentifierHeight',
  placeholder: 'Block Height',
  e2e: 'blockIdentifierHeightElt',
};

const blockIdentifierHash: InputField = {
  id: 'blockIdentifierHashElt',
  type: 'search',
  wrap_class: 'col-lg-9 col-xl-8 mb-2',
  class: 'form-control',
  label: 'Block Hash',
  name: 'block_identifier_hash',
  controlName: 'blockIdentifierHash',
  placeholder: 'Block Hash',
  e2e: 'blockIdentifierHashElt',
};

const eraId: InputField = {
  id: 'eraId',
  type: 'search',
  wrap_class: 'col-lg-3 col-xl-2 mb-2',
  class: 'form-control',
  label: 'Era Id',
  name: 'era_id',
  controlName: 'eraId',
  placeholder: 'Era Id',
  e2e: 'eraIdElt',
};

const recordId: InputField = {
  id: 'recordId',
  type: 'search',
  wrap_class: 'col-lg-3 col-xl-2 mb-2',
  class: 'form-control',
  label: 'Record Id',
  name: 'record_id',
  controlName: 'recordId',
  placeholder: 'Record Id',
  e2e: 'recordIdElt',
};

const validatorKey: InputField = {
  id: 'validatorKey',
  type: 'search',
  wrap_class: 'col-lg-9 mb-2',
  class: 'form-control',
  label: 'Validator Key',
  name: 'validator_key',
  controlName: 'validatorKey',
  placeholder: 'Validator Key',
  e2e: 'validatorKeyElt',
};

const delegatorKey: InputField = {
  id: 'delegatorKey',
  type: 'search',
  wrap_class: 'col-lg-9',
  class: 'form-control',
  label: 'Delegator Key',
  name: 'delegator_key',
  controlName: 'delegatorKey',
  placeholder: 'Delegator Key',
  e2e: 'delegatorKeyElt',
};

const key: InputField = {
  id: 'key',
  type: 'search',
  wrap_class: 'col-lg-9',
  class: 'form-control',
  label: 'Key',
  name: 'key',
  controlName: 'key',
  placeholder: 'Key',
  e2e: 'KeyElt',
};

const accountIdentifier: InputField = {
  id: 'accountIdentifierElt',
  type: 'search',
  wrap_class: 'col-lg-9',
  class: 'form-control',
  label: 'Account identifier',
  name: 'account_identifier',
  controlName: 'accountIdentifier',
  placeholder: 'Public Key, AccountHash',
  e2e: 'accountIdentifierElt',
  state_name: ['account_hash', 'public_key'],
};

const entityIdentifier: InputField = {
  id: 'entityIdentifierElt',
  type: 'search',
  wrap_class: 'col-lg-9',
  class: 'form-control',
  label: 'Entity identifier',
  name: 'entity_identifier',
  controlName: 'entityIdentifier',
  placeholder: 'Public Key, AccountHash, Entity',
  e2e: 'entityIdentifierElt',
  state_name: ['account_hash', 'public_key', 'entity'],
};

const stateRootHash: InputField = {
  id: 'stateRootHashElt',
  type: 'search',
  wrap_class: 'col-xl-8 mb-2',
  class: 'form-control',
  label: 'State Root Hash',
  name: 'state_root_hash',
  controlName: 'stateRootHash',
  placeholder: '0x',
  e2e: 'stateRootHashElt',
};

const purseUref: InputField = {
  id: 'purseUrefElt',
  type: 'search',
  wrap_class: 'col-xl-8 mb-2',
  class: 'form-control',
  label: 'Purse Uref',
  name: 'purse_uref',
  controlName: 'purseUref',
  placeholder: 'uref-0x',
  e2e: 'purseUrefElt',
  state_name: ['main_purse'],
};

const purseIdentifier: InputField = {
  id: 'purseIdentifierElt',
  type: 'search',
  wrap_class: 'col-xl-8 mb-2',
  class: 'form-control',
  label: 'Purse Identifier',
  name: 'purse_identifier',
  controlName: 'purseIdentifier',
  placeholder: 'Public Key, AccountHash, Purse URef',
  e2e: 'purseIdentifierElt',
  state_name: ['main_purse', 'account_hash', 'public_key'],
};

const transferAmount: InputField = {
  id: 'transferAmountElt',
  type: 'tel',
  wrap_class: 'col-lg-3 mb-2',
  class: 'form-control',
  label: 'Transfer Amount',
  name: 'transfer_amount',
  controlName: 'transferAmount',
  e2e: 'transferAmountElt',
  config_name: 'minimum_transfer',
  maxlength: "28",
  pattern: "\\d*",
  change: "motesToCSPR"
};

const paymentAmount: InputField = {
  id: 'paymentAmountElt',
  type: 'tel',
  wrap_class: 'col-lg-3 mb-2',
  class: 'form-control',
  label: 'Payment Amount',
  name: 'payment_amount',
  controlName: 'paymentAmount',
  placeholder: '',
  e2e: 'paymentAmountElt',
  change: "motesToCSPR"
};

const ttlInput: InputField = {
  id: 'TTLElt',
  type: 'search',
  wrap_class: 'col-lg-2 mb-2',
  class: 'form-control',
  label: 'TTL',
  name: 'ttl',
  controlName: 'TTL',
  e2e: 'TTLElt',
  config_name: 'TTL',
};

const targetAccount: InputField = {
  id: 'targetAccountElt',
  type: 'search',
  wrap_class: 'col-xl-9',
  class: 'form-control',
  label: 'Target Account',
  name: 'target_account',
  controlName: 'targetAccount',
  placeholder: 'Public Key, AccountHash, Purse URef',
  e2e: 'targetAccountElt',
};

const sessionHash: InputField = {
  id: 'sessionHashElt',
  type: 'search',
  wrap_class: 'col-xl-6 mb-2',
  class: 'form-control',
  label: 'Smart Contract hash or Package hash',
  name: 'session_hash',
  controlName: 'sessionHash',
  placeholder: 'Contract Hash or Package Hash',
  e2e: 'sessionHashElt',
  disabled_when: ['has_wasm', 'sessionName.value']
};

const entityHash: InputField = {
  id: 'entityHashElt',
  type: 'search',
  wrap_class: 'col-xl-6 mb-2',
  class: 'form-control',
  label: 'Entity hash or Package hash',
  name: 'entity_hash',
  controlName: 'entityHash',
  placeholder: 'Entity Hash (entity-contract-0x) or Package Hash (package-0x)',
  e2e: 'entityHashElt',
  disabled_when: ['has_wasm', 'entityAlias.value']
};



const callPackage: InputField = {
  id: 'callPackageElt',
  type: 'checkbox',
  wrap_class: 'col-xl-1 col-lg-2 mb-2',
  class: 'form-check-input mt-0',
  label: 'Call Package',
  name: 'call_package',
  controlName: 'callPackage',
  placeholder: '',
  e2e: 'callPackageElt',
  label_class: 'form-label',
  disabled_when: ['has_wasm']
};

const versionInput: InputField = {
  id: 'versionElt',
  type: 'search',
  wrap_class: 'col-xl-3 mb-2',
  class: 'form-control',
  label: 'Version',
  name: 'version',
  controlName: 'version',
  placeholder: '1, empty last',
  e2e: 'versionElt',
  disabled_when: ['has_wasm']
};

const gasPriceTolerance: InputField = {
  id: 'gasPriceToleranceElt',
  type: 'search',
  wrap_class: 'col-xl-2 mb-2',
  class: 'form-control',
  label: 'Gas Price Tolerance',
  name: 'gas_price_tolerance',
  controlName: 'gasPriceTolerance',
  placeholder: '1, empty default',
  e2e: 'gasPriceToleranceElt'
};

const additionalComputationFactor: InputField = {
  id: 'additionalComputationFactorElt',
  type: 'search',
  wrap_class: 'col-xl-2 mb-2',
  class: 'form-control',
  label: 'Computation Factor',
  name: 'additional_computation_factor',
  controlName: 'additionalComputationFactor',
  placeholder: '0, empty default',
  e2e: 'additionalComputationFactorElt',
  disabled_when: ['fixedPricingMode']
};

const sessionNameInput: InputField = {
  id: 'sessionNameElt',
  type: 'search',
  wrap_class: 'col-xl-8 mb-2',
  class: 'form-control',
  label: 'Smart Contract name or Package name',
  name: 'session_name',
  controlName: 'sessionName',
  placeholder: 'Counter',
  e2e: 'sessionNameElt',
  disabled_when: ['has_wasm', 'sessionHash.value']
};

const entityAlias: InputField = {
  id: 'entityAliasElt',
  type: 'search',
  wrap_class: 'col-xl-8 mb-2',
  class: 'form-control',
  label: 'Entity alias or Package alias',
  name: 'entity_alias',
  controlName: 'entityAlias',
  placeholder: 'Counter',
  e2e: 'entityAliasElt',
  disabled_when: ['has_wasm', 'entityHash.value']
};

const entryPointInput: InputField = {
  id: 'entryPointElt',
  type: 'search',
  wrap_class: 'col-lg-5 mb-2',
  class: 'form-control',
  label: 'Entry point',
  name: 'entry_point',
  controlName: 'entryPoint',
  placeholder: 'counter_inc',
  e2e: 'entryPointElt',
  disabled_when: ['has_wasm']
};

const argsSimpleInput: InputField = {
  id: 'argsSimpleElt',
  type: 'search',
  wrap_class: 'col-lg-8 mb-2',
  class: 'form-control',
  label: 'Args',
  name: 'args_simple',
  controlName: 'argsSimple',
  placeholder: 'foo:Bool=\'true\', bar:String=\'value\'',
  e2e: 'argsSimpleElt',
  disabled_when: ['argsJson.value'],
  storage_name: 'args_simple',
};

const argsJson: InputField = {
  id: 'argsJsonElt',
  type: 'textarea',
  wrap_class: 'col-lg-8 mb-2',
  class: 'form-control',
  label: 'Args Json',
  name: 'args_json',
  controlName: 'argsJson',
  placeholder: 'Args as Json [{ "name": "foo", "type": "U256", "value": 1 }]',
  e2e: 'argsJsonElt',
  disabled_when: ['argsSimple.value'],
  storage_name: 'args_json',
};

const deployHash: InputField = {
  id: 'deployHashElt',
  type: 'search',
  wrap_class: 'col-xl-7',
  class: 'form-control',
  label: 'Deploy Hash',
  name: 'deploy_hash',
  controlName: 'deployHash',
  placeholder: '0x',
  e2e: 'deployHashElt',
};

const transactionHash: InputField = {
  id: 'transactionHashElt',
  type: 'search',
  wrap_class: 'col-xl-7',
  class: 'form-control',
  label: 'Transaction Hash',
  name: 'transaction_hash',
  controlName: 'transactionHash',
  placeholder: '0x',
  e2e: 'transactionHashElt',
};

const finalizedApprovals: InputField = {
  id: 'finalizedApprovalsElt',
  type: 'checkbox',
  wrap_class: 'col-lg-3 mt-3 mt-xl-0',
  class: 'form-check-input mt-0',
  label: 'Finalized approvals',
  name: 'finalized_approvals',
  controlName: 'finalizedApprovals',
  placeholder: '',
  e2e: 'finalizedApprovalsElt',
  label_class: 'form-label',
};

const seedUref: InputField = {
  id: 'seedUrefElt',
  type: 'search',
  wrap_class: 'col-xl-8 mb-2',
  class: 'form-control',
  label: 'Dictionary Uref',
  name: 'seed_uref',
  controlName: 'seedUref',
  placeholder: 'uref-0x',
  e2e: 'seedUrefElt',
  enabled_when: ['newFromSeedUref']
};

const seedAccountHash: InputField = {
  id: 'seedAccountHashElt',
  type: 'search',
  wrap_class: 'col-xl-8 mb-2',
  class: 'form-control',
  label: 'Account Hash',
  name: 'seed_account_hash',
  controlName: 'seedAccountHash',
  placeholder: 'account-hash-0x',
  e2e: 'seedAccountHashElt',
  enabled_when: ['newFromAccountInfo']
};

const seedContractHash: InputField = {
  id: 'seedContractHashElt',
  type: 'search',
  wrap_class: 'col-xl-8 mb-2',
  class: 'form-control',
  label: 'Contract Hash',
  name: 'seed_contract_hash',
  controlName: 'seedContractHash',
  placeholder: 'hash-0x',
  e2e: 'seedContractHashElt',
  enabled_when: ['newFromContractInfo']
};

const seedEntityHash: InputField = {
  id: 'seedEntityHashElt',
  type: 'search',
  wrap_class: 'col-xl-8 mb-2',
  class: 'form-control',
  label: 'Entity Hash',
  name: 'seed_entity_hash',
  controlName: 'seedEntityHash',
  placeholder: 'entity-contract-0x',
  e2e: 'seedEntityHashElt',
  enabled_when: ['newFromEntityInfo']
};

const seedKey: InputField = {
  id: 'seedKeyElt',
  type: 'search',
  wrap_class: 'col-xl-8 mb-2',
  class: 'form-control',
  label: 'Dictionary Key',
  name: 'seed_key',
  controlName: 'seedKey',
  placeholder: 'dictionary-0x',
  e2e: 'seedKeyElt',
  enabled_when: ['newFromDictionaryKey']
};

const seedName: InputField = {
  id: 'seedNameElt',
  type: 'search',
  wrap_class: 'col-lg-6 mb-2',
  class: 'form-control',
  label: 'Dictionary Name',
  name: 'seed_name',
  controlName: 'seedName',
  placeholder: 'events',
  e2e: 'seedNameElt',
  enabled_when: ['newFromContractInfo', 'newFromAccountInfo', 'newFromEntityInfo']
};

const itemKey: InputField = {
  id: 'itemKeyElt',
  type: 'search',
  wrap_class: 'col-xl-8 mb-2',
  class: 'form-control',
  label: 'Dictionary Item key',
  name: 'item_key',
  controlName: 'itemKey',
  placeholder: 'Item key string',
  e2e: 'itemKeyElt',
  enabled_when: ['newFromContractInfo', 'newFromAccountInfo', 'newFromSeedUref', 'newFromEntityInfo']
};

const queryKey: InputField = {
  id: 'queryKeyElt',
  type: 'search',
  wrap_class: 'col-xl-8 mb-2',
  class: 'form-control',
  label: 'Key',
  name: 'query_key',
  controlName: 'queryKey',
  placeholder: 'uref-0x || hash-0x || account-hash-0x',
  e2e: 'queryKeyElt',
};

const queryContractKey: InputField = {
  ...queryKey,
  label: 'Contract Hash',
  placeholder: 'hash-0x',
};

const queryPath: InputField = {
  id: 'queryPathElt',
  type: 'search',
  wrap_class: 'col-lg-4 mb-2',
  class: 'form-control',
  label: 'Path',
  name: 'query_path',
  controlName: 'queryPath',
  placeholder: 'counter/count',
  e2e: 'queryPathElt',
};

const deployJson: InputField = {
  id: 'deployJsonElt',
  type: 'textarea',
  wrap_class: 'col-lg-12',
  class: 'form-control',
  label: 'Deploy as Json string',
  name: 'deploy_json',
  controlName: 'deployJson',
  placeholder: 'Deploy as Json string',
  e2e: 'deployJsonElt',
  state_name: ['deploy_json'],
};

const transactionJson: InputField = {
  id: 'transactionJsonElt',
  type: 'textarea',
  wrap_class: 'col-lg-12',
  class: 'form-control',
  label: 'Transaction as Json string',
  name: 'transaction_json',
  controlName: 'transactionJson',
  placeholder: 'Transaction as Json string',
  e2e: 'transactionJsonElt',
  state_name: ['transaction_json'],
};

const selectDictIdentifier: InputField = {
  id: 'selectDictIdentifierElt',
  type: 'select',
  wrap_class: 'mt-3 col-lg-5 mb-4',
  class: 'form-select form-control form-control-sm',
  label: 'Dictionary identifier',
  label_class: 'input-group-text',
  name: 'select_dict_identifier',
  controlName: 'selectDictIdentifier',
  e2e: 'selectDictIdentifierElt',
  state_name: ['select_dict_identifier'],
  options: [
    { value: 'newFromSeedUref', label: 'From Dictionary Uref' },
    { value: 'newFromContractInfo', label: 'From Contract Info (depr.)' },
    { value: 'newFromEntityInfo', label: 'From Entity Info', default: true },
    { value: 'newFromAccountInfo', label: 'From Account Info' },
    { value: 'newFromDictionaryKey', label: 'From Dictionary Key' },
  ]
};

const selectPricingMode: InputField = {
  id: 'selectPricingMode',
  type: 'select',
  wrap_class: 'mt-3 col-xl-3 mb-3',
  class: 'form-select form-control form-control-sm',
  label: 'Pricing mode',
  label_class: 'input-group-text',
  name: 'pricing_mode',
  controlName: 'selectPricingMode',
  e2e: 'selectPricingModeElt',
  options: [
    { value: PricingMode.Classic.toString(), label: 'Classic', default: config['default_pricing_mode'] === PricingMode.Classic },
    { value: PricingMode.Fixed.toString(), label: 'Fixed', default: config['default_pricing_mode'] === PricingMode.Fixed },
  ]
};

const selectTransactionCategory: InputField = {
  id: 'selectTransactionCategory',
  type: 'select',
  wrap_class: 'mt-3 col-xl-3 mb-3',
  class: 'form-select form-control form-control-sm',
  label: 'Category',
  label_class: 'input-group-text',
  name: 'transaction_category',
  controlName: 'selectTransactionCategory',
  e2e: 'selectTransactionCategoryElt',
  options: [
    { value: "true", label: "Install & Upgrade", default: config['default_is_install_upgrade'] === true },
    { value: "false", label: "Session", default: config['default_is_install_upgrade'] === false },
  ],
  enabled_when: ['has_wasm']
};

const getBlockFields: InputContainer[][] = [
  [{ input: blockIdentifierHeight }, { input: blockIdentifierHash }]
];

const getAccountFields: InputContainer[][] = [
  ...getBlockFields,
  [{ input: accountIdentifier, required: true }],
];

const getEntityFields: InputContainer[][] = [
  ...getBlockFields,
  [{ input: entityIdentifier, required: true }],
];

const getBalanceFields: InputContainer[][] = [
  [{ input: stateRootHash }],
  [{ input: purseUref, required: true }],
];

const queryBalanceFields: InputContainer[][] = [
  ...getBlockFields,
  [{ input: stateRootHash }],
  [{ input: purseIdentifier, required: true }],
];

const queryGlobalStateFields: InputContainer[][] = [
  ...getBlockFields,
  [{ input: stateRootHash }],
  [{ input: queryKey, required: true }],
  [{ input: queryPath }],
];

const queryContractDictFields: InputContainer[][] = [
  [{ input: stateRootHash }],
  [{ input: seedEntityHash, required: true }],
  [{ input: seedName, required: true }],
  [{ input: itemKey, required: true }],
];

const queryContractKeyFields: InputContainer[][] = [
  ...getBlockFields,
  [{ input: queryContractKey, required: true }],
  [{ input: queryPath, required: true }],
];

const getDictionaryItemFields: InputContainer[][] = [
  [{ input: stateRootHash }],
  [{ select: selectDictIdentifier }],
  [{ input: seedContractHash, required: true }],
  [{ input: seedEntityHash, required: true }],
  [{ input: seedAccountHash, required: true }],
  [{ input: seedUref, required: true }],
  [{ input: seedName, required: true }],
  [{ input: itemKey, required: true }],
  [{ input: seedKey, required: true }],
];

const getDeployFields: InputContainer[][] = [
  [{ input: deployHash, required: true }, { input: finalizedApprovals }],
];

const getTransactionFields: InputContainer[][] = [
  [{ input: transactionHash, required: true }, { input: finalizedApprovals }],
];

const getTransferFields: InputContainer[][] = [
  [{ input: transferAmount, required: true }, { input: ttlInput }],
  [{ input: targetAccount, required: true }],
];

const getSpeculativeTransferFields: InputContainer[][] = [
  ...getBlockFields,
  ...getTransferFields
];

const installFields: InputContainer[][] = [
  [{ input: paymentAmount, required: true }, { input: ttlInput }, { input: gasPriceTolerance }, { select: selectPricingMode }, { input: additionalComputationFactor },],
  [{ wasm_button: true }, { select: selectTransactionCategory }],
  [{ input: argsSimpleInput }],
  [{ textarea: argsJson }],
];

const makeDeployFields: InputContainer[][] = [
  [{ input: paymentAmount, required: true }, { input: ttlInput }, { input: gasPriceTolerance }],
  [{ wasm_button: true }, { select: selectTransactionCategory }],
  [{ input: sessionHash, required: true }, { input: callPackage }, { input: versionInput }],
  [{ input: sessionNameInput, required: true }],
  [{ input: entryPointInput, required: true }],
  [{ input: argsSimpleInput }],
  [{ textarea: argsJson }],
];

const makeTransactionFields: InputContainer[][] = [
  [{ input: paymentAmount, required: true }, { input: ttlInput }, { input: gasPriceTolerance }, { select: selectPricingMode }, { input: additionalComputationFactor }],
  [{ wasm_button: true }, { select: selectTransactionCategory }],
  [{ input: entityHash, required: true }, { input: callPackage }, { input: versionInput }],
  [{ input: entityAlias, required: true }],
  [{ input: entryPointInput, required: true }],
  [{ input: argsSimpleInput }],
  [{ textarea: argsJson }],
];

const speculativeDeployFields: InputContainer[][] = [
  ...makeDeployFields
];

const speculativeTransactionFields: InputContainer[][] = [
  ...makeTransactionFields
];

const callEntrypointFields: InputContainer[][] = [
  [{ input: paymentAmount, required: true }, { input: ttlInput }, { input: gasPriceTolerance }, { select: selectPricingMode }, { input: additionalComputationFactor }],
  [{ input: entityHash }, { input: callPackage }, { input: versionInput }],
  [{ input: entityAlias }],
  [{ input: entryPointInput }],
  [{ input: argsSimpleInput }],
  [{ textarea: argsJson }],
];

const callEntrypointFieldsDeploy: InputContainer[][] = [
  [{ input: paymentAmount, required: true }, { input: ttlInput }, { input: gasPriceTolerance }],
  [{ input: sessionHash }, { input: callPackage }, { input: versionInput }],
  [{ input: sessionNameInput }],
  [{ input: entryPointInput }],
  [{ input: argsSimpleInput }],
  [{ textarea: argsJson }],
];

const speculativeExecDeployFields: InputContainer[][] = [
  [{ file_button: true }],
  [{ textarea: deployJson, required: true }],
];

const speculativeExecFields: InputContainer[][] = [
  [{ file_button: true }],
  [{ textarea: transactionJson, required: true }],
];

const putDeployFields: InputContainer[][] = [
  [{ file_button: true }],
  [{ textarea: deployJson, required: true }],
];

const putTransactionFields: InputContainer[][] = [
  [{ file_button: true }],
  [{ textarea: transactionJson, required: true }],
];

const signDeployFields: InputContainer[][] = [
  [{ file_button: true }],
  [{ textarea: deployJson, required: true }],
];

const signTransactionFields: InputContainer[][] = [
  [{ file_button: true }],
  [{ textarea: transactionJson, required: true }],
];

const getBinaryValidatorRewardByEraFields: InputContainer[][] = [
  ...getBlockFields,
  [{ input: eraId }],
  [{ input: validatorKey, required: true }],
];

const getBinaryDelegatorRewardByEraFields: InputContainer[][] = [
  ...getBlockFields,
  [{ input: eraId }],
  [{ input: validatorKey, required: true }],
  [{ input: delegatorKey, required: true }],
];

const getBinaryReadRecordFields: InputContainer[][] = [
  [{ input: recordId }],
  [{ input: key }],
];

const formFields = new Map<string, InputContainer[][]>([
  ['call_entrypoint', callEntrypointFields],
  ['call_entrypoint_deploy', callEntrypointFieldsDeploy],
  ['deploy', makeDeployFields],
  ['get_account', getAccountFields],
  ['get_balance', getBalanceFields],
  ['get_block', getBlockFields],
  ['get_block_transfers', getBlockFields],
  ['get_deploy', getDeployFields],
  ['get_dictionary_item', getDictionaryItemFields],
  ['get_era_info', getBlockFields],
  ['get_era_summary', getBlockFields],
  ['get_entity', getEntityFields],
  ['get_state_root_hash', getBlockFields],
  ['get_transaction', getTransactionFields],
  ['install', installFields],
  ['install_deploy', installFields],
  ['make_deploy', makeDeployFields],
  ['make_transaction', makeTransactionFields],
  ['make_transfer', getTransferFields],
  ['make_transfer_transaction', getTransferFields],
  ['put_deploy', putDeployFields],
  ['put_transaction', putTransactionFields],
  ['query_balance', queryBalanceFields],
  ['query_balance_details', queryBalanceFields],
  ['query_contract_dict', queryContractDictFields],
  ['query_contract_key', queryContractKeyFields],
  ['query_global_state', queryGlobalStateFields],
  ['sign_deploy', signDeployFields],
  ['sign_transaction', signTransactionFields],
  ['speculative_deploy', speculativeDeployFields],
  ['speculative_exec_deploy', speculativeExecDeployFields],
  ['speculative_exec', speculativeExecFields],
  ['speculative_transaction', speculativeTransactionFields],
  ['speculative_transfer', getSpeculativeTransferFields],
  ['speculative_transfer_transaction', getSpeculativeTransferFields],
  ['transaction', makeTransactionFields],
  ['transfer', getTransferFields],
  ['transfer_transaction', getTransferFields],
  ['get_binary_block_header', getBlockFields],
  ['get_binary_signed_block', getBlockFields],
  ['get_binary_transaction', getTransactionFields],
  ['get_binary_validator_reward', getBinaryValidatorRewardByEraFields],
  ['get_binary_delegator_reward', getBinaryDelegatorRewardByEraFields],
  ['get_binary_read_record', getBinaryReadRecordFields],
]);

export default formFields;