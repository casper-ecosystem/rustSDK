import { Inject, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CONFIG, EnvironmentConfig } from '@util/config';
import { ErrorService } from '@util/error';
import { FormService } from '@util/form';
import { ResultService } from '@util/result';
import { SDK_TOKEN } from '@util/wasm';
import { BlockHash, EraId, hexToUint8Array, PeerEntry, PublicKey, RecordId, SDK, TransactionHash } from 'casper-sdk';

@Injectable({
  providedIn: 'root',
})
export class BinaryService {
  constructor(
    @Inject(CONFIG) public readonly config: EnvironmentConfig,
    @Inject(SDK_TOKEN) private readonly sdk: SDK,
    private readonly resultService: ResultService,
    private readonly formService: FormService,
    private readonly errorService: ErrorService,
  ) {
  }

  async get_binary_latest_switch_block_header() {
    const get_binary_latest_switch_block_header = await this.sdk.get_binary_latest_switch_block_header();
    get_binary_latest_switch_block_header && this.resultService.setResult(get_binary_latest_switch_block_header);
    return get_binary_latest_switch_block_header;
  }

  async get_binary_latest_block_header() {
    const get_binary_latest_block_header = await this.sdk.get_binary_latest_block_header();
    get_binary_latest_block_header && this.resultService.setResult(get_binary_latest_block_header);
    return get_binary_latest_block_header;
  }

  async get_binary_block_header() {
    const block_identifier_height: string = this.getIdentifier('blockIdentifierHeight')?.value?.trim();
    const block_identifier_hash: string = this.getIdentifier('blockIdentifierHash')?.value?.trim();
    if (block_identifier_hash) {
      const get_binary_block_header_by_hash = await this.sdk.get_binary_block_header_by_hash(new BlockHash(block_identifier_hash));
      get_binary_block_header_by_hash && this.resultService.setResult(get_binary_block_header_by_hash);
      return get_binary_block_header_by_hash;
    } else if (block_identifier_height) {
      const get_binary_block_header_by_height = await this.sdk.get_binary_block_header_by_height(BigInt(block_identifier_height));
      get_binary_block_header_by_height && this.resultService.setResult(get_binary_block_header_by_height);
      return get_binary_block_header_by_height;
    } else {
      return this.get_binary_latest_block_header();
    }
  }

  async get_binary_latest_signed_block() {
    const get_binary_latest_signed_block = await this.sdk.get_binary_latest_signed_block();
    get_binary_latest_signed_block && this.resultService.setResult(get_binary_latest_signed_block);
    return get_binary_latest_signed_block;
  }

  async get_binary_signed_block() {
    const block_identifier_height: string = this.getIdentifier('blockIdentifierHeight')?.value?.trim();
    const block_identifier_hash: string = this.getIdentifier('blockIdentifierHash')?.value?.trim();
    if (block_identifier_hash) {
      const get_binary_signed_block_by_hash = await this.sdk.get_binary_signed_block_by_hash(new BlockHash(block_identifier_hash));
      get_binary_signed_block_by_hash && this.resultService.setResult(get_binary_signed_block_by_hash);
      return get_binary_signed_block_by_hash;
    } else if (block_identifier_height) {
      const get_binary_signed_block_by_height = await this.sdk.get_binary_signed_block_by_height(BigInt(block_identifier_height));
      get_binary_signed_block_by_height && this.resultService.setResult(get_binary_signed_block_by_height);
      return get_binary_signed_block_by_height;
    } else {
      return this.get_binary_latest_signed_block();
    }
  }

  async get_binary_transaction() {
    const transaction_hash_hash: string = this.getIdentifier('transactionHash')?.value?.trim();
    const finalized_approvals: boolean = this.getIdentifier('finalizedApprovals')?.value;
    const get_binary_transaction_by_hash = await this.sdk.get_binary_transaction_by_hash(new TransactionHash(transaction_hash_hash), finalized_approvals);
    get_binary_transaction_by_hash && this.resultService.setResult(get_binary_transaction_by_hash);
    return get_binary_transaction_by_hash;
  }

  async get_binary_peers() {
    console.log(this.sdk.getNodeAddress());
    let peers: PeerEntry[] = [];
    try {
      const get_binary_peers = await this.sdk.get_binary_peers();
      get_binary_peers && this.resultService.setResult(get_binary_peers);
      get_binary_peers && (peers = get_binary_peers.peers);
    } catch (err) {
      err && this.errorService.setError(err.toString());
    }
    return peers;
  }

  async get_binary_uptime() {
    const get_binary_uptime = await this.sdk.get_binary_uptime();
    get_binary_uptime && this.resultService.setResult(get_binary_uptime);
    return get_binary_uptime;
  }

