import {
  enableProdMode,
  EnvironmentProviders,
  importProvidersFrom,
  ImportProvidersSource,
  Provider,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import {
  NODE_ADDRESS,
  RPC_ADDRESS,
  VERBOSITY,
  WASM_ASSET_PATH,
  WasmModule,
} from '@util/wasm';
import { config, CONFIG, ENV, Network } from '@util/config';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { HealthComponent } from './app/health/health.component';
import { HomeComponent } from './app/home/home.component';
import { Verbosity } from 'casper-rust-wasm-sdk';
import { ResultModule } from '@util/result';

// Declare global window interface for runtime config
declare global {
  interface Window {
    __APP_CONFIG__?: {
      cors_anywhere_url?: string;
      network_rpc_url?: string;
      network_node_url?: string;
    };
  }
}

let networks: Network[] = Object.entries(config['networks']).map(
  ([name, network]) => ({
    name,
    ...network,
  }),
);

if (environment.production) {
  enableProdMode();
  networks = networks.filter((network) => network.name !== 'dev');
}

config['networks'] = networks;
config['network'] = networks.find(
  (x) => x.name == environment['default_network'].toString(),
) as object;

// Read runtime configuration from window.__APP_CONFIG__ if available
if (typeof window !== 'undefined' && window.__APP_CONFIG__) {
  const runtimeConfig = window.__APP_CONFIG__;
  if (runtimeConfig.cors_anywhere_url) {
    config['cors_anywhere_url'] = runtimeConfig.cors_anywhere_url;
  }
  if (runtimeConfig.network_rpc_url) {
    config['network_rpc_url'] = runtimeConfig.network_rpc_url;
  }
  if (runtimeConfig.network_node_url) {
    config['network_node_url'] = runtimeConfig.network_node_url;
  }
}

const routes: Routes = [
  { path: 'health', component: HealthComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' },
];

const providers: Array<Provider | EnvironmentProviders> = [
  provideRouter(routes),
  { provide: ENV, useValue: environment },
  { provide: CONFIG, useValue: config },
  { provide: WASM_ASSET_PATH, useValue: config['wasm_asset_path'] as string },
  {
    provide: RPC_ADDRESS,
    useValue: (config['network'] as Network)?.rpc_address,
  },
  {
    provide: NODE_ADDRESS,
    useValue: (config['network'] as Network)?.node_address,
  },
  { provide: VERBOSITY, useValue: Verbosity[config['verbosity'] as Verbosity] },
  importProvidersFrom([WasmModule, ResultModule]),
];

bootstrapApplication(AppComponent, { providers })
  .then(() => {
    //
  })
  .catch(() => {
    //
  });
