import { Verbosity } from "casper-sdk";

export type State = {
  node_address?: string;
  chain_name?: string;
  account_hash?: string;
  main_purse?: string;
  state_root_hash?: string;
  action?: string;
  public_key?: string;
  private_key?: string;
  deploy_json?: string;
  verbosity?: Verbosity;
  has_wasm?: boolean;
  select_dict_identifier?: string;
};