  async get_binary_last_progress() {
    const get_binary_last_progress = await this.sdk.get_binary_last_progress();
    get_binary_last_progress && this.resultService.setResult(get_binary_last_progress);
    return get_binary_last_progress;
  }

  async get_binary_reactor_state() {
    const get_binary_reactor_state = await this.sdk.get_binary_reactor_state();
    get_binary_reactor_state && this.resultService.setResult(get_binary_reactor_state);
    return get_binary_reactor_state;
  }

  async get_binary_network_name() {
    const get_binary_network_name = await this.sdk.get_binary_network_name();
    get_binary_network_name && this.resultService.setResult(get_binary_network_name);
    return get_binary_network_name;
  }

  async get_binary_consensus_validator_changes() {
    const get_binary_consensus_validator_changes = await this.sdk.get_binary_consensus_validator_changes();
    get_binary_consensus_validator_changes && this.resultService.setResult(get_binary_consensus_validator_changes);
    return get_binary_consensus_validator_changes;
  }

  async get_binary_block_synchronizer_status() {
    const get_binary_block_synchronizer_status = await this.sdk.get_binary_block_synchronizer_status();
    get_binary_block_synchronizer_status && this.resultService.setResult(get_binary_block_synchronizer_status);
    return get_binary_block_synchronizer_status;
  }

  async get_binary_available_block_range() {
    const get_binary_available_block_range = await this.sdk.get_binary_available_block_range();
    get_binary_available_block_range && this.resultService.setResult(get_binary_available_block_range);
    return get_binary_available_block_range;
  }

  async get_binary_next_upgrade() {
    const get_binary_next_upgrade = await this.sdk.get_binary_next_upgrade();
    get_binary_next_upgrade && this.resultService.setResult(get_binary_next_upgrade);
    return get_binary_next_upgrade;
  }

  async get_binary_consensus_status() {
    const get_binary_consensus_status = await this.sdk.get_binary_consensus_status();
    get_binary_consensus_status && this.resultService.setResult(get_binary_consensus_status);
    return get_binary_consensus_status;
  }

  async get_binary_chainspec_raw_bytes() {
    const get_binary_chainspec_raw_bytes = await this.sdk.get_binary_chainspec_raw_bytes();
    get_binary_chainspec_raw_bytes && this.resultService.setResult(get_binary_chainspec_raw_bytes);
    return get_binary_chainspec_raw_bytes;
  }

  async get_binary_node_status() {
    const get_binary_node_status = await this.sdk.get_binary_node_status();
    get_binary_node_status && this.resultService.setResult(get_binary_node_status);
    return get_binary_node_status;
  }

  async get_binary_validator_reward_by_era() {
    const validator_key_string = this.getIdentifier('validatorKey')?.value?.trim();
    const era_id_string: number = this.getIdentifier('eraId')?.value?.trim() as number;
    const get_binary_validator_reward_by_era = await this.sdk.get_binary_validator_reward_by_era(new PublicKey(validator_key_string), new EraId(BigInt(era_id_string)));
    get_binary_validator_reward_by_era && this.resultService.setResult(get_binary_validator_reward_by_era);
    return get_binary_validator_reward_by_era;
  }

  async get_binary_validator_reward() {
    const validator_key_string = this.getIdentifier('validatorKey')?.value?.trim();
    const block_identifier_height: string = this.getIdentifier('blockIdentifierHeight')?.value?.trim();
    const block_identifier_hash: string = this.getIdentifier('blockIdentifierHash')?.value?.trim();
    if (block_identifier_hash) {
      const get_binary_validator_reward_by_block_hash = await this.sdk.get_binary_validator_reward_by_block_hash(new PublicKey(validator_key_string), new BlockHash(block_identifier_hash));
      get_binary_validator_reward_by_block_hash && this.resultService.setResult(get_binary_validator_reward_by_block_hash);
      return get_binary_validator_reward_by_block_hash;
    }
    else if (block_identifier_height) {
      const get_binary_validator_reward_by_block_height = await this.sdk.get_binary_validator_reward_by_block_height(new PublicKey(validator_key_string), (BigInt(block_identifier_height)));
      get_binary_validator_reward_by_block_height && this.resultService.setResult(get_binary_validator_reward_by_block_height);
      return get_binary_validator_reward_by_block_height;
    } else {
      this.get_binary_validator_reward_by_era();
    }
  }

