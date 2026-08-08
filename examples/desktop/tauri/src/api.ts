import { invoke } from "@tauri-apps/api/core";

export async function api<T>(cmd: string, args?: Record<string, unknown>): Promise<T> {
  return invoke<T>(cmd, args);
}

export type PresetInfo = {
  id: string;
  rpc: string;
  events: string;
  chain_name: string;
};
