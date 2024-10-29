import { Inject, Injectable } from '@angular/core';
import { CONFIG, EnvironmentConfig } from '@util/config';
import { ErrorService } from '@util/error';
import { ResultService } from '@util/result';
import { SDK_TOKEN } from '@util/wasm';
import { PeerEntry, SDK } from 'casper-sdk';

@Injectable({
  providedIn: 'root',
})
export class BinaryService {
  constructor(
    @Inject(CONFIG) public readonly config: EnvironmentConfig,
    @Inject(SDK_TOKEN) private readonly sdk: SDK,
    private readonly resultService: ResultService,
    private readonly errorService: ErrorService,
  ) { }

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

  // async get_binary_block_header_by_height() {
  //   const get_binary_block_header_by_height = await this.sdk.get_binary_block_header_by_height();
  //   get_binary_block_header_by_height && this.resultService.setResult(get_binary_block_header_by_height);
  //   return get_binary_block_header_by_height;
  // }

  // async get_binary_block_header_by_hash() {
  //   const get_binary_block_header_by_hash = await this.sdk.get_binary_block_header_by_hash();
  //   get_binary_block_header_by_hash && this.resultService.setResult(get_binary_block_header_by_hash);
  //   return get_binary_block_header_by_hash;
  // }

  async get_binary_latest_signed_block() {
    const get_binary_latest_signed_block = await this.sdk.get_binary_latest_signed_block();
    get_binary_latest_signed_block && this.resultService.setResult(get_binary_latest_signed_block);
    return get_binary_latest_signed_block;
  }

  // async get_binary_signed_block_by_height() {
  //   const get_binary_signed_block_by_height = await this.sdk.get_binary_signed_block_by_height();
  //   get_binary_signed_block_by_height && this.resultService.setResult(get_binary_signed_block_by_height);
  //   return get_binary_signed_block_by_height;
  // }

  // async get_binary_signed_block_by_hash() {
  //   const get_binary_signed_block_by_hash = await this.sdk.get_binary_signed_block_by_hash();
  //   get_binary_signed_block_by_hash && this.resultService.setResult(get_binary_signed_block_by_hash);
  //   return get_binary_signed_block_by_hash;
  // }

  // async get_binary_transaction_by_hash() {
  //   const get_binary_transaction_by_hash = await this.sdk.get_binary_transaction_by_hash();
  //   get_binary_transaction_by_hash && this.resultService.setResult(get_binary_transaction_by_hash);
  //   return get_binary_transaction_by_hash;
  // }

  async get_binary_peers() {
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

  // async get_binary_get_validator_reward_by_era() {
  //   const get_binary_get_validator_reward_by_era = await this.sdk.get_binary_get_validator_reward_by_era();
  //   get_binary_get_validator_reward_by_era && this.resultService.setResult(get_binary_get_validator_reward_by_era);
  //   return get_binary_get_validator_reward_by_era;
  // }

  // async get_binary_get_validator_reward_by_block_height() {
  //   const get_binary_get_validator_reward_by_block_height = await this.sdk.get_binary_get_validator_reward_by_block_height();
  //   get_binary_get_validator_reward_by_block_height && this.resultService.setResult(get_binary_get_validator_reward_by_block_height);
  //   return get_binary_get_validator_reward_by_block_height;
  // }

  // async get_binary_get_validator_reward_by_block_hash() {
  //   const get_binary_get_validator_reward_by_block_hash = await this.sdk.get_binary_get_validator_reward_by_block_hash();
  //   get_binary_get_validator_reward_by_block_hash && this.resultService.setResult(get_binary_get_validator_reward_by_block_hash);
  //   return get_binary_get_validator_reward_by_block_hash;
  // }

  // async get_binary_get_delegator_reward_by_era() {
  //   const get_binary_get_delegator_reward_by_era = await this.sdk.get_binary_get_delegator_reward_by_era();
  //   get_binary_get_delegator_reward_by_era && this.resultService.setResult(get_binary_get_delegator_reward_by_era);
  //   return get_binary_get_delegator_reward_by_era;
  // }

  // async get_binary_get_delegator_reward_by_block_height() {
  //   const get_binary_get_delegator_reward_by_block_height = await this.sdk.get_binary_get_delegator_reward_by_block_height();
  //   get_binary_get_delegator_reward_by_block_height && this.resultService.setResult(get_binary_get_delegator_reward_by_block_height);
  //   return get_binary_get_delegator_reward_by_block_height;
  // }

  // async get_binary_get_delegator_reward_by_block_hash() {
  //   const get_binary_get_delegator_reward_by_block_hash = await this.sdk.get_binary_get_delegator_reward_by_block_hash();
  //   get_binary_get_delegator_reward_by_block_hash && this.resultService.setResult(get_binary_get_delegator_reward_by_block_hash);
  //   return get_binary_get_delegator_reward_by_block_hash;
  // }

  // async get_binary_read_record() {
  //   const get_binary_read_record = await this.sdk.get_binary_read_record();
  //   get_binary_read_record && this.resultService.setResult(get_binary_read_record);
  //   return get_binary_read_record;
  // }

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

  async get_binary_get_protocol_version() {
    const get_binary_get_protocol_version = await this.sdk.get_binary_get_protocol_version();
    get_binary_get_protocol_version && this.resultService.setResult(get_binary_get_protocol_version);
    return get_binary_get_protocol_version;
  }
}