  async get_binary_delegator_reward_by_era() {
    const validator_key_string = this.getIdentifier('validatorKey')?.value?.trim();
    const delegator_key_string = this.getIdentifier('delegatorKey')?.value?.trim();
    const era_id_string: number = this.getIdentifier('eraId')?.value?.trim() as number;
    const get_binary_delegator_reward_by_era = await this.sdk.get_binary_delegator_reward_by_era(new PublicKey(validator_key_string), new PublicKey(delegator_key_string), new EraId(BigInt(era_id_string)));
    get_binary_delegator_reward_by_era && this.resultService.setResult(get_binary_delegator_reward_by_era);
    return get_binary_delegator_reward_by_era;
  }

  async get_binary_delegator_reward() {
    const validator_key_string = this.getIdentifier('validatorKey')?.value?.trim();
    const delegator_key_string = this.getIdentifier('delegatorKey')?.value?.trim();
    const block_identifier_height: string = this.getIdentifier('blockIdentifierHeight')?.value?.trim();
    const block_identifier_hash: string = this.getIdentifier('blockIdentifierHash')?.value?.trim();
    if (block_identifier_hash) {
      const get_binary_delegator_reward_by_block_hash = await this.sdk.get_binary_delegator_reward_by_block_hash(new PublicKey(validator_key_string), new PublicKey(delegator_key_string), new BlockHash(block_identifier_hash));
      get_binary_delegator_reward_by_block_hash && this.resultService.setResult(get_binary_delegator_reward_by_block_hash);
      return get_binary_delegator_reward_by_block_hash;
    } else if (block_identifier_height) {
      const get_binary_delegator_reward_by_block_height = await this.sdk.get_binary_delegator_reward_by_block_height(new PublicKey(validator_key_string), new PublicKey(delegator_key_string), BigInt(block_identifier_height));
      get_binary_delegator_reward_by_block_height && this.resultService.setResult(get_binary_delegator_reward_by_block_height);
      return get_binary_delegator_reward_by_block_height;
    } else {
      this.get_binary_delegator_reward_by_era();
    }

  }

  async get_binary_read_record() {
    const record_id_string: number = this.getIdentifier('eraId')?.value?.trim() as number;
    const key: string = this.getIdentifier('key')?.value?.trim();
    const get_binary_read_record = await this.sdk.get_binary_read_record(new RecordId(record_id_string), hexToUint8Array(key));
    get_binary_read_record && this.resultService.setResult(get_binary_read_record);
    return get_binary_read_record;
  }

  // async get_binary_global_state_item() {
  //   const get_binary_nget_binary_global_state_itemode_status = await this.sdk.get_binary_global_state_item();
  //   get_binary_global_state_item && this.resultService.setResult(get_binary_global_state_item);
  //   return get_binary_global_state_item;
  // }

  // async get_binary_global_state_item_by_state_root_hash() {
  //   const get_binary_global_state_item_by_state_root_hash = await this.sdk.get_binary_global_state_item_by_state_root_hash();
  //   get_binary_global_state_item_by_state_root_hash && this.resultService.setResult(get_binary_global_state_item_by_state_root_hash);
  //   return get_binary_global_state_item_by_state_root_hash;
  // }

  // async get_binary_global_state_item_by_block_hash() {
  //   const get_binary_global_state_item_by_block_hash = await this.sdk.get_binary_global_state_item_by_block_hash();
  //   get_binary_global_state_item_by_block_hash && this.resultService.setResult(get_binary_global_state_item_by_block_hash);
  //   return get_binary_global_state_item_by_block_hash;
  // }

  // async get_binary_global_state_item_by_block_height() {
  //   const get_binary_global_state_item_by_block_height = await this.sdk.get_binary_global_state_item_by_block_height();
  //   get_binary_global_state_item_by_block_height && this.resultService.setResult(get_binary_global_state_item_by_block_height);
  //   return get_binary_global_state_item_by_block_height;
  // }

  // async get_binary_try_accept_transaction() {
  //   const get_binary_try_accept_transaction = await this.sdk.get_binary_try_accept_transaction();
  //   get_binary_try_accept_transaction && this.resultService.setResult(get_binary_try_accept_transaction);
  //   return get_binary_try_accept_transaction;
  // }

  // async get_binary_try_speculative_execution() {
  //   const get_binary_try_speculative_execution = await this.sdk.get_binary_try_speculative_execution();
  //   get_binary_try_speculative_execution && this.resultService.setResult(get_binary_try_speculative_execution);
  //   return get_binary_try_speculative_execution;
  // }

  async get_binary_protocol_version() {
    const get_binary_protocol_version = await this.sdk.get_binary_protocol_version();
    get_binary_protocol_version && this.resultService.setResult(get_binary_protocol_version);
    return get_binary_protocol_version;
  }

  private getIdentifier(formControlName: string) {
    return this.formService.form.get(formControlName) as FormControl;
  }
}
