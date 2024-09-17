import { ApplicationInitStatus, APP_INITIALIZER, inject, InjectionToken, Provider } from "@angular/core";
import init, { SDK, Verbosity } from "casper-sdk";

export const SDK_TOKEN = new InjectionToken<SDK>('SDK');
export const WASM_ASSET_PATH = new InjectionToken<string>('wasm_asset_path');
export const RPC_ADDRESS = new InjectionToken<string>('rpc_address');
export const NODE_ADDRESS = new InjectionToken<string>('node_address');
export const VERBOSITY = new InjectionToken<Verbosity>('verbosity');

type Params = {
  wasm_asset_path: string,
  rpc_address: string;
  node_address: string;
  verbosity: Verbosity;
};

export const fetchWasmFactory = async (
  params: Params
): Promise<SDK> => {
  const wasm = await init(params.wasm_asset_path);
  return wasm && new SDK(params.rpc_address, params.node_address, params.verbosity);
};

export function provideSafeAsync<T>(
  token: T | InjectionToken<T>,
  initializer: (
    params: Params
  ) => Promise<T>
): Provider[] {
  const container: { value?: T; } = { value: undefined };
  return [
    {
      provide: APP_INITIALIZER,
      useFactory: (wasm_asset_path: string, rpc_address: string, node_address: string, verbosity: Verbosity) =>
        async () => container.value = await initializer({ wasm_asset_path, rpc_address, node_address, verbosity })
      ,
      multi: true,
      deps: [WASM_ASSET_PATH, RPC_ADDRESS, VERBOSITY],
    },
    {
      provide: token,
      useFactory: () => {
        if (!inject(ApplicationInitStatus).done) {
          throw new Error(
            `Cannot inject ${token} until bootstrap is complete.`
          );
        }
        return container.value;
      },
    },
  ];
}