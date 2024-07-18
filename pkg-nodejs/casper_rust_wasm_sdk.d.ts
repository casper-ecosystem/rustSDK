/* tslint:disable */
/* eslint-disable */
/**
* Converts a hexadecimal string to a regular string.
*
* # Arguments
*
* * `hex_string` - The hexadecimal string to convert.
*
* # Returns
*
* A regular string containing the converted value.
* @param {string} hex_string
* @returns {string}
*/
export function hexToString(hex_string: string): string;
/**
* Converts a hexadecimal string to a Uint8Array.
*
* # Arguments
*
* * `hex_string` - The hexadecimal string to convert.
*
* # Returns
*
* A Uint8Array containing the converted value.
* @param {string} hex_string
* @returns {Uint8Array}
*/
export function hexToUint8Array(hex_string: string): Uint8Array;
/**
* Converts a Uint8Array to a `Bytes` object.
*
* # Arguments
*
* * `uint8_array` - The Uint8Array to convert.
*
* # Returns
*
* A `Bytes` object containing the converted value.
* @param {Uint8Array} uint8_array
* @returns {Bytes}
*/
export function uint8ArrayToBytes(uint8_array: Uint8Array): Bytes;
/**
* Converts motes to CSPR (Casper tokens).
*
* # Arguments
*
* * `motes` - The motes value to convert.
*
* # Returns
*
* A string representing the CSPR amount.
* @param {string} motes
* @returns {string}
*/
export function motesToCSPR(motes: string): string;
/**
* Pretty prints a JSON value.
*
* # Arguments
*
* * `value` - The JSON value to pretty print.
* * `verbosity` - An optional verbosity level for pretty printing.
*
* # Returns
*
* A pretty printed JSON value as a JsValue.
* @param {any} value
* @param {Verbosity | undefined} [verbosity]
* @returns {any}
*/
export function jsonPrettyPrint(value: any, verbosity?: Verbosity): any;
/**
* Converts a secret key to a corresponding public key.
*
* # Arguments
*
* * `secret_key` - The secret key in PEM format.
*
* # Returns
*
* A JsValue containing the corresponding public key.
* If an error occurs during the conversion, JavaScript error is returned.
* @param {string} secret_key
* @returns {any}
*/
export function publicKeyFromSecretKey(secret_key: string): any;
/**
* Generates a secret key using the Ed25519 algorithm and returns it as a PEM-encoded string.
*
* # Returns
*
* A `JsValue` containing the PEM-encoded secret key or a JavaScript error if an error occurs.
*
* # Errors
*
* Returns an error if the secret key generation or serialization fails.
* @returns {any}
*/
export function generateSecretKey(): any;
/**
* Generates a secret key using the secp256k1 algorithm and returns it as a PEM-encoded string.
*
* # Returns
*
* A `JsValue` containing the PEM-encoded secret key or a JavaScript error if an error occurs.
*
* # Errors
*
* Returns an error if the secret key generation or serialization fails.
* @returns {any}
*/
export function generateSecretKey_secp256k1(): any;
/**
* Converts a formatted account hash to a base64-encoded string (cep-18 key encoding).
*
*
* # Arguments
*
* * `formatted_account_hash` - A hex-formatted string representing the account hash.
* Example: "account-hash-b485c074cef7ccaccd0302949d2043ab7133abdb14cfa87e8392945c0bd80a5f"
*
* # Returns
*
* Returns the base64-encoded string.
* Example: "ALSFwHTO98yszQMClJ0gQ6txM6vbFM+ofoOSlFwL2Apf"
* @param {string} formatted_account_hash
* @returns {string}
*/
export function accountHashToBase64Key(formatted_account_hash: string): string;
/**
* Gets the current timestamp.
*
* # Returns
*
* A JsValue containing the current timestamp.
* @returns {any}
*/
export function getTimestamp(): any;
/**
* Encodes the given metadata using the lower-level Blake2b hashing algorithm.
*
* # Arguments
*
* * `meta_data` - A string containing the metadata to be hashed.
*
* # Returns
*
* A JsValue containing the hash generated using the Blake2b algorithm.
* @param {string} meta_data
* @returns {any}
*/
export function encodeLowerBlake2b(meta_data: string): any;
/**
* Converts a key and value into a formatted dictionary item key for ditionaries queries.
*
* # Arguments
*
* * `key` - A string representation of a account/contract hash as a Key.
* * `value` - A string representation of the value, for now restricted to parse as U256 or Key
*
* # Returns
*
* A string representing the formatted dictionary item key.
* @param {Key} key
* @param {string} value
* @returns {string}
*/
export function makeDictionaryItemKey(key: Key, value: string): string;
/**
*/
export enum TransferTargetKind {
  PublicKey = 0,
  AccountHash = 1,
  URef = 2,
}
/**
*/
export enum Verbosity {
  Low = 0,
  Medium = 1,
  High = 2,
}
/**
*/
export enum TransactionKind {
  InvocableEntity = 0,
  InvocableEntityAlias = 1,
  Package = 2,
  PackageAlias = 3,
  Session = 4,
  Transfer = 5,
  AddBid = 6,
  Delegate = 7,
  Undelegate = 8,
  Redelegate = 9,
  WithdrawBid = 10,
}
/**
*/
export enum PricingMode {
  Fixed = 0,
  Classic = 1,
  Reserved = 2,
}
/**
*/
export enum TransactionCategory {
  Mint = 0,
  Auction = 1,
  InstallUpgrade = 2,
  Large = 3,
  Medium = 4,
  Small = 5,
}
/**
*/
export class AccessRights {
  free(): void;
/**
* @returns {number}
*/
  static NONE(): number;
/**
* @returns {number}
*/
  static READ(): number;
/**
* @returns {number}
*/
  static WRITE(): number;
/**
* @returns {number}
*/
  static ADD(): number;
/**
* @returns {number}
*/
  static READ_ADD(): number;
/**
* @returns {number}
*/
  static READ_WRITE(): number;
/**
* @returns {number}
*/
  static ADD_WRITE(): number;
/**
* @returns {number}
*/
  static READ_ADD_WRITE(): number;
/**
* @param {number} access_rights
*/
  constructor(access_rights: number);
/**
* @param {boolean} read
* @param {boolean} write
* @param {boolean} add
* @returns {AccessRights}
*/
  static from_bits(read: boolean, write: boolean, add: boolean): AccessRights;
/**
* @returns {boolean}
*/
  is_readable(): boolean;
/**
* @returns {boolean}
*/
  is_writeable(): boolean;
/**
* @returns {boolean}
*/
  is_addable(): boolean;
/**
* @returns {boolean}
*/
  is_none(): boolean;
}
/**
*/
export class AccountHash {
  free(): void;
/**
* @param {string} account_hash_hex_str
*/
  constructor(account_hash_hex_str: string);
/**
* @param {string} formatted_str
* @returns {AccountHash}
*/
  static fromFormattedStr(formatted_str: string): AccountHash;
/**
* @param {PublicKey} public_key
* @returns {AccountHash}
*/
  static fromPublicKey(public_key: PublicKey): AccountHash;
/**
* @returns {string}
*/
  toFormattedString(): string;
/**
* @returns {string}
*/
  toHexString(): string;
/**
* @param {Uint8Array} bytes
* @returns {AccountHash}
*/
  static fromUint8Array(bytes: Uint8Array): AccountHash;
/**
* @returns {any}
*/
  toJson(): any;
}
/**
*/
export class AccountIdentifier {
  free(): void;
/**
* @param {string} formatted_str
*/
  constructor(formatted_str: string);
/**
* @param {string} formatted_str
* @returns {AccountIdentifier}
*/
  static fromFormattedStr(formatted_str: string): AccountIdentifier;
/**
* @param {PublicKey} key
* @returns {AccountIdentifier}
*/
  static fromPublicKey(key: PublicKey): AccountIdentifier;
/**
* @param {AccountHash} account_hash
* @returns {AccountIdentifier}
*/
  static fromAccountHash(account_hash: AccountHash): AccountIdentifier;
/**
* @returns {any}
*/
  toJson(): any;
}
/**
*/
export class AddressableEntityHash {
  free(): void;
/**
* @param {string} addressable_entity_hex_str
*/
  constructor(addressable_entity_hex_str: string);
/**
* @param {string} formatted_str
* @returns {AddressableEntityHash}
*/
  static fromFormattedStr(formatted_str: string): AddressableEntityHash;
/**
* @returns {string}
*/
  toFormattedString(): string;
/**
* @param {Uint8Array} bytes
* @returns {AddressableEntityHash}
*/
  static fromUint8Array(bytes: Uint8Array): AddressableEntityHash;
}
/**
*/
export class ArgsSimple {
  free(): void;
}
/**
*/
export class BlockHash {
  free(): void;
/**
* @param {string} block_hash_hex_str
*/
  constructor(block_hash_hex_str: string);
/**
* @param {Digest} digest
* @returns {BlockHash}
*/
  static fromDigest(digest: Digest): BlockHash;
/**
* @returns {any}
*/
  toJson(): any;
/**
* @returns {string}
*/
  toString(): string;
}
/**
*/
export class BlockIdentifier {
  free(): void;
/**
* @param {BlockIdentifier} block_identifier
*/
  constructor(block_identifier: BlockIdentifier);
/**
* @param {BlockHash} hash
* @returns {BlockIdentifier}
*/
  static from_hash(hash: BlockHash): BlockIdentifier;
/**
* @param {bigint} height
* @returns {BlockIdentifier}
*/
  static fromHeight(height: bigint): BlockIdentifier;
/**
* @returns {any}
*/
  toJson(): any;
}
/**
* Represents the body of an event, containing processed deploy information.
*/
export class Body {
  free(): void;
/**
*/
  readonly get_deploy_processed: TransactionProcessed | undefined;
/**
*/
  readonly get_transaction_processed: TransactionProcessed | undefined;
/**
*/
  transaction_processed?: TransactionProcessed;
}
/**
*/
export class Bytes {
  free(): void;
/**
*/
  constructor();
/**
* @param {Uint8Array} uint8_array
* @returns {Bytes}
*/
  static fromUint8Array(uint8_array: Uint8Array): Bytes;
}
/**
*/
export class CasperWallet {
  free(): void;
/**
*/
  constructor();
/**
* Signs a deploy with the provided or active public key.
*
* This function requests a connection to the wallet, retrieves the public key
* (either provided or active), serializes the deploy, signs it, and returns the
* signed deploy.
*
* # Arguments
*
* * `deploy` - The deploy object to be signed.
* * `public_key` - An optional public key string. If `None`, the active public key is used.
*
* # Returns
*
* * `Ok(Deploy)` - The signed deploy object.
* * `Err(JsError)` - An error if the connection fails, the public key retrieval fails,
*   the serialization fails, the signing fails, or if the signing is cancelled.
*
* # Errors
*
* This function returns a `JsError` if:
* * The connection to the wallet could not be established.
* * The public key could not be retrieved.
* * The deploy serialization fails.
* * The signing operation fails.
* * The signing is cancelled by the user.
* @param {Deploy} deploy
* @param {string | undefined} [public_key]
* @returns {Promise<Deploy>}
*/
  signDeploy(deploy: Deploy, public_key?: string): Promise<Deploy>;
/**
* @param {Transaction} transaction
* @param {string | undefined} [public_key]
* @returns {Promise<Transaction>}
*/
  signTransaction(transaction: Transaction, public_key?: string): Promise<Transaction>;
/**
* Alias for the `sign_message` function, specifically for signing deploy hashes.
*
* This function calls `sign_message` to sign the provided deploy hash with the
* given or active public key.
*
* # Arguments
*
* * `deploy_hash` - The deploy hash string to be signed.
* * `public_key` - An optional public key string. If `None`, the active public key is used.
*
* # Returns
*
* * `Ok(String)` - The signature string.
* * `Err(JsError)` - An error if the signing process fails.
* @param {string} deploy_hash
* @param {string | undefined} [public_key]
* @returns {Promise<string>}
*/
  signDeployHash(deploy_hash: string, public_key?: string): Promise<string>;
/**
* Alias for the `sign_message` function, specifically for signing transaction hashes.
*
* This function calls `sign_message` to sign the provided transaction hash with the
* given or active public key.
*
* # Arguments
*
* * `transaction_hash` - The transaction hash string to be signed.
* * `public_key` - An optional public key string. If `None`, the active public key is used.
*
* # Returns
*
* * `Ok(String)` - The signature string.
* * `Err(JsError)` - An error if the signing process fails.
* @param {string} transaction_hash
* @param {string | undefined} [public_key]
* @returns {Promise<string>}
*/
  signTransactionHash(transaction_hash: string, public_key?: string): Promise<string>;
/**
* Signs a message with the provided or active public key.
*
* This function requests a connection to the wallet, retrieves the public key
* (either provided or active), signs the message, and returns the signature.
*
* # Arguments
*
* * `message` - The message string to be signed.
* * `public_key` - An optional public key string. If `None`, the active public key is used.
*
* # Returns
*
* * `Ok(String)` - The signature string.
* * `Err(JsError)` - An error if the connection fails, the public key retrieval fails,
*   the signing fails, or if the signing is cancelled.
*
* # Errors
*
* This function returns a `JsError` if:
* * The connection to the wallet could not be established.
* * The public key could not be retrieved.
* * The signing operation fails.
* * The signing is cancelled by the user.
* @param {string} message
* @param {string | undefined} [public_key]
* @returns {Promise<string>}
*/
  signMessage(message: string, public_key?: string): Promise<string>;
/**
* @returns {Promise<boolean>}
*/
  connect(): Promise<boolean>;
/**
* @returns {Promise<boolean>}
*/
  disconnect(): Promise<boolean>;
/**
* @returns {Promise<boolean>}
*/
  isConnected(): Promise<boolean>;
/**
* @returns {Promise<string>}
*/
  getVersion(): Promise<string>;
/**
* @returns {Promise<string>}
*/
  getActivePublicKey(): Promise<string>;
/**
* @returns {Promise<boolean>}
*/
  switchAccount(): Promise<boolean>;
}
/**
*/
export class ContractHash {
  free(): void;
/**
* @param {string} contract_hash_hex_str
*/
  constructor(contract_hash_hex_str: string);
/**
* @param {string} formatted_str
* @returns {ContractHash}
*/
  static fromFormattedStr(formatted_str: string): ContractHash;
/**
* @returns {string}
*/
  toFormattedString(): string;
/**
* @param {Uint8Array} bytes
* @returns {ContractHash}
*/
  static fromUint8Array(bytes: Uint8Array): ContractHash;
}
/**
*/
export class ContractPackageHash {
  free(): void;
/**
* @param {string} contract_package_hash_hex_str
*/
  constructor(contract_package_hash_hex_str: string);
/**
* @param {string} formatted_str
* @returns {ContractPackageHash}
*/
  static fromFormattedStr(formatted_str: string): ContractPackageHash;
/**
* @returns {string}
*/
  toFormattedString(): string;
/**
* @param {Uint8Array} bytes
* @returns {ContractPackageHash}
*/
  static fromUint8Array(bytes: Uint8Array): ContractPackageHash;
}
/**
*/
export class Deploy {
  free(): void;
/**
* @param {any} deploy
*/
  constructor(deploy: any);
/**
* @returns {any}
*/
  toJson(): any;
/**
* @param {DeployStrParams} deploy_params
* @param {SessionStrParams} session_params
* @param {PaymentStrParams} payment_params
* @returns {Deploy}
*/
  static withPaymentAndSession(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams): Deploy;
/**
* @param {string} amount
* @param {string} target_account
* @param {string | undefined} transfer_id
* @param {DeployStrParams} deploy_params
* @param {PaymentStrParams} payment_params
* @returns {Deploy}
*/
  static withTransfer(amount: string, target_account: string, transfer_id: string | undefined, deploy_params: DeployStrParams, payment_params: PaymentStrParams): Deploy;
/**
* @param {string} ttl
* @param {string | undefined} [secret_key]
* @returns {Deploy}
*/
  withTTL(ttl: string, secret_key?: string): Deploy;
/**
* @param {string} timestamp
* @param {string | undefined} [secret_key]
* @returns {Deploy}
*/
  withTimestamp(timestamp: string, secret_key?: string): Deploy;
/**
* @param {string} chain_name
* @param {string | undefined} [secret_key]
* @returns {Deploy}
*/
  withChainName(chain_name: string, secret_key?: string): Deploy;
/**
* @param {PublicKey} account
* @param {string | undefined} [secret_key]
* @returns {Deploy}
*/
  withAccount(account: PublicKey, secret_key?: string): Deploy;
/**
* @param {string} entry_point_name
* @param {string | undefined} [secret_key]
* @returns {Deploy}
*/
  withEntryPointName(entry_point_name: string, secret_key?: string): Deploy;
/**
* @param {ContractHash} hash
* @param {string | undefined} [secret_key]
* @returns {Deploy}
*/
  withHash(hash: ContractHash, secret_key?: string): Deploy;
/**
* @param {ContractPackageHash} package_hash
* @param {string | undefined} [secret_key]
* @returns {Deploy}
*/
  withPackageHash(package_hash: ContractPackageHash, secret_key?: string): Deploy;
/**
* @param {Bytes} module_bytes
* @param {string | undefined} [secret_key]
* @returns {Deploy}
*/
  withModuleBytes(module_bytes: Bytes, secret_key?: string): Deploy;
/**
* @param {string | undefined} [secret_key]
* @returns {Deploy}
*/
  withSecretKey(secret_key?: string): Deploy;
/**
* @param {string} amount
* @param {string | undefined} [secret_key]
* @returns {Deploy}
*/
  withStandardPayment(amount: string, secret_key?: string): Deploy;
/**
* @param {any} payment
* @param {string | undefined} [secret_key]
* @returns {Deploy}
*/
  withPayment(payment: any, secret_key?: string): Deploy;
/**
* @param {any} session
* @param {string | undefined} [secret_key]
* @returns {Deploy}
*/
  withSession(session: any, secret_key?: string): Deploy;
/**
* @returns {boolean}
*/
  validateDeploySize(): boolean;
/**
* @returns {boolean}
*/
  isValid(): boolean;
/**
* @returns {boolean}
*/
  hasValidHash(): boolean;
/**
* @returns {boolean}
*/
  isExpired(): boolean;
/**
* @param {string} secret_key
* @returns {Deploy}
*/
  sign(secret_key: string): Deploy;
/**
* @returns {any}
*/
  approvalsHash(): any;
/**
* @returns {any}
*/
  approvals(): any;
/**
* @returns {boolean}
*/
  isTransfer(): boolean;
/**
* @param {number} phase
* @returns {boolean}
*/
  isStandardPayment(phase: number): boolean;
/**
* @returns {boolean}
*/
  isStoredContract(): boolean;
/**
* @returns {boolean}
*/
  isStoredContractPackage(): boolean;
/**
* @returns {boolean}
*/
  isModuleBytes(): boolean;
/**
* @returns {boolean}
*/
  isByName(): boolean;
/**
* @returns {string | undefined}
*/
  byName(): string | undefined;
/**
* @returns {string}
*/
  entryPointName(): string;
/**
* @param {string} public_key
* @param {string} signature
* @returns {Deploy}
*/
  addSignature(public_key: string, signature: string): Deploy;
/**
* @returns {string}
*/
  TTL(): string;
/**
* @returns {string}
*/
  timestamp(): string;
/**
* @returns {string}
*/
  chainName(): string;
/**
* @returns {string}
*/
  account(): string;
/**
* @param {number} conv_rate
* @returns {string}
*/
  paymentAmount(conv_rate: number): string;
/**
* @returns {any}
*/
  args(): any;
/**
* @param {any} js_value_arg
* @param {string | undefined} [secret_key]
* @returns {Deploy}
*/
  addArg(js_value_arg: any, secret_key?: string): Deploy;
/**
*/
  readonly hash: DeployHash;
}
/**
*/
export class DeployHash {
  free(): void;
/**
* @param {string} deploy_hash_hex_str
*/
  constructor(deploy_hash_hex_str: string);
/**
* @param {Digest} digest
* @returns {DeployHash}
*/
  static fromDigest(digest: Digest): DeployHash;
/**
* @returns {any}
*/
  toJson(): any;
/**
* @returns {string}
*/
  toString(): string;
}
/**
*/
export class DeployStrParams {
  free(): void;
/**
* @param {string} chain_name
* @param {string} session_account
* @param {string | undefined} [secret_key]
* @param {string | undefined} [timestamp]
* @param {string | undefined} [ttl]
* @param {string | undefined} [gas_price_tolerance]
*/
  constructor(chain_name: string, session_account: string, secret_key?: string, timestamp?: string, ttl?: string, gas_price_tolerance?: string);
/**
*/
  setDefaultTimestamp(): void;
/**
*/
  setDefaultTTL(): void;
/**
*/
  chain_name: string;
/**
*/
  gas_price_tolerance: string;
/**
*/
  secret_key: string;
/**
*/
  session_account: string;
/**
*/
  timestamp?: string;
/**
*/
  ttl?: string;
}
/**
*/
export class DictionaryAddr {
  free(): void;
/**
* @param {Uint8Array} bytes
*/
  constructor(bytes: Uint8Array);
}
/**
*/
export class DictionaryItemIdentifier {
  free(): void;
/**
* @param {string} account_hash
* @param {string} dictionary_name
* @param {string} dictionary_item_key
* @returns {DictionaryItemIdentifier}
*/
  static newFromAccountInfo(account_hash: string, dictionary_name: string, dictionary_item_key: string): DictionaryItemIdentifier;
/**
* @param {string} contract_addr
* @param {string} dictionary_name
* @param {string} dictionary_item_key
* @returns {DictionaryItemIdentifier}
*/
  static newFromContractInfo(contract_addr: string, dictionary_name: string, dictionary_item_key: string): DictionaryItemIdentifier;
/**
* @param {string} entity_addr
* @param {string} dictionary_name
* @param {string} dictionary_item_key
* @returns {DictionaryItemIdentifier}
*/
  static newFromEntityInfo(entity_addr: string, dictionary_name: string, dictionary_item_key: string): DictionaryItemIdentifier;
/**
* @param {string} seed_uref
* @param {string} dictionary_item_key
* @returns {DictionaryItemIdentifier}
*/
  static newFromSeedUref(seed_uref: string, dictionary_item_key: string): DictionaryItemIdentifier;
/**
* @param {string} dictionary_key
* @returns {DictionaryItemIdentifier}
*/
  static newFromDictionaryKey(dictionary_key: string): DictionaryItemIdentifier;
/**
* @returns {any}
*/
  toJson(): any;
}
/**
*/
export class DictionaryItemStrParams {
  free(): void;
/**
*/
  constructor();
/**
* @param {string} key
* @param {string} dictionary_name
* @param {string} dictionary_item_key
*/
  setAccountNamedKey(key: string, dictionary_name: string, dictionary_item_key: string): void;
/**
* @param {string} key
* @param {string} dictionary_name
* @param {string} dictionary_item_key
*/
  setContractNamedKey(key: string, dictionary_name: string, dictionary_item_key: string): void;
/**
* @param {string} key
* @param {string} dictionary_name
* @param {string} dictionary_item_key
*/
  setEntityNamedKey(key: string, dictionary_name: string, dictionary_item_key: string): void;
/**
* @param {string} seed_uref
* @param {string} dictionary_item_key
*/
  setUref(seed_uref: string, dictionary_item_key: string): void;
/**
* @param {string} value
*/
  setDictionary(value: string): void;
/**
* @returns {any}
*/
  toJson(): any;
}
/**
*/
export class Digest {
  free(): void;
/**
* @param {string} digest_hex_str
*/
  constructor(digest_hex_str: string);
/**
* @param {string} digest_hex_str
* @returns {Digest}
*/
  static fromString(digest_hex_str: string): Digest;
/**
* @param {Uint8Array} bytes
* @returns {Digest}
*/
  static fromRaw(bytes: Uint8Array): Digest;
/**
* @returns {any}
*/
  toJson(): any;
/**
* @returns {string}
*/
  toString(): string;
}
/**
*/
export class EntityAddr {
  free(): void;
/**
* @param {string} formatted_str
* @returns {EntityAddr}
*/
  static fromFormattedStr(formatted_str: string): EntityAddr;
/**
* @returns {string}
*/
  toFormattedString(): string;
/**
* @returns {string}
*/
  toHexString(): string;
/**
* @returns {any}
*/
  toJson(): any;
}
/**
*/
export class EntityIdentifier {
  free(): void;
/**
* @param {string} formatted_str
*/
  constructor(formatted_str: string);
/**
* @param {string} formatted_str
* @returns {EntityIdentifier}
*/
  static fromFormattedStr(formatted_str: string): EntityIdentifier;
/**
* @param {PublicKey} key
* @returns {EntityIdentifier}
*/
  static fromPublicKey(key: PublicKey): EntityIdentifier;
/**
* @param {AccountHash} account_hash
* @returns {EntityIdentifier}
*/
  static fromAccountHash(account_hash: AccountHash): EntityIdentifier;
/**
* @param {EntityAddr} entity_addr
* @returns {EntityIdentifier}
*/
  static fromEntityAddr(entity_addr: EntityAddr): EntityIdentifier;
/**
* @returns {any}
*/
  toJson(): any;
}
/**
*/
export class EraId {
  free(): void;
/**
* @param {bigint} value
*/
  constructor(value: bigint);
/**
* @returns {bigint}
*/
  value(): bigint;
}
/**
* Represents the result of parsing an event, containing error information and the event body.
*/
export class EventParseResult {
  free(): void;
/**
*/
  body?: Body;
/**
*/
  err?: string;
}
/**
* Represents the result of an execution, either Success or Failure.
*/
export class ExecutionResult {
  free(): void;
/**
* Optional Failure information.
*/
  Failure?: Failure;
/**
* Optional Success information.
*/
  Success?: Version2;
}
/**
* Represents a failure response containing an error message.
*/
export class Failure {
  free(): void;
/**
*/
  cost: string;
/**
*/
  error_message: string;
}
/**
*/
export class GetAccountResult {
  free(): void;
/**
* @returns {any}
*/
  toJson(): any;
/**
*/
  readonly account: any;
/**
*/
  readonly api_version: any;
/**
*/
  readonly merkle_proof: string;
}
/**
*/
export class GetAddressableEntityResult {
  free(): void;
/**
* @returns {any}
*/
  toJson(): any;
/**
*/
  readonly api_version: any;
/**
*/
  readonly entity_result: any;
/**
*/
  readonly merkle_proof: string;
}
/**
*/
export class GetAuctionInfoResult {
  free(): void;
/**
* Converts the GetAuctionInfoResult to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
* Gets the auction state as a JsValue.
*/
  readonly auction_state: any;
}
/**
*/
export class GetBalanceResult {
  free(): void;
/**
* Converts the GetBalanceResult to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
* Gets the balance value as a JsValue.
*/
  readonly balance_value: any;
/**
* Gets the Merkle proof as a string.
*/
  readonly merkle_proof: string;
}
/**
*/
export class GetBlockResult {
  free(): void;
/**
* Converts the GetBlockResult to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
* Gets the block information as a JsValue.
*/
  readonly block: any;
}
/**
*/
export class GetBlockTransfersResult {
  free(): void;
/**
* Converts the GetBlockTransfersResult to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
* Gets the block hash as an Option<BlockHash>.
*/
  readonly block_hash: BlockHash | undefined;
/**
* Gets the transfers as a JsValue.
*/
  readonly transfers: any;
}
/**
* A struct representing the result of the `get_chainspec` function.
*/
export class GetChainspecResult {
  free(): void;
/**
* Converts the `GetChainspecResult` to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
* Gets the chainspec bytes as a JsValue.
*/
  readonly chainspec_bytes: any;
}
/**
*/
export class GetDeployResult {
  free(): void;
/**
* Converts the result to a JSON JavaScript value.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JavaScript value.
*/
  readonly api_version: any;
/**
* Gets the deploy information.
*/
  readonly deploy: Deploy;
/**
* Gets the execution info as a JavaScript value.
*/
  readonly execution_info: any;
}
/**
*/
export class GetDictionaryItemResult {
  free(): void;
/**
* Converts the GetDictionaryItemResult to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
* Gets the dictionary key as a String.
*/
  readonly dictionary_key: string;
/**
* Gets the merkle proof as a String.
*/
  readonly merkle_proof: string;
/**
* Gets the stored value as a JsValue.
*/
  readonly stored_value: any;
}
/**
*/
export class GetEraInfoResult {
  free(): void;
/**
* @returns {any}
*/
  toJson(): any;
/**
*/
  readonly api_version: any;
/**
*/
  readonly era_summary: any;
}
/**
* Wrapper struct for the `GetEraSummaryResult` from casper_client.
*/
export class GetEraSummaryResult {
  free(): void;
/**
* Converts the GetEraSummaryResult to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
* Gets the era summary as a JsValue.
*/
  readonly era_summary: any;
}
/**
* Wrapper struct for the `GetNodeStatusResult` from casper_client.
*/
export class GetNodeStatusResult {
  free(): void;
/**
* Converts the GetNodeStatusResult to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
* Gets the available block range as a JsValue.
*/
  readonly available_block_range: any;
/**
* Gets the block sync information as a JsValue.
*/
  readonly block_sync: any;
/**
* Gets the build version as a String.
*/
  readonly build_version: string;
/**
* Gets the chainspec name as a String.
*/
  readonly chainspec_name: string;
/**
* Gets information about the last added block as a JsValue.
*/
  readonly last_added_block_info: any;
/**
* Gets the last progress information as a JsValue.
*/
  readonly last_progress: any;
/**
* Gets information about the next upgrade as a JsValue.
*/
  readonly next_upgrade: any;
/**
* Gets the public signing key as an Option<PublicKey>.
*/
  readonly our_public_signing_key: PublicKey | undefined;
/**
* Gets the list of peers as a JsValue.
*/
  readonly peers: any;
/**
* Gets the reactor state information as a JsValue.
*/
  readonly reactor_state: any;
/**
* Gets the round length as a JsValue.
*/
  readonly round_length: any;
/**
* Gets the starting state root hash as a Digest.
*/
  readonly starting_state_root_hash: Digest;
/**
* Gets the uptime information as a JsValue.
*/
  readonly uptime: any;
}
/**
* A wrapper for the `GetPeersResult` type from the Casper client.
*/
export class GetPeersResult {
  free(): void;
/**
* Converts the result to JSON format as a JavaScript value.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JSON value.
*/
  readonly api_version: any;
/**
* Gets the peers as a JSON value.
*/
  readonly peers: any;
}
/**
* Wrapper struct for the `GetStateRootHashResult` from casper_client.
*/
export class GetStateRootHashResult {
  free(): void;
/**
* Alias for state_root_hash_as_string
* @returns {string}
*/
  toString(): string;
/**
* Converts the GetStateRootHashResult to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
* Gets the state root hash as an Option<Digest>.
*/
  readonly state_root_hash: Digest | undefined;
/**
* Gets the state root hash as a String.
*/
  readonly state_root_hash_as_string: string;
}
/**
*/
export class GetTransactionResult {
  free(): void;
/**
* Converts the result to a JSON JavaScript value.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JavaScript value.
*/
  readonly api_version: any;
/**
* Gets the execution info as a JavaScript value.
*/
  readonly execution_info: any;
/**
* Gets the transaction information.
*/
  readonly transaction: Transaction;
}
/**
* Wrapper struct for the `GetValidatorChangesResult` from casper_client.
*/
export class GetValidatorChangesResult {
  free(): void;
/**
* Converts the GetValidatorChangesResult to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
* Gets the validator changes as a JsValue.
*/
  readonly changes: any;
}
/**
*/
export class GlobalStateIdentifier {
  free(): void;
/**
* @param {GlobalStateIdentifier} global_state_identifier
*/
  constructor(global_state_identifier: GlobalStateIdentifier);
/**
* @param {BlockHash} block_hash
* @returns {GlobalStateIdentifier}
*/
  static fromBlockHash(block_hash: BlockHash): GlobalStateIdentifier;
/**
* @param {bigint} block_height
* @returns {GlobalStateIdentifier}
*/
  static fromBlockHeight(block_height: bigint): GlobalStateIdentifier;
/**
* @param {Digest} state_root_hash
* @returns {GlobalStateIdentifier}
*/
  static fromStateRootHash(state_root_hash: Digest): GlobalStateIdentifier;
/**
* @returns {any}
*/
  toJson(): any;
}
/**
*/
export class HashAddr {
  free(): void;
/**
* @param {Uint8Array} bytes
*/
  constructor(bytes: Uint8Array);
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
}
/**
*/
export class HashString {
  free(): void;
/**
* @returns {string}
*/
  toString(): string;
/**
*/
  readonly Deploy: string;
/**
*/
  readonly Version1: string;
/**
*/
  hash: string;
}
/**
*/
export class IntoUnderlyingByteSource {
  free(): void;
/**
* @param {ReadableByteStreamController} controller
*/
  start(controller: ReadableByteStreamController): void;
/**
* @param {ReadableByteStreamController} controller
* @returns {Promise<any>}
*/
  pull(controller: ReadableByteStreamController): Promise<any>;
/**
*/
  cancel(): void;
/**
*/
  readonly autoAllocateChunkSize: number;
/**
*/
  readonly type: string;
}
/**
*/
export class IntoUnderlyingSink {
  free(): void;
/**
* @param {any} chunk
* @returns {Promise<any>}
*/
  write(chunk: any): Promise<any>;
/**
* @returns {Promise<any>}
*/
  close(): Promise<any>;
/**
* @param {any} reason
* @returns {Promise<any>}
*/
  abort(reason: any): Promise<any>;
}
/**
*/
export class IntoUnderlyingSource {
  free(): void;
/**
* @param {ReadableStreamDefaultController} controller
* @returns {Promise<any>}
*/
  pull(controller: ReadableStreamDefaultController): Promise<any>;
/**
*/
  cancel(): void;
}
/**
*/
export class Key {
  free(): void;
/**
* @param {Key} key
*/
  constructor(key: Key);
/**
* @returns {any}
*/
  toJson(): any;
/**
* @param {URef} key
* @returns {Key}
*/
  static fromURef(key: URef): Key;
/**
* @param {DeployHash} key
* @returns {Key}
*/
  static fromDeployInfo(key: DeployHash): Key;
/**
* @param {AccountHash} key
* @returns {Key}
*/
  static fromAccount(key: AccountHash): Key;
/**
* @param {HashAddr} key
* @returns {Key}
*/
  static fromHash(key: HashAddr): Key;
/**
* @param {Uint8Array} key
* @returns {TransferAddr}
*/
  static fromTransfer(key: Uint8Array): TransferAddr;
/**
* @param {EraId} key
* @returns {Key}
*/
  static fromEraInfo(key: EraId): Key;
/**
* @param {URefAddr} key
* @returns {Key}
*/
  static fromBalance(key: URefAddr): Key;
/**
* @param {AccountHash} key
* @returns {Key}
*/
  static fromBid(key: AccountHash): Key;
/**
* @param {AccountHash} key
* @returns {Key}
*/
  static fromWithdraw(key: AccountHash): Key;
/**
* @param {DictionaryAddr} key
* @returns {Key}
*/
  static fromDictionaryAddr(key: DictionaryAddr): Key;
/**
* @returns {DictionaryAddr | undefined}
*/
  asDictionaryAddr(): DictionaryAddr | undefined;
/**
* @returns {Key}
*/
  static fromSystemEntityRegistry(): Key;
/**
* @returns {Key}
*/
  static fromEraSummary(): Key;
/**
* @param {AccountHash} key
* @returns {Key}
*/
  static fromUnbond(key: AccountHash): Key;
/**
* @returns {Key}
*/
  static fromChainspecRegistry(): Key;
/**
* @returns {Key}
*/
  static fromChecksumRegistry(): Key;
/**
* @returns {string}
*/
  toFormattedString(): string;
/**
* @param {string} formatted_str
* @returns {Key}
*/
  static fromFormattedString(formatted_str: string): Key;
/**
* @param {URef} seed_uref
* @param {Uint8Array} dictionary_item_key
* @returns {Key}
*/
  static fromDictionaryKey(seed_uref: URef, dictionary_item_key: Uint8Array): Key;
/**
* @returns {boolean}
*/
  isDictionaryKey(): boolean;
/**
* @returns {AccountHash | undefined}
*/
  intoAccount(): AccountHash | undefined;
/**
* @returns {HashAddr | undefined}
*/
  intoHash(): HashAddr | undefined;
/**
* @returns {URefAddr | undefined}
*/
  asBalance(): URefAddr | undefined;
/**
* @returns {URef | undefined}
*/
  intoURef(): URef | undefined;
/**
* @returns {Key | undefined}
*/
  urefToHash(): Key | undefined;
/**
* @returns {Key | undefined}
*/
  withdrawToUnbond(): Key | undefined;
}
/**
* Wrapper struct for the `ListRpcsResult` from casper_client.
*/
export class ListRpcsResult {
  free(): void;
/**
* Converts the ListRpcsResult to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
* Gets the name of the RPC.
*/
  readonly name: string;
/**
* Gets the schema of the RPC as a JsValue.
*/
  readonly schema: any;
}
/**
*/
export class Message {
  free(): void;
/**
*/
  String: string;
}
/**
*/
export class Messages {
  free(): void;
/**
*/
  block_index: bigint;
/**
*/
  entity_hash: string;
/**
*/
  message: Message;
/**
*/
  topic_index: number;
/**
*/
  topic_name: string;
/**
*/
  topic_name_hash: string;
}
/**
*/
export class PackageHash {
  free(): void;
/**
* @param {string} package_hash_hex_str
*/
  constructor(package_hash_hex_str: string);
/**
* @param {string} formatted_str
* @returns {PackageHash}
*/
  static fromFormattedStr(formatted_str: string): PackageHash;
/**
* @returns {string}
*/
  toFormattedString(): string;
/**
* @param {Uint8Array} bytes
* @returns {PackageHash}
*/
  static fromUint8Array(bytes: Uint8Array): PackageHash;
}
/**
*/
export class Path {
  free(): void;
/**
* @param {any} path
*/
  constructor(path: any);
/**
* @param {any} path
* @returns {Path}
*/
  static fromArray(path: any): Path;
/**
* @returns {any}
*/
  toJson(): any;
/**
* @returns {string}
*/
  toString(): string;
/**
* @returns {boolean}
*/
  is_empty(): boolean;
}
/**
*/
export class Payment {
  free(): void;
/**
*/
  source: string;
}
/**
*/
export class PaymentStrParams {
  free(): void;
/**
* @param {string | undefined} [payment_amount]
* @param {string | undefined} [payment_hash]
* @param {string | undefined} [payment_name]
* @param {string | undefined} [payment_package_hash]
* @param {string | undefined} [payment_package_name]
* @param {string | undefined} [payment_path]
* @param {Array<any> | undefined} [payment_args_simple]
* @param {string | undefined} [payment_args_json]
* @param {string | undefined} [payment_version]
* @param {string | undefined} [payment_entry_point]
*/
  constructor(payment_amount?: string, payment_hash?: string, payment_name?: string, payment_package_hash?: string, payment_package_name?: string, payment_path?: string, payment_args_simple?: Array<any>, payment_args_json?: string, payment_version?: string, payment_entry_point?: string);
/**
*/
  payment_amount: string;
/**
*/
  payment_args_json: string;
/**
*/
  payment_args_simple: Array<any>;
/**
*/
  payment_entry_point: string;
/**
*/
  payment_hash: string;
/**
*/
  payment_name: string;
/**
*/
  payment_package_hash: string;
/**
*/
  payment_package_name: string;
/**
*/
  payment_path: string;
/**
*/
  payment_version: string;
}
/**
*/
export class PeerEntry {
  free(): void;
/**
*/
  readonly address: string;
/**
*/
  readonly node_id: string;
}
/**
*/
export class PublicKey {
  free(): void;
/**
* @param {string} public_key_hex_str
*/
  constructor(public_key_hex_str: string);
/**
* @param {Uint8Array} bytes
* @returns {PublicKey}
*/
  static fromUint8Array(bytes: Uint8Array): PublicKey;
/**
* @returns {AccountHash}
*/
  toAccountHash(): AccountHash;
/**
* @returns {URef}
*/
  toPurseUref(): URef;
/**
* @returns {any}
*/
  toJson(): any;
}
/**
*/
export class PublicKeyString {
  free(): void;
/**
*/
  PublicKey: string;
}
/**
*/
export class PurseIdentifier {
  free(): void;
/**
* @param {PublicKey} key
*/
  constructor(key: PublicKey);
/**
* @param {AccountHash} account_hash
* @returns {PurseIdentifier}
*/
  static fromAccountHash(account_hash: AccountHash): PurseIdentifier;
/**
* @param {URef} uref
* @returns {PurseIdentifier}
*/
  static fromURef(uref: URef): PurseIdentifier;
/**
* @returns {any}
*/
  toJson(): any;
}
/**
*/
export class PutDeployResult {
  free(): void;
/**
* Converts PutDeployResult to a JavaScript object.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JavaScript value.
*/
  readonly api_version: any;
/**
* Gets the deploy hash associated with this result.
*/
  readonly deploy_hash: DeployHash;
}
/**
*/
export class PutTransactionResult {
  free(): void;
/**
* Converts PutTransactionResult to a JavaScript object.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JavaScript value.
*/
  readonly api_version: any;
/**
* Gets the transaction hash associated with this result.
*/
  readonly transaction_hash: TransactionHash;
}
/**
*/
export class QueryBalanceDetailsResult {
  free(): void;
/**
* Converts the QueryBalanceDetailsResult to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
*/
  readonly available_balance: any;
/**
*/
  readonly holds: any;
/**
*/
  readonly total_balance: any;
/**
*/
  readonly total_balance_proof: any;
}
/**
*/
export class QueryBalanceResult {
  free(): void;
/**
* Converts the QueryBalanceResult to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
* Gets the balance as a JsValue.
*/
  readonly balance: any;
}
/**
*/
export class QueryGlobalStateResult {
  free(): void;
/**
* Converts the QueryGlobalStateResult to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
* Gets the block header as a JsValue.
*/
  readonly block_header: any;
/**
* Gets the Merkle proof as a string.
*/
  readonly merkle_proof: string;
/**
* Gets the stored value as a JsValue.
*/
  readonly stored_value: any;
}
/**
*/
export class SDK {
  free(): void;
/**
* JavaScript function for deploying with deserialized parameters.
*
* # Arguments
*
* * `deploy_params` - Deploy parameters.
* * `session_params` - Session parameters.
* * `payment_params` - Payment parameters.
* * `verbosity` - An optional verbosity level.
* * `node_address` - An optional node address.
*
* # Returns
*
* A result containing PutDeployResult or a JsError.
* @param {DeployStrParams} deploy_params
* @param {SessionStrParams} session_params
* @param {PaymentStrParams} payment_params
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<PutDeployResult>}
*/
  deploy(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams, verbosity?: Verbosity, node_address?: string): Promise<PutDeployResult>;
/**
* @param {any} options
* @returns {getAccountOptions}
*/
  get_account_options(options: any): getAccountOptions;
/**
* Retrieves account information using the provided options.
*
* This function is an asynchronous JavaScript binding for the Rust `get_account` method.
*
* # Arguments
*
* * `options` - An optional `GetAccountOptions` struct containing retrieval options, such as:
*   - `account_identifier`: Identifier for the account.
*   - `account_identifier_as_string`: String representation of the account identifier.
*   - `maybe_block_id_as_string`: Optional string representation of the block ID.
*   - `maybe_block_identifier`: Optional `BlockIdentifierInput` for specifying the block.
*   - `verbosity`: Verbosity level for the output.
*   - `node_address`: Address of the node to query.
*
* # Returns
*
* A `Result` containing either a `GetAccountResult` on success or a `JsError` on failure.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process, such as issues with the provided options or network errors.
* ```
* @param {getAccountOptions | undefined} [options]
* @returns {Promise<GetAccountResult>}
*/
  get_account(options?: getAccountOptions): Promise<GetAccountResult>;
/**
* @param {getAccountOptions | undefined} [options]
* @returns {Promise<GetAccountResult>}
*/
  state_get_account_info(options?: getAccountOptions): Promise<GetAccountResult>;
/**
* Parses block options from a JsValue.
*
* # Arguments
*
* * `options` - A JsValue containing block options to be parsed.
*
* # Returns
*
* Parsed block options as a `GetBlockOptions` struct.
* @param {any} options
* @returns {getBlockOptions}
*/
  get_block_options(options: any): getBlockOptions;
/**
* Retrieves block information using the provided options.
*
* # Arguments
*
* * `options` - An optional `GetBlockOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `GetBlockResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {getBlockOptions | undefined} [options]
* @returns {Promise<GetBlockResult>}
*/
  get_block(options?: getBlockOptions): Promise<GetBlockResult>;
/**
* JavaScript Alias for the `get_block`.
*
* # Arguments
*
* * `options` - An optional `GetBlockOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `GetBlockResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {getBlockOptions | undefined} [options]
* @returns {Promise<GetBlockResult>}
*/
  chain_get_block(options?: getBlockOptions): Promise<GetBlockResult>;
/**
* Retrieves node status information using the provided options.
*
* # Arguments
*
* * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
* * `node_address` - An optional string specifying the node address to use for the request.
*
* # Returns
*
* A `Result` containing either a `GetNodeStatusResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<GetNodeStatusResult>}
*/
  get_node_status(verbosity?: Verbosity, node_address?: string): Promise<GetNodeStatusResult>;
/**
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<GetNodeStatusResult>}
*/
  info_get_status(verbosity?: Verbosity, node_address?: string): Promise<GetNodeStatusResult>;
/**
* Parses query balance options from a JsValue.
*
* # Arguments
*
* * `options` - A JsValue containing query balance options to be parsed.
*
* # Returns
*
* Parsed query balance options as a `QueryBalanceOptions` struct.
* @param {any} options
* @returns {queryBalanceOptions}
*/
  query_balance_options(options: any): queryBalanceOptions;
/**
* Retrieves balance information using the provided options.
*
* # Arguments
*
* * `options` - An optional `QueryBalanceOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `QueryBalanceResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {queryBalanceOptions | undefined} [options]
* @returns {Promise<QueryBalanceResult>}
*/
  query_balance(options?: queryBalanceOptions): Promise<QueryBalanceResult>;
/**
* Parses query global state options from a JsValue.
*
* # Arguments
*
* * `options` - A JsValue containing query global state options to be parsed.
*
* # Returns
*
* Parsed query global state options as a `QueryGlobalStateOptions` struct.
* @param {any} options
* @returns {queryGlobalStateOptions}
*/
  query_global_state_options(options: any): queryGlobalStateOptions;
/**
* Retrieves global state information using the provided options.
*
* # Arguments
*
* * `options` - An optional `QueryGlobalStateOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `QueryGlobalStateResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {queryGlobalStateOptions | undefined} [options]
* @returns {Promise<QueryGlobalStateResult>}
*/
  query_global_state(options?: queryGlobalStateOptions): Promise<QueryGlobalStateResult>;
/**
* Deserialize query_contract_key_options from a JavaScript object.
* @param {any} options
* @returns {queryContractKeyOptions}
*/
  query_contract_key_options(options: any): queryContractKeyOptions;
/**
* JavaScript function for query_contract_key with deserialized options.
* @param {queryContractKeyOptions | undefined} [options]
* @returns {Promise<QueryGlobalStateResult>}
*/
  query_contract_key(options?: queryContractKeyOptions): Promise<QueryGlobalStateResult>;
/**
* JS function for `make_transfer`.
*
* # Arguments
*
* * `amount` - The transfer amount.
* * `target_account` - The target account.
* * `transfer_id` - Optional transfer identifier.
* * `deploy_params` - The deploy parameters.
* * `payment_params` - The payment parameters.
*
* # Returns
*
* A `Result` containing the created `Deploy` or a `JsError` in case of an error.
* @param {string} amount
* @param {string} target_account
* @param {string | undefined} transfer_id
* @param {DeployStrParams} deploy_params
* @param {PaymentStrParams} payment_params
* @returns {Deploy}
*/
  make_transfer(amount: string, target_account: string, transfer_id: string | undefined, deploy_params: DeployStrParams, payment_params: PaymentStrParams): Deploy;
/**
* JS function for `make_transaction`.
*
* # Arguments
*
* * `builder_params` - Transaction Builder parameters.
* * `transaction_params` - The transaction parameters.
*
* # Returns
*
* A `Result` containing the created `Transaction` or a `JsError` in case of an error.
* @param {TransactionBuilderParams} builder_params
* @param {TransactionStrParams} transaction_params
* @returns {Transaction}
*/
  make_transaction(builder_params: TransactionBuilderParams, transaction_params: TransactionStrParams): Transaction;
/**
* JS function for `make_transfer_transaction`.
*
* # Arguments
*
* * `maybe_source` - Optional transfer source uref.
* * `amount` - The transfer amount.
* * `target` - The target account.
* * `transaction_params` - The transaction parameters.
* * `maybe_id` - Optional transfer identifier.
*
* # Returns
*
* A `Result` containing the created `Transaction` or a `JsError` in case of an error.
* @param {URef | undefined} maybe_source
* @param {string} target
* @param {string} amount
* @param {TransactionStrParams} transaction_params
* @param {string | undefined} [maybe_id]
* @returns {Transaction}
*/
  make_transfer_transaction(maybe_source: URef | undefined, target: string, amount: string, transaction_params: TransactionStrParams, maybe_id?: string): Transaction;
/**
* @param {string | undefined} [node_address]
* @param {Verbosity | undefined} [verbosity]
*/
  constructor(node_address?: string, verbosity?: Verbosity);
/**
* @param {string | undefined} [node_address]
* @returns {string}
*/
  getNodeAddress(node_address?: string): string;
/**
* @param {string | undefined} [node_address]
*/
  setNodeAddress(node_address?: string): void;
/**
* @param {Verbosity | undefined} [verbosity]
* @returns {Verbosity}
*/
  getVerbosity(verbosity?: Verbosity): Verbosity;
/**
* @param {Verbosity | undefined} [verbosity]
*/
  setVerbosity(verbosity?: Verbosity): void;
/**
* JS function for speculative transfer transaction.
*
* # Arguments
*
* * `maybe_source` - Optional transfer source uref.
* * `target_account` - The target account.
* * `amount` - The amount to transfer.
* * `maybe_id` - An optional transfer ID (defaults to a random number).
* * `transaction_params` - The transactionment parameters.
* * `maybe_block_id_as_string` - An optional block ID as a string.
* * `maybe_block_identifier` - An optional block identifier.
* * `verbosity` - The verbosity level for logging (optional).
* * `node_address` - The address of the node to connect to (optional).
*
* # Returns
*
* A `Result` containing the result of the speculative transfer or a `JsError` in case of an error.
* @param {URef | undefined} maybe_source
* @param {string} target_account
* @param {string} amount
* @param {TransactionStrParams} transaction_params
* @param {string | undefined} [maybe_id]
* @param {string | undefined} [maybe_block_id_as_string]
* @param {BlockIdentifier | undefined} [maybe_block_identifier]
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<SpeculativeExecTxnResult>}
*/
  speculative_transfer_transaction(maybe_source: URef | undefined, target_account: string, amount: string, transaction_params: TransactionStrParams, maybe_id?: string, maybe_block_id_as_string?: string, maybe_block_identifier?: BlockIdentifier, verbosity?: Verbosity, node_address?: string): Promise<SpeculativeExecTxnResult>;
/**
* JS function for speculative transfer.
*
* # Arguments
*
* * `amount` - The amount to transfer.
* * `target_account` - The target account.
* * `transfer_id` - An optional transfer ID (defaults to a random number).
* * `deploy_params` - The deployment parameters.
* * `payment_params` - The payment parameters.
* * `maybe_block_id_as_string` - An optional block ID as a string.
* * `maybe_block_identifier` - An optional block identifier.
* * `verbosity` - The verbosity level for logging (optional).
* * `node_address` - The address of the node to connect to (optional).
*
* # Returns
*
* A `Result` containing the result of the speculative transfer or a `JsError` in case of an error.
* @param {string} amount
* @param {string} target_account
* @param {string | undefined} transfer_id
* @param {DeployStrParams} deploy_params
* @param {PaymentStrParams} payment_params
* @param {string | undefined} [maybe_block_id_as_string]
* @param {BlockIdentifier | undefined} [maybe_block_identifier]
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<SpeculativeExecResult>}
*/
  speculative_transfer(amount: string, target_account: string, transfer_id: string | undefined, deploy_params: DeployStrParams, payment_params: PaymentStrParams, maybe_block_id_as_string?: string, maybe_block_identifier?: BlockIdentifier, verbosity?: Verbosity, node_address?: string): Promise<SpeculativeExecResult>;
/**
* Parses auction info options from a JsValue.
*
* # Arguments
*
* * `options` - A JsValue containing auction info options to be parsed.
*
* # Returns
*
* Result containing parsed auction info options as a `GetAuctionInfoOptions` struct,
* or a `JsError` if deserialization fails.
* @param {any} options
* @returns {getAuctionInfoOptions}
*/
  get_auction_info_options(options: any): getAuctionInfoOptions;
/**
* Retrieves auction information using the provided options.
*
* # Arguments
*
* * `options` - An optional `GetAuctionInfoOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `GetAuctionInfoResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {getAuctionInfoOptions | undefined} [options]
* @returns {Promise<GetAuctionInfoResult>}
*/
  get_auction_info(options?: getAuctionInfoOptions): Promise<GetAuctionInfoResult>;
/**
* @param {getAuctionInfoOptions | undefined} [options]
* @returns {Promise<GetAuctionInfoResult>}
*/
  state_get_auction_info_js_alias(options?: getAuctionInfoOptions): Promise<GetAuctionInfoResult>;
/**
* Parses block transfers options from a JsValue.
*
* # Arguments
*
* * `options` - A JsValue containing block transfers options to be parsed.
*
* # Returns
*
* Parsed block transfers options as a `GetBlockTransfersOptions` struct.
* @param {any} options
* @returns {getBlockTransfersOptions}
*/
  get_block_transfers_options(options: any): getBlockTransfersOptions;
/**
* Retrieves block transfers information using the provided options.
*
* # Arguments
*
* * `options` - An optional `GetBlockTransfersOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `GetBlockTransfersResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {getBlockTransfersOptions | undefined} [options]
* @returns {Promise<GetBlockTransfersResult>}
*/
  get_block_transfers(options?: getBlockTransfersOptions): Promise<GetBlockTransfersResult>;
/**
* @param {getBlockTransfersOptions | undefined} [options]
* @returns {Promise<GetBlockTransfersResult>}
*/
  chain_get_block_transfers(options?: getBlockTransfersOptions): Promise<GetBlockTransfersResult>;
/**
* Asynchronously retrieves the chainspec.
*
* # Arguments
*
* * `verbosity` - An optional `Verbosity` parameter.
* * `node_address` - An optional node address as a string.
*
* # Returns
*
* A `Result` containing either a `GetChainspecResult` or a `JsError` in case of an error.
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<GetChainspecResult>}
*/
  get_chainspec(verbosity?: Verbosity, node_address?: string): Promise<GetChainspecResult>;
/**
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<GetChainspecResult>}
*/
  info_get_chainspec(verbosity?: Verbosity, node_address?: string): Promise<GetChainspecResult>;
/**
* Parses deploy options from a JsValue.
*
* # Arguments
*
* * `options` - A JsValue containing deploy options to be parsed.
*
* # Returns
*
* Parsed deploy options as a `GetDeployOptions` struct.
* @param {any} options
* @returns {getDeployOptions}
*/
  get_deploy_options(options: any): getDeployOptions;
/**
* Retrieves deploy information using the provided options.
*
* # Arguments
*
* * `options` - An optional `GetDeployOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `GetDeployResult` or an error.
* @param {getDeployOptions | undefined} [options]
* @returns {Promise<GetDeployResult>}
*/
  get_deploy(options?: getDeployOptions): Promise<GetDeployResult>;
/**
* Retrieves deploy information using the provided options, alias for `get_deploy`.
* @param {getDeployOptions | undefined} [options]
* @returns {Promise<GetDeployResult>}
*/
  info_get_deploy(options?: getDeployOptions): Promise<GetDeployResult>;
/**
* @param {any} options
* @returns {getEraInfoOptions}
*/
  get_era_info_options(options: any): getEraInfoOptions;
/**
* @param {getEraInfoOptions | undefined} [options]
* @returns {Promise<GetEraInfoResult>}
*/
  get_era_info(options?: getEraInfoOptions): Promise<GetEraInfoResult>;
/**
* @param {getEraInfoOptions | undefined} [options]
* @returns {Promise<GetEraInfoResult>}
*/
  chain_get_era_info_by_switch_block(options?: getEraInfoOptions): Promise<GetEraInfoResult>;
/**
* Retrieves peers asynchronously.
*
* # Arguments
*
* * `verbosity` - Optional verbosity level.
* * `node_address` - Optional node address.
*
* # Returns
*
* A `Result` containing `GetPeersResult` or a `JsError` if an error occurs.
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<GetPeersResult>}
*/
  get_peers(verbosity?: Verbosity, node_address?: string): Promise<GetPeersResult>;
/**
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<GetPeersResult>}
*/
  info_get_peers(verbosity?: Verbosity, node_address?: string): Promise<GetPeersResult>;
/**
* Retrieves validator changes using the provided options.
*
* # Arguments
*
* * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
* * `node_address` - An optional string specifying the node address to use for the request.
*
* # Returns
*
* A `Result` containing either a `GetValidatorChangesResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<GetValidatorChangesResult>}
*/
  get_validator_changes(verbosity?: Verbosity, node_address?: string): Promise<GetValidatorChangesResult>;
/**
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<GetValidatorChangesResult>}
*/
  info_get_validator_change(verbosity?: Verbosity, node_address?: string): Promise<GetValidatorChangesResult>;
/**
* Lists available RPCs using the provided options.
*
* # Arguments
*
* * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
* * `node_address` - An optional string specifying the node address to use for the request.
*
* # Returns
*
* A `Result` containing either a `ListRpcsResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the listing process.
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<ListRpcsResult>}
*/
  list_rpcs(verbosity?: Verbosity, node_address?: string): Promise<ListRpcsResult>;
/**
* This function allows executing a transaction speculatively.
*
* # Arguments
*
* * `builder_params` - Transaction Builder parameters.
* * `transaction_params` - Transactionment parameters for the transaction.
* * `maybe_block_id_as_string` - An optional block ID as a string.
* * `maybe_block_identifier` - Optional block identifier.
* * `verbosity` - Optional verbosity level.
* * `node_address` - Optional node address.
*
* # Returns
*
* A `Result` containing either a `SpeculativeExecTxnResult` or a `JsError` in case of an error.
* @param {TransactionBuilderParams} builder_params
* @param {TransactionStrParams} transaction_params
* @param {string | undefined} [maybe_block_id_as_string]
* @param {BlockIdentifier | undefined} [maybe_block_identifier]
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<SpeculativeExecTxnResult>}
*/
  speculative_transaction(builder_params: TransactionBuilderParams, transaction_params: TransactionStrParams, maybe_block_id_as_string?: string, maybe_block_identifier?: BlockIdentifier, verbosity?: Verbosity, node_address?: string): Promise<SpeculativeExecTxnResult>;
/**
* JavaScript function for transactioning with deserialized parameters.
*
* # Arguments
*
* * `transaction_params` - Transaction parameters.
* * `builder_params` - Session parameters.
* * `verbosity` - An optional verbosity level.
* * `node_address` - An optional node address.
*
* # Returns
*
* A result containing PutTransactionResult or a JsError.
* @param {TransactionBuilderParams} builder_params
* @param {TransactionStrParams} transaction_params
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<PutTransactionResult>}
*/
  transaction(builder_params: TransactionBuilderParams, transaction_params: TransactionStrParams, verbosity?: Verbosity, node_address?: string): Promise<PutTransactionResult>;
/**
* JS function for `make_deploy`.
*
* # Arguments
*
* * `deploy_params` - The deploy parameters.
* * `session_params` - The session parameters.
* * `payment_params` - The payment parameters.
*
* # Returns
*
* A `Result` containing the created `Deploy` or a `JsError` in case of an error.
* @param {DeployStrParams} deploy_params
* @param {SessionStrParams} session_params
* @param {PaymentStrParams} payment_params
* @returns {Deploy}
*/
  make_deploy(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams): Deploy;
/**
* JS function for `sign_deploy`.
*
* # Arguments
*
* * `deploy` - The deploy to sign.
* * `secret_key` - The secret key for signing.
*
* # Returns
*
* The signed `Deploy`.
* @param {Deploy} deploy
* @param {string} secret_key
* @returns {Deploy}
*/
  sign_deploy(deploy: Deploy, secret_key: string): Deploy;
/**
* JS function for `sign_transaction`.
*
* # Arguments
*
* * `transaction` - The transaction to sign.
* * `secret_key` - The secret key for signing.
*
* # Returns
*
* The signed `Transaction`.
* @param {Transaction} transaction
* @param {string} secret_key
* @returns {Transaction}
*/
  sign_transaction(transaction: Transaction, secret_key: string): Transaction;
/**
* Installs a smart contract with the specified parameters and returns the result.
*
* # Arguments
*
* * `deploy_params` - The deploy parameters.
* * `session_params` - The session parameters.
* * `payment_amount` - The payment amount as a string.
* * `node_address` - An optional node address to send the request to.
*
* # Returns
*
* A `Result` containing either a `PutDeployResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the installation.
* @param {DeployStrParams} deploy_params
* @param {SessionStrParams} session_params
* @param {string} payment_amount
* @param {string | undefined} [node_address]
* @returns {Promise<PutDeployResult>}
*/
  install_deploy(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_amount: string, node_address?: string): Promise<PutDeployResult>;
/**
* Parses balance options from a JsValue.
*
* # Arguments
*
* * `options` - A JsValue containing balance options to be parsed.
*
* # Returns
*
* Parsed balance options as a `GetBalanceOptions` struct.
* @param {any} options
* @returns {getBalanceOptions}
*/
  get_balance_options(options: any): getBalanceOptions;
/**
* Retrieves balance information using the provided options.
*
* # Arguments
*
* * `options` - An optional `GetBalanceOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `GetBalanceResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {getBalanceOptions | undefined} [options]
* @returns {Promise<GetBalanceResult>}
*/
  get_balance(options?: getBalanceOptions): Promise<GetBalanceResult>;
/**
* JavaScript Alias for `get_balance`.
*
* # Arguments
*
* * `options` - An optional `GetBalanceOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `GetBalanceResult` or a `JsError` in case of an error.
* @param {getBalanceOptions | undefined} [options]
* @returns {Promise<GetBalanceResult>}
*/
  state_get_balance(options?: getBalanceOptions): Promise<GetBalanceResult>;
/**
* Parses transaction options from a JsValue.
*
* # Arguments
*
* * `options` - A JsValue containing transaction options to be parsed.
*
* # Returns
*
* Parsed transaction options as a `GetTransactionOptions` struct.
* @param {any} options
* @returns {getTransactionOptions}
*/
  get_transaction_options(options: any): getTransactionOptions;
/**
* Retrieves transaction information using the provided options.
*
* # Arguments
*
* * `options` - An optional `GetTransactionOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `GetTransactionResult` or an error.
* @param {getTransactionOptions | undefined} [options]
* @returns {Promise<GetTransactionResult>}
*/
  get_transaction(options?: getTransactionOptions): Promise<GetTransactionResult>;
/**
* Retrieves transaction information using the provided options, alias for `get_transaction`.
* @param {getTransactionOptions | undefined} [options]
* @returns {Promise<GetTransactionResult>}
*/
  info_get_transaction(options?: getTransactionOptions): Promise<GetTransactionResult>;
/**
* Get options for speculative execution from a JavaScript value.
* @param {any} options
* @returns {getSpeculativeExecTxnOptions}
*/
  get_speculative_exec_options(options: any): getSpeculativeExecTxnOptions;
/**
* JS function for speculative execution.
*
* # Arguments
*
* * `options` - The options for speculative execution.
*
* # Returns
*
* A `Result` containing the result of the speculative execution or a `JsError` in case of an error.
* @param {getSpeculativeExecTxnOptions | undefined} [options]
* @returns {Promise<SpeculativeExecTxnResult>}
*/
  speculative_exec(options?: getSpeculativeExecTxnOptions): Promise<SpeculativeExecTxnResult>;
/**
* Get options for speculative execution from a JavaScript value.
* @param {any} options
* @returns {getSpeculativeExecDeployOptions}
*/
  get_speculative_exec_deploy_options(options: any): getSpeculativeExecDeployOptions;
/**
* JS function for speculative execution.
*
* # Arguments
*
* * `options` - The options for speculative execution.
*
* # Returns
*
* A `Result` containing the result of the speculative execution or a `JsError` in case of an error.
* @param {getSpeculativeExecDeployOptions | undefined} [options]
* @returns {Promise<SpeculativeExecResult>}
*/
  speculative_exec_deploy(options?: getSpeculativeExecDeployOptions): Promise<SpeculativeExecResult>;
/**
* JS function for transaction transferring funds.
*
* # Arguments
*
* * `maybe_source` - Optional transfer source uref.
* * `target_account` - The target account.
* * `amount` - The amount to transfer.
* * `transaction_params` - The transaction parameters.
* * `maybe_id` - An optional transfer ID (defaults to a random number).
* * `verbosity` - The verbosity level for logging (optional).
* * `node_address` - The address of the node to connect to (optional).
*
* # Returns
*
* A `Result` containing the result of the transfer or a `JsError` in case of an error.
* @param {URef | undefined} maybe_source
* @param {string} target_account
* @param {string} amount
* @param {TransactionStrParams} transaction_params
* @param {string | undefined} [maybe_id]
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<PutTransactionResult>}
*/
  transfer_transaction(maybe_source: URef | undefined, target_account: string, amount: string, transaction_params: TransactionStrParams, maybe_id?: string, verbosity?: Verbosity, node_address?: string): Promise<PutTransactionResult>;
/**
* Installs a smart contract with the specified parameters and returns the result.
*
* # Arguments
*.
* * `transaction_params` - Transaction parameters.
* * `transaction_bytes` - Transaction Bytes to install
* * `node_address` - An optional node address to send the request to.
*
* # Returns
*
* A `Result` containing either a `PutTransactionResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the installation.
* @param {TransactionStrParams} transaction_params
* @param {Bytes} transaction_bytes
* @param {string | undefined} [node_address]
* @returns {Promise<PutTransactionResult>}
*/
  install(transaction_params: TransactionStrParams, transaction_bytes: Bytes, node_address?: string): Promise<PutTransactionResult>;
/**
* JS function for transferring funds.
*
* # Arguments
*
* * `amount` - The amount to transfer.
* * `target_account` - The target account.
* * `transfer_id` - An optional transfer ID (defaults to a random number).
* * `deploy_params` - The deployment parameters.
* * `payment_params` - The payment parameters.
* * `verbosity` - The verbosity level for logging (optional).
* * `node_address` - The address of the node to connect to (optional).
*
* # Returns
*
* A `Result` containing the result of the transfer or a `JsError` in case of an error.
* @param {string} amount
* @param {string} target_account
* @param {string | undefined} transfer_id
* @param {DeployStrParams} deploy_params
* @param {PaymentStrParams} payment_params
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<PutDeployResult>}
*/
  transfer(amount: string, target_account: string, transfer_id: string | undefined, deploy_params: DeployStrParams, payment_params: PaymentStrParams, verbosity?: Verbosity, node_address?: string): Promise<PutDeployResult>;
/**
* Parses state root hash options from a JsValue.
*
* # Arguments
*
* * `options` - A JsValue containing state root hash options to be parsed.
*
* # Returns
*
* Parsed state root hash options as a `GetStateRootHashOptions` struct.
* @param {any} options
* @returns {getStateRootHashOptions}
*/
  get_state_root_hash_options(options: any): getStateRootHashOptions;
/**
* Retrieves state root hash information using the provided options.
*
* # Arguments
*
* * `options` - An optional `GetStateRootHashOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `GetStateRootHashResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {getStateRootHashOptions | undefined} [options]
* @returns {Promise<GetStateRootHashResult>}
*/
  get_state_root_hash(options?: getStateRootHashOptions): Promise<GetStateRootHashResult>;
/**
* Retrieves state root hash information using the provided options (alias for `get_state_root_hash`).
*
* # Arguments
*
* * `options` - An optional `GetStateRootHashOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `GetStateRootHashResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {getStateRootHashOptions | undefined} [options]
* @returns {Promise<GetStateRootHashResult>}
*/
  chain_get_state_root_hash(options?: getStateRootHashOptions): Promise<GetStateRootHashResult>;
/**
* Puts a deploy using the provided options.
*
* # Arguments
*
* * `deploy` - The `Deploy` object to be sent.
* * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
* * `node_address` - An optional string specifying the node address to use for the request.
*
* # Returns
*
* A `Result` containing either a `PutDeployResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the deploy process.
* @param {Deploy} deploy
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<PutDeployResult>}
*/
  put_deploy(deploy: Deploy, verbosity?: Verbosity, node_address?: string): Promise<PutDeployResult>;
/**
* JavaScript Alias for `put_deploy`.
* @param {Deploy} deploy
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<PutDeployResult>}
*/
  account_put_deploy(deploy: Deploy, verbosity?: Verbosity, node_address?: string): Promise<PutDeployResult>;
/**
* Creates a new Watcher instance to watch deploys (JavaScript-friendly).
* Legacy alias
*
* # Arguments
*
* * `events_url` - The URL to monitor for transaction events.
* * `timeout_duration` - An optional timeout duration in seconds.
*
* # Returns
*
* A `Watcher` instance.
* @param {string} events_url
* @param {number | undefined} [timeout_duration]
* @returns {Watcher}
*/
  watchDeploy(events_url: string, timeout_duration?: number): Watcher;
/**
* Creates a new Watcher instance to watch deploys (JavaScript-friendly).
*
* # Arguments
*
* * `events_url` - The URL to monitor for transaction events.
* * `timeout_duration` - An optional timeout duration in seconds.
*
* # Returns
*
* A `Watcher` instance.
* @param {string} events_url
* @param {number | undefined} [timeout_duration]
* @returns {Watcher}
*/
  watchTransaction(events_url: string, timeout_duration?: number): Watcher;
/**
* Waits for a deploy event to be processed asynchronously (JavaScript-friendly).
* Legacy alias
*
* # Arguments
*
* * `events_url` - The URL to monitor for transaction events.
* * `deploy_hash` - The deploy hash to wait for.
* * `timeout_duration` - An optional timeout duration in seconds.
*
* # Returns
*
* A JavaScript `Promise` resolving to either the processed `EventParseResult` or an error message.
* @param {string} events_url
* @param {string} deploy_hash
* @param {number | undefined} [timeout_duration]
* @returns {Promise<Promise<any>>}
*/
  waitDeploy(events_url: string, deploy_hash: string, timeout_duration?: number): Promise<Promise<any>>;
/**
* Waits for a deploy event to be processed asynchronously (JavaScript-friendly).
*
* # Arguments
*
* * `events_url` - The URL to monitor for transaction events.
* * `target_hash` - The transaction hash to wait for.
* * `timeout_duration` - An optional timeout duration in seconds.
*
* # Returns
*
* A JavaScript `Promise` resolving to either the processed `EventParseResult` or an error message.
* @param {string} events_url
* @param {string} target_hash
* @param {number | undefined} [timeout_duration]
* @returns {Promise<Promise<any>>}
*/
  waitTransaction(events_url: string, target_hash: string, timeout_duration?: number): Promise<Promise<any>>;
/**
* Calls a smart contract entry point with the specified parameters and returns the result.
*
* # Arguments
*
* * `transaction_params` - Transaction parameters.
* * `builder_params` - Transaction Builder parameters.
* * `node_address` - An optional node address to send the request to.
*
* # Returns
*
* A `Result` containing either a `PutTransactionResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the call.
* @param {TransactionBuilderParams} builder_params
* @param {TransactionStrParams} transaction_params
* @param {string | undefined} [node_address]
* @returns {Promise<PutTransactionResult>}
*/
  call_entrypoint(builder_params: TransactionBuilderParams, transaction_params: TransactionStrParams, node_address?: string): Promise<PutTransactionResult>;
/**
* This function allows executing a deploy speculatively.
*
* # Arguments
*
* * `deploy_params` - Deployment parameters for the deploy.
* * `session_params` - Session parameters for the deploy.
* * `payment_params` - Payment parameters for the deploy.
* * `maybe_block_id_as_string` - An optional block ID as a string.
* * `maybe_block_identifier` - Optional block identifier.
* * `verbosity` - Optional verbosity level.
* * `node_address` - Optional node address.
*
* # Returns
*
* A `Result` containing either a `SpeculativeExecResult` or a `JsError` in case of an error.
* @param {DeployStrParams} deploy_params
* @param {SessionStrParams} session_params
* @param {PaymentStrParams} payment_params
* @param {string | undefined} [maybe_block_id_as_string]
* @param {BlockIdentifier | undefined} [maybe_block_identifier]
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<SpeculativeExecResult>}
*/
  speculative_deploy(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams, maybe_block_id_as_string?: string, maybe_block_identifier?: BlockIdentifier, verbosity?: Verbosity, node_address?: string): Promise<SpeculativeExecResult>;
/**
* Parses dictionary item options from a JsValue.
*
* # Arguments
*
* * `options` - A JsValue containing dictionary item options to be parsed.
*
* # Returns
*
* Parsed dictionary item options as a `GetDictionaryItemOptions` struct.
* @param {any} options
* @returns {getDictionaryItemOptions}
*/
  get_dictionary_item_options(options: any): getDictionaryItemOptions;
/**
* Retrieves dictionary item information using the provided options.
*
* # Arguments
*
* * `options` - An optional `GetDictionaryItemOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `GetDictionaryItemResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {getDictionaryItemOptions | undefined} [options]
* @returns {Promise<GetDictionaryItemResult>}
*/
  get_dictionary_item(options?: getDictionaryItemOptions): Promise<GetDictionaryItemResult>;
/**
* JavaScript Alias for `get_dictionary_item`
* @param {getDictionaryItemOptions | undefined} [options]
* @returns {Promise<GetDictionaryItemResult>}
*/
  state_get_dictionary_item(options?: getDictionaryItemOptions): Promise<GetDictionaryItemResult>;
/**
* @param {any} options
* @returns {getEntityOptions}
*/
  get_entity_options(options: any): getEntityOptions;
/**
* Retrieves entity information using the provided options.
*
* This function is an asynchronous JavaScript binding for the Rust `get_entity` method.
*
* # Arguments
*
* * `options` - An optional `GetEntityOptions` struct containing retrieval options, such as:
*   - `entity_identifier`: Identifier for the entity.
*   - `entity_identifier_as_string`: String representation of the entity identifier.
*   - `maybe_block_id_as_string`: Optional string representation of the block ID.
*   - `maybe_block_identifier`: Optional `BlockIdentifierInput` for specifying the block.
*   - `verbosity`: Verbosity level for the output.
*   - `node_address`: Address of the node to query.
*
* # Returns
*
* A `Result` containing either a `GetAddressableEntityResult` on success or a `JsError` on failure.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process, such as issues with the provided options or network errors.
* ```
* @param {getEntityOptions | undefined} [options]
* @returns {Promise<GetAddressableEntityResult>}
*/
  get_entity(options?: getEntityOptions): Promise<GetAddressableEntityResult>;
/**
* @param {getEntityOptions | undefined} [options]
* @returns {Promise<GetAddressableEntityResult>}
*/
  state_get_entity(options?: getEntityOptions): Promise<GetAddressableEntityResult>;
/**
* Parses era summary options from a JsValue.
*
* # Arguments
*
* * `options` - A JsValue containing era summary options to be parsed.
*
* # Returns
*
* Parsed era summary options as a `GetEraSummaryOptions` struct.
* @param {any} options
* @returns {getEraSummaryOptions}
*/
  get_era_summary_options(options: any): getEraSummaryOptions;
/**
* Retrieves era summary information using the provided options.
*
* # Arguments
*
* * `options` - An optional `GetEraSummaryOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `GetEraSummaryResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {getEraSummaryOptions | undefined} [options]
* @returns {Promise<GetEraSummaryResult>}
*/
  get_era_summary(options?: getEraSummaryOptions): Promise<GetEraSummaryResult>;
/**
* @param {getEraSummaryOptions | undefined} [options]
* @returns {Promise<GetEraSummaryResult>}
*/
  chain_get_era_summary(options?: getEraSummaryOptions): Promise<GetEraSummaryResult>;
/**
* Puts a transaction using the provided options.
*
* # Arguments
*
* * `transaction` - The `Transaction` object to be sent.
* * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
* * `node_address` - An optional string specifying the node address to use for the request.
*
* # Returns
*
* A `Result` containing either a `PutTransactionResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the transaction process.
* @param {Transaction} transaction
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<PutTransactionResult>}
*/
  put_transaction(transaction: Transaction, verbosity?: Verbosity, node_address?: string): Promise<PutTransactionResult>;
/**
* JavaScript Alias for `put_transaction`.
* @param {Transaction} transaction
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<PutTransactionResult>}
*/
  account_put_transaction(transaction: Transaction, verbosity?: Verbosity, node_address?: string): Promise<PutTransactionResult>;
/**
* Parses query balance options from a JsValue.
*
* # Arguments
*
* * `options` - A JsValue containing query balance options to be parsed.
*
* # Returns
*
* Parsed query balance options as a `QueryBalanceDetailsOptions` struct.
* @param {any} options
* @returns {queryBalanceDetailsOptions}
*/
  query_balance_details_options(options: any): queryBalanceDetailsOptions;
/**
* Retrieves balance information using the provided options.
*
* # Arguments
*
* * `options` - An optional `QueryBalanceDetailsOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `QueryBalanceDetailsResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {queryBalanceDetailsOptions | undefined} [options]
* @returns {Promise<QueryBalanceDetailsResult>}
*/
  query_balance_details(options?: queryBalanceDetailsOptions): Promise<QueryBalanceDetailsResult>;
/**
* Calls a smart contract entry point with the specified parameters and returns the result.
*
* # Arguments
*
* * `deploy_params` - The deploy parameters.
* * `session_params` - The session parameters.
* * `payment_amount` - The payment amount as a string.
* * `node_address` - An optional node address to send the request to.
*
* # Returns
*
* A `Result` containing either a `PutDeployResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the call.
* @param {DeployStrParams} deploy_params
* @param {SessionStrParams} session_params
* @param {string} payment_amount
* @param {string | undefined} [node_address]
* @returns {Promise<PutDeployResult>}
*/
  call_entrypoint_deploy(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_amount: string, node_address?: string): Promise<PutDeployResult>;
/**
* Deserialize query_contract_dict_options from a JavaScript object.
* @param {any} options
* @returns {queryContractDictOptions}
*/
  query_contract_dict_options(options: any): queryContractDictOptions;
/**
* JavaScript function for query_contract_dict with deserialized options.
* @param {queryContractDictOptions | undefined} [options]
* @returns {Promise<GetDictionaryItemResult>}
*/
  query_contract_dict(options?: queryContractDictOptions): Promise<GetDictionaryItemResult>;
}
/**
*/
export class SessionStrParams {
  free(): void;
/**
* @param {string | undefined} [session_hash]
* @param {string | undefined} [session_name]
* @param {string | undefined} [session_package_hash]
* @param {string | undefined} [session_package_name]
* @param {string | undefined} [session_path]
* @param {Bytes | undefined} [session_bytes]
* @param {Array<any> | undefined} [session_args_simple]
* @param {string | undefined} [session_args_json]
* @param {string | undefined} [session_version]
* @param {string | undefined} [session_entry_point]
* @param {boolean | undefined} [is_session_transfer]
*/
  constructor(session_hash?: string, session_name?: string, session_package_hash?: string, session_package_name?: string, session_path?: string, session_bytes?: Bytes, session_args_simple?: Array<any>, session_args_json?: string, session_version?: string, session_entry_point?: string, is_session_transfer?: boolean);
/**
*/
  is_session_transfer: boolean;
/**
*/
  session_args_json: string;
/**
*/
  session_args_simple: Array<any>;
/**
*/
  session_bytes: Bytes;
/**
*/
  session_entry_point: string;
/**
*/
  session_hash: string;
/**
*/
  session_name: string;
/**
*/
  session_package_hash: string;
/**
*/
  session_package_name: string;
/**
*/
  session_path: string;
/**
*/
  session_version: string;
}
/**
*/
export class SignatureResponse {
  free(): void;
/**
* @returns {boolean}
*/
  is_cancelled(): boolean;
/**
* @returns {string}
*/
  get_signature_hex(): string;
/**
* @returns {Uint8Array}
*/
  get_signature(): Uint8Array;
}
/**
*/
export class SpeculativeExecResult {
  free(): void;
/**
* Convert the result to JSON format.
* @returns {any}
*/
  toJson(): any;
/**
* Get the API version of the result.
*/
  readonly api_version: any;
/**
* Get the block hash.
*/
  readonly block_hash: BlockHash;
/**
* Get the execution result.
*/
  readonly execution_result: any;
}
/**
*/
export class SpeculativeExecTxnResult {
  free(): void;
/**
* Convert the result to JSON format.
* @returns {any}
*/
  toJson(): any;
/**
* Get the API version of the result.
*/
  readonly api_version: any;
/**
* Get the block hash.
*/
  readonly block_hash: BlockHash;
/**
* Get the execution result.
*/
  readonly execution_result: any;
}
/**
* Represents a subscription to transaction events for wasm32 target architecture.
*/
export class Subscription {
  free(): void;
/**
* Constructor for Subscription for wasm32 target architecture.
*
* # Arguments
*
* * `transaction_hash` - Transaction hash to identify the subscription.
* * `event_handler_fn` - Handler function for transaction events.
* @param {string} target_hash
* @param {Function} event_handler_fn
*/
  constructor(target_hash: string, event_handler_fn: Function);
/**
* Handler function for transaction events.
*/
  eventHandlerFn: Function;
/**
* Transaction target hash to identify the subscription.
*/
  targetHash: string;
}
/**
*/
export class Transaction {
  free(): void;
/**
* @param {any} transaction
*/
  constructor(transaction: any);
/**
* @returns {any}
*/
  toJson(): any;
/**
* @param {TransactionBuilderParams} builder_params
* @param {TransactionStrParams} transaction_params
* @returns {Transaction}
*/
  static newSession(builder_params: TransactionBuilderParams, transaction_params: TransactionStrParams): Transaction;
/**
* @param {URef | undefined} maybe_source
* @param {string} target_account
* @param {string} amount
* @param {TransactionStrParams} transaction_params
* @param {string | undefined} [maybe_id]
* @returns {Transaction}
*/
  static newTransfer(maybe_source: URef | undefined, target_account: string, amount: string, transaction_params: TransactionStrParams, maybe_id?: string): Transaction;
/**
* @param {string} ttl
* @param {string | undefined} [secret_key]
* @returns {Transaction}
*/
  withTTL(ttl: string, secret_key?: string): Transaction;
/**
* @param {string} timestamp
* @param {string | undefined} [secret_key]
* @returns {Transaction}
*/
  withTimestamp(timestamp: string, secret_key?: string): Transaction;
/**
* @param {string} chain_name
* @param {string | undefined} [secret_key]
* @returns {Transaction}
*/
  withChainName(chain_name: string, secret_key?: string): Transaction;
/**
* @param {PublicKey} public_key
* @param {string | undefined} [secret_key]
* @returns {Transaction}
*/
  withPublicKey(public_key: PublicKey, secret_key?: string): Transaction;
/**
* @param {AccountHash} account_hash
* @param {string | undefined} [secret_key]
* @returns {Transaction}
*/
  withAccountHash(account_hash: AccountHash, secret_key?: string): Transaction;
/**
* @param {string} entry_point
* @param {string | undefined} [secret_key]
* @returns {Transaction}
*/
  withEntryPoint(entry_point: string, secret_key?: string): Transaction;
/**
* @param {AddressableEntityHash} hash
* @param {string | undefined} [secret_key]
* @returns {Transaction}
*/
  withEntityHash(hash: AddressableEntityHash, secret_key?: string): Transaction;
/**
* @param {PackageHash} package_hash
* @param {string | undefined} [secret_key]
* @returns {Transaction}
*/
  withPackageHash(package_hash: PackageHash, secret_key?: string): Transaction;
/**
* @param {Bytes} transaction_bytes
* @param {string | undefined} [secret_key]
* @returns {Transaction}
*/
  withTransactionBytes(transaction_bytes: Bytes, secret_key?: string): Transaction;
/**
* @param {string | undefined} [secret_key]
* @returns {Transaction}
*/
  withSecretKey(secret_key?: string): Transaction;
/**
* @param {any} body
* @param {string | undefined} [secret_key]
* @returns {Transaction}
*/
  withBody(body: any, secret_key?: string): Transaction;
/**
* @returns {boolean}
*/
  verify(): boolean;
/**
* @param {string} secret_key
* @returns {Transaction}
*/
  sign(secret_key: string): Transaction;
/**
* @returns {any}
*/
  approvalsHash(): any;
/**
* @returns {any}
*/
  session_args(): any;
/**
* @param {string} public_key
* @param {string} signature
* @returns {Transaction}
*/
  addSignature(public_key: string, signature: string): Transaction;
/**
* @param {any} js_value_arg
* @param {string | undefined} [secret_key]
* @returns {Transaction}
*/
  addArg(js_value_arg: any, secret_key?: string): Transaction;
/**
*/
  readonly account_hash: AccountHash;
/**
*/
  readonly approvals: any;
/**
*/
  readonly authorization_keys: any;
/**
*/
  readonly chain_name: string;
/**
*/
  readonly entry_point: string;
/**
*/
  readonly expired: boolean;
/**
*/
  readonly expires: any;
/**
*/
  readonly hash: TransactionHash;
/**
*/
  readonly header: any;
/**
*/
  readonly initiator_addr: string;
/**
*/
  readonly is_native: boolean;
/**
*/
  readonly is_standard_payment: boolean;
/**
*/
  readonly signers: any;
/**
*/
  readonly size_estimate: number;
/**
*/
  readonly timestamp: string;
/**
*/
  readonly ttl: string;
}
/**
*/
export class TransactionBuilderParams {
  free(): void;
/**
* @param {Bytes | undefined} [transaction_bytes]
* @param {TransactionCategory | undefined} [transaction_category]
* @returns {TransactionBuilderParams}
*/
  static newSession(transaction_bytes?: Bytes, transaction_category?: TransactionCategory): TransactionBuilderParams;
/**
* @param {URef | undefined} maybe_source
* @param {TransferTarget} target
* @param {string} amount
* @param {bigint | undefined} [maybe_id]
* @returns {TransactionBuilderParams}
*/
  static newTransfer(maybe_source: URef | undefined, target: TransferTarget, amount: string, maybe_id?: bigint): TransactionBuilderParams;
/**
* @param {AddressableEntityHash} entity_hash
* @param {string} entry_point
* @returns {TransactionBuilderParams}
*/
  static newInvocableEntity(entity_hash: AddressableEntityHash, entry_point: string): TransactionBuilderParams;
/**
* @param {string} entity_alias
* @param {string} entry_point
* @returns {TransactionBuilderParams}
*/
  static newInvocableEntityAlias(entity_alias: string, entry_point: string): TransactionBuilderParams;
/**
* @param {PackageHash} package_hash
* @param {string} entry_point
* @param {string | undefined} [maybe_entity_version]
* @returns {TransactionBuilderParams}
*/
  static newPackage(package_hash: PackageHash, entry_point: string, maybe_entity_version?: string): TransactionBuilderParams;
/**
* @param {string} package_alias
* @param {string} entry_point
* @param {string | undefined} [maybe_entity_version]
* @returns {TransactionBuilderParams}
*/
  static newPackageAlias(package_alias: string, entry_point: string, maybe_entity_version?: string): TransactionBuilderParams;
/**
* @param {PublicKey} public_key
* @param {number} delegation_rate
* @param {string} amount
* @param {bigint} minimum_delegation_amount
* @param {bigint} maximum_delegation_amount
* @returns {TransactionBuilderParams}
*/
  static newAddBid(public_key: PublicKey, delegation_rate: number, amount: string, minimum_delegation_amount: bigint, maximum_delegation_amount: bigint): TransactionBuilderParams;
/**
* @param {PublicKey} delegator
* @param {PublicKey} validator
* @param {string} amount
* @returns {TransactionBuilderParams}
*/
  static newDelegate(delegator: PublicKey, validator: PublicKey, amount: string): TransactionBuilderParams;
/**
* @param {PublicKey} delegator
* @param {PublicKey} validator
* @param {string} amount
* @returns {TransactionBuilderParams}
*/
  static newUndelegate(delegator: PublicKey, validator: PublicKey, amount: string): TransactionBuilderParams;
/**
* @param {PublicKey} delegator
* @param {PublicKey} validator
* @param {PublicKey} new_validator
* @param {string} amount
* @returns {TransactionBuilderParams}
*/
  static newRedelegate(delegator: PublicKey, validator: PublicKey, new_validator: PublicKey, amount: string): TransactionBuilderParams;
/**
* @param {PublicKey} public_key
* @param {string} amount
* @returns {TransactionBuilderParams}
*/
  static newWithdrawBid(public_key: PublicKey, amount: string): TransactionBuilderParams;
/**
*/
  amount: string;
/**
*/
  delegation_rate: number;
/**
*/
  delegator: PublicKey;
/**
*/
  entity_alias: string;
/**
*/
  entity_hash: AddressableEntityHash;
/**
*/
  entry_point: string;
/**
*/
  kind: TransactionKind;
/**
*/
  maximum_delegation_amount: bigint;
/**
*/
  maybe_entity_version: number;
/**
*/
  maybe_id: bigint;
/**
*/
  maybe_source: URef;
/**
*/
  minimum_delegation_amount: bigint;
/**
*/
  new_validator: PublicKey;
/**
*/
  package_alias: string;
/**
*/
  package_hash: PackageHash;
/**
*/
  public_key: PublicKey;
/**
*/
  target: TransferTarget;
/**
*/
  transaction_bytes: Bytes;
/**
*/
  transaction_category: TransactionCategory;
/**
*/
  validator: PublicKey;
}
/**
*/
export class TransactionHash {
  free(): void;
/**
* @param {string} transaction_hash_hex_str
*/
  constructor(transaction_hash_hex_str: string);
/**
* @param {Uint8Array} bytes
* @returns {TransactionHash}
*/
  static fromRaw(bytes: Uint8Array): TransactionHash;
/**
* @returns {Digest}
*/
  digest(): Digest;
/**
* @returns {any}
*/
  toJson(): any;
/**
* @returns {string}
*/
  toString(): string;
}
/**
* Represents processed deploy information.
*/
export class TransactionProcessed {
  free(): void;
/**
*/
  block_hash: string;
/**
* Result of the execution, either Success or Failure.
*/
  execution_result: ExecutionResult;
/**
*/
  hash: HashString;
/**
*/
  initiator_addr: PublicKeyString;
/**
*/
  messages: (Messages)[];
/**
*/
  timestamp: string;
/**
*/
  ttl: string;
}
/**
*/
export class TransactionStrParams {
  free(): void;
/**
* @param {string} chain_name
* @param {string | undefined} [initiator_addr]
* @param {string | undefined} [secret_key]
* @param {string | undefined} [timestamp]
* @param {string | undefined} [ttl]
* @param {(string)[] | undefined} [session_args_simple]
* @param {string | undefined} [session_args_json]
* @param {PricingMode | undefined} [pricing_mode]
* @param {string | undefined} [payment_amount]
* @param {string | undefined} [gas_price_tolerance]
* @param {string | undefined} [receipt]
* @param {boolean | undefined} [standard_payment]
*/
  constructor(chain_name: string, initiator_addr?: string, secret_key?: string, timestamp?: string, ttl?: string, session_args_simple?: (string)[], session_args_json?: string, pricing_mode?: PricingMode, payment_amount?: string, gas_price_tolerance?: string, receipt?: string, standard_payment?: boolean);
/**
* @param {string} chain_name
* @param {string | undefined} [initiator_addr]
* @param {string | undefined} [secret_key]
* @param {string | undefined} [ttl]
* @returns {TransactionStrParams}
*/
  static new_with_defaults(chain_name: string, initiator_addr?: string, secret_key?: string, ttl?: string): TransactionStrParams;
/**
*/
  setDefaultTimestamp(): void;
/**
*/
  setDefaultTTL(): void;
/**
*/
  chain_name: string;
/**
*/
  gas_price_tolerance: string;
/**
*/
  initiator_addr: string;
/**
*/
  payment_amount: string;
/**
*/
  pricing_mode: PricingMode;
/**
*/
  receipt: string;
/**
*/
  secret_key: string;
/**
*/
  session_args_json: string;
/**
*/
  session_args_simple: (string)[];
/**
*/
  standard_payment: boolean;
/**
*/
  timestamp?: string;
/**
*/
  ttl?: string;
}
/**
*/
export class TransferAddr {
  free(): void;
/**
* @param {Uint8Array} bytes
*/
  constructor(bytes: Uint8Array);
}
/**
*/
export class TransferTarget {
  free(): void;
/**
* @param {TransferTargetKind} kind
* @param {PublicKey | undefined} [public_key]
* @param {AccountHash | undefined} [account_hash]
* @param {URef | undefined} [uref]
*/
  constructor(kind: TransferTargetKind, public_key?: PublicKey, account_hash?: AccountHash, uref?: URef);
}
/**
*/
export class URef {
  free(): void;
/**
* @param {string} uref_hex_str
* @param {number} access_rights
*/
  constructor(uref_hex_str: string, access_rights: number);
/**
* @param {string} formatted_str
* @returns {URef}
*/
  static fromFormattedStr(formatted_str: string): URef;
/**
* @param {Uint8Array} bytes
* @param {number} access_rights
* @returns {URef}
*/
  static fromUint8Array(bytes: Uint8Array, access_rights: number): URef;
/**
* @returns {string}
*/
  toFormattedString(): string;
/**
* @returns {any}
*/
  toJson(): any;
}
/**
*/
export class URefAddr {
  free(): void;
/**
* @param {Uint8Array} bytes
*/
  constructor(bytes: Uint8Array);
}
/**
* Represents a success response containing a cost value.
*/
export class Version2 {
  free(): void;
/**
*/
  consumed: string;
/**
*/
  cost: string;
/**
*/
  error_message?: string;
/**
*/
  initiator: PublicKeyString;
/**
*/
  limit: string;
}
/**
* Represents a deploy watcher responsible for monitoring transaction events.
*
* This struct allows clients to subscribe to transaction events, start watching for events,
* or wait for an event and handle the received deploy event data.
*
* # Fields
*
* * `events_url` - The URL for transaction events.
* * `subscriptions` - Vector containing deploy subscriptions.
* * `active` - Reference-counted cell indicating whether the deploy watcher is active.
* * `timeout_duration` - Duration representing the optional timeout for watching events.
*/
export class Watcher {
  free(): void;
/**
* Creates a new `Watcher` instance.
*
* # Arguments
*
* * `events_url` - The URL for transaction events.
* * `timeout_duration` - Optional duration in milliseconds for watching events. If not provided,
*   a default timeout of 60,000 milliseconds (1 minute) is used.
*
* # Returns
*
* A new `Watcher` instance.
* @param {string} events_url
* @param {bigint | undefined} [timeout_duration]
*/
  constructor(events_url: string, timeout_duration?: bigint);
/**
* Subscribes to transaction events.
*
* # Arguments
*
* * `subscriptions` - Vector of deploy subscriptions to be added.
*
* # Returns
*
* Result indicating success or an error message.
* @param {(Subscription)[]} subscriptions
*/
  subscribe(subscriptions: (Subscription)[]): void;
/**
* Unsubscribes from transaction events based on the provided transaction hash.
*
* # Arguments
*
* * `transaction_hash` - The transaction hash to unsubscribe.
*
* This method removes the deploy subscription associated with the provided transaction hash.
* @param {string} target_hash
*/
  unsubscribe(target_hash: string): void;
/**
* Starts watching for transaction events (JavaScript-friendly).
*
* # Returns
*
* Result containing the serialized transaction events data or an error message.
* @returns {Promise<any>}
*/
  start(): Promise<any>;
/**
* Stops watching for transaction events.
*
* This method sets the deploy watcher as inactive and stops the event listener if it exists.
*/
  stop(): void;
}
/**
*/
export class getAccountOptions {
  free(): void;
/**
*/
  account_identifier?: AccountIdentifier;
/**
*/
  account_identifier_as_string?: string;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  maybe_block_identifier?: BlockIdentifier;
/**
*/
  node_address?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
* Options for the `get_auction_info` method.
*/
export class getAuctionInfoOptions {
  free(): void;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  maybe_block_identifier?: BlockIdentifier;
/**
*/
  node_address?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
* Options for the `get_balance` method.
*/
export class getBalanceOptions {
  free(): void;
/**
*/
  node_address?: string;
/**
*/
  purse_uref?: URef;
/**
*/
  purse_uref_as_string?: string;
/**
*/
  state_root_hash?: Digest;
/**
*/
  state_root_hash_as_string?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
* Options for the `get_block` method.
*/
export class getBlockOptions {
  free(): void;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  maybe_block_identifier?: BlockIdentifier;
/**
*/
  node_address?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
* Options for the `get_block_transfers` method.
*/
export class getBlockTransfersOptions {
  free(): void;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  maybe_block_identifier?: BlockIdentifier;
/**
*/
  node_address?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
* Options for the `get_deploy` method.
*/
export class getDeployOptions {
  free(): void;
/**
*/
  deploy_hash?: DeployHash;
/**
*/
  deploy_hash_as_string?: string;
/**
*/
  finalized_approvals?: boolean;
/**
*/
  node_address?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
* Options for the `get_dictionary_item` method.
*/
export class getDictionaryItemOptions {
  free(): void;
/**
*/
  dictionary_item_identifier?: DictionaryItemIdentifier;
/**
*/
  dictionary_item_params?: DictionaryItemStrParams;
/**
*/
  node_address?: string;
/**
*/
  state_root_hash?: Digest;
/**
*/
  state_root_hash_as_string?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
*/
export class getEntityOptions {
  free(): void;
/**
*/
  entity_identifier?: EntityIdentifier;
/**
*/
  entity_identifier_as_string?: string;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  maybe_block_identifier?: BlockIdentifier;
/**
*/
  node_address?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
*/
export class getEraInfoOptions {
  free(): void;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  maybe_block_identifier?: BlockIdentifier;
/**
*/
  node_address?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
* Options for the `get_era_summary` method.
*/
export class getEraSummaryOptions {
  free(): void;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  maybe_block_identifier?: BlockIdentifier;
/**
*/
  node_address?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
* Options for speculative execution.
*/
export class getSpeculativeExecDeployOptions {
  free(): void;
/**
* The deploy to execute.
*/
  deploy?: Deploy;
/**
* The deploy as a JSON string.
*/
  deploy_as_string?: string;
/**
* The block identifier as a string.
*/
  maybe_block_id_as_string?: string;
/**
* The block identifier.
*/
  maybe_block_identifier?: BlockIdentifier;
/**
* The node address.
*/
  node_address?: string;
/**
* The verbosity level for logging.
*/
  verbosity?: Verbosity;
}
/**
* Options for speculative execution.
*/
export class getSpeculativeExecTxnOptions {
  free(): void;
/**
* The block identifier as a string.
*/
  maybe_block_id_as_string?: string;
/**
* The block identifier.
*/
  maybe_block_identifier?: BlockIdentifier;
/**
* The node address.
*/
  node_address?: string;
/**
* The transaction to execute.
*/
  transaction?: Transaction;
/**
* The transaction as a JSON string.
*/
  transaction_as_string?: string;
/**
* The verbosity level for logging.
*/
  verbosity?: Verbosity;
}
/**
* Options for the `get_state_root_hash` method.
*/
export class getStateRootHashOptions {
  free(): void;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  maybe_block_identifier?: BlockIdentifier;
/**
*/
  node_address?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
* Options for the `get_transaction` method.
*/
export class getTransactionOptions {
  free(): void;
/**
*/
  finalized_approvals?: boolean;
/**
*/
  node_address?: string;
/**
*/
  transaction_hash?: TransactionHash;
/**
*/
  transaction_hash_as_string?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
* Options for the `query_balance` method.
*/
export class queryBalanceDetailsOptions {
  free(): void;
/**
*/
  global_state_identifier?: GlobalStateIdentifier;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  node_address?: string;
/**
*/
  purse_identifier?: PurseIdentifier;
/**
*/
  purse_identifier_as_string?: string;
/**
*/
  state_root_hash?: Digest;
/**
*/
  state_root_hash_as_string?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
* Options for the `query_balance` method.
*/
export class queryBalanceOptions {
  free(): void;
/**
*/
  global_state_identifier?: GlobalStateIdentifier;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  node_address?: string;
/**
*/
  purse_identifier?: PurseIdentifier;
/**
*/
  purse_identifier_as_string?: string;
/**
*/
  state_root_hash?: Digest;
/**
*/
  state_root_hash_as_string?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
*/
export class queryContractDictOptions {
  free(): void;
/**
*/
  dictionary_item_identifier?: DictionaryItemIdentifier;
/**
*/
  dictionary_item_params?: DictionaryItemStrParams;
/**
*/
  node_address?: string;
/**
*/
  state_root_hash?: Digest;
/**
*/
  state_root_hash_as_string?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
*/
export class queryContractKeyOptions {
  free(): void;
/**
*/
  contract_key?: Key;
/**
*/
  contract_key_as_string?: string;
/**
*/
  global_state_identifier?: GlobalStateIdentifier;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  node_address?: string;
/**
*/
  path?: Path;
/**
*/
  path_as_string?: string;
/**
*/
  state_root_hash?: Digest;
/**
*/
  state_root_hash_as_string?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
* Options for the `query_global_state` method.
*/
export class queryGlobalStateOptions {
  free(): void;
/**
*/
  global_state_identifier?: GlobalStateIdentifier;
/**
*/
  key?: Key;
/**
*/
  key_as_string?: string;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  node_address?: string;
/**
*/
  path?: Path;
/**
*/
  path_as_string?: string;
/**
*/
  state_root_hash?: Digest;
/**
*/
  state_root_hash_as_string?: string;
/**
*/
  verbosity?: Verbosity;
}
