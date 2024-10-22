import { Verbosity } from "casper-sdk";

export type State = {
  rpc_address?: string;
  chain_name?: string;
  account_hash?: string;
  enity?: string;
  main_purse?: string;
  state_root_hash?: string;
  action?: string;
  public_key?: string;
  secret_key?: string;
  deploy_json?: string;
  transaction_json?: string;
  verbosity?: Verbosity;
  has_wasm?: boolean;
  select_dict_identifier?: string;
  args_simple?: string;
  args_json?: string;
  pricing_mode?: string;
};