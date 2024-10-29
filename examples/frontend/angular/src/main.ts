
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { enableProdMode, EnvironmentProviders, importProvidersFrom, ImportProvidersSource, Provider } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { NODE_ADDRESS, RPC_ADDRESS, VERBOSITY, WASM_ASSET_PATH, WasmModule } from '@util/wasm';
import { config, CONFIG, ENV, Network } from '@util/config';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { Verbosity } from 'casper-sdk';
import { ResultModule } from '@util/result';

let networks: Network[] = Object.entries(config['networks']).map(([name, network]) => ({
  name,
  ...network,
}));

if (environment.production) {
  enableProdMode();
  networks = networks.filter(network => network.name !== 'dev');
}

config['networks'] = networks;
config['network'] = networks.find(x => x.name == environment['default_network'].toString()) as object;

const providers: Array<Provider | EnvironmentProviders> = [
  { provide: ENV, useValue: environment },
  { provide: CONFIG, useValue: config },
  { provide: WASM_ASSET_PATH, useValue: config['wasm_asset_path'] as string },
  { provide: RPC_ADDRESS, useValue: (config['network'] as Network)?.rpc_address },
  { provide: NODE_ADDRESS, useValue: (config['network'] as Network)?.node_address },
  { provide: VERBOSITY, useValue: Verbosity[config['verbosity'] as Verbosity] },
  importProvidersFrom([
    provideHttpClient(withInterceptorsFromDi()) as unknown as ImportProvidersSource,
    WasmModule,
    ResultModule
  ]),
];

bootstrapApplication(AppComponent, { providers })
  .then(() => {
    //
  })
  .catch(() => {
    //
  });