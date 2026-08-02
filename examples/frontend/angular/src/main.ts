import {
  enableProdMode,
  EnvironmentProviders,
  importProvidersFrom,
  Provider,
} from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes, withHashLocation } from '@angular/router';
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
      app_version?: string;
      git_sha?: string;
    };
  }
}

/** Electron loads the UI via file://; PathLocationStrategy breaks asset URLs there. */
function isElectronShell(): boolean {
  if (typeof globalThis === 'undefined' || !('location' in globalThis)) {
    return false;
  }
  const loc = (globalThis as Window & typeof globalThis).location;
  return loc.protocol === 'file:' || loc.origin?.startsWith('file://') === true;
}

/** Resolve bundled assets against index.html for Electron file:// loads. */
function resolveBundledAssetUrl(assetPath: string): string {
  const normalized = assetPath.replace(/^\//, '');
  if (!isElectronShell() || typeof window === 'undefined') {
    return normalized;
  }
  const withoutHash = window.location.href.split('#')[0];
  const base = withoutHash.endsWith('.html')
    ? withoutHash.slice(0, withoutHash.lastIndexOf('/') + 1)
    : withoutHash.endsWith('/')
      ? withoutHash
      : `${withoutHash}/`;
  return new URL(normalized, base).href;
}

const electronShell = isElectronShell();

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
  if (runtimeConfig.app_version) {
    config['app_version'] = runtimeConfig.app_version;
  }
  if (runtimeConfig.git_sha) {
    config['git_sha'] = runtimeConfig.git_sha;
  }
}

const routes: Routes = [
  { path: 'health', component: HealthComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' },
];

const providers: Array<Provider | EnvironmentProviders> = [
  provideRouter(routes, ...(electronShell ? [withHashLocation()] : [])),
  ...(electronShell ? [{ provide: APP_BASE_HREF, useValue: './' }] : []),
  { provide: ENV, useValue: environment },
  { provide: CONFIG, useValue: config },
  {
    provide: WASM_ASSET_PATH,
    useValue: resolveBundledAssetUrl(config['wasm_asset_path'] as string),
  },
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
