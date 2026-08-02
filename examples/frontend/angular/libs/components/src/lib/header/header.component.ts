import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  ViewChild,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { CONFIG, ENV, EnvironmentConfig, Network } from '@util/config';
import { PeerEntry, SDK } from 'casper-rust-wasm-sdk';
import { SDK_TOKEN } from '@util/wasm';
import { StateService } from '@util/state';
import { StorageService } from '@util/storage';

@Component({
  selector: 'comp-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('selectNetworkElt') selectNetworkElt!: ElementRef;
  @ViewChild('nodeAddressElt') nodeAddressElt!: ElementRef;

  @Input() peers!: PeerEntry[];

  networks: Network[] = this.config['networks'] as Network[];
  network: Network = this.config['network'] as Network;
  chain_name: string = this.network.chain_name;
  rpc_address: string = this.network.rpc_address;
  node_address: string = this.network.node_address;
  customNetwork!: string;
  is_network_tab_open!: boolean;
  /** Resolved against index.html under Electron file:// (avoids file:///assets/...). */
  logo_src = 'assets/logo.svg';

  private window!: (Window & typeof globalThis) | null;
  private is_electron!: boolean;
  private is_production: boolean = this.env['production'] as unknown as boolean;
  private is_docker: boolean = this.env['is_docker'] as unknown as boolean;

  constructor(
    @Inject(SDK_TOKEN) private readonly sdk: SDK,
    @Inject(CONFIG) public readonly config: EnvironmentConfig,
    @Inject(ENV) public readonly env: EnvironmentConfig,
    @Inject(DOCUMENT) private document: Document,
    private readonly stateService: StateService,
    private readonly storageService: StorageService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.window = this.document.defaultView;
    this.is_electron = this.isElectron();
    this.logo_src = this.resolveBundledAssetUrl('assets/logo.svg');
  }

  async ngAfterViewInit() {
    // Set default action to get_node_status if not defined
    if (!this.storageService.get('action')) {
      this.storageService.setState({ action: 'get_node_status' });
    }

    if (
      this.storageService.get('chain_name') &&
      this.storageService.get('rpc_address')
    ) {
      const storedRpc =
        this.storageService.get('rpc_address') || this.rpc_address;
      // Public hosts must not restore a localhost/ntcl selection from localStorage
      // (leftover from older defaults or local testing).
      const storedIsLocal = this.isLocalRpcAddress(storedRpc);
      if (!(storedIsLocal && !this.isPageOnLocalDockerNetwork())) {
        this.chain_name =
          this.storageService.get('chain_name') || this.chain_name;
        this.rpc_address = storedRpc;
        this.node_address =
          this.storageService.get('node_address') || this.node_address;
        this.network =
          this.networks.find((x) => x.rpc_address == this.rpc_address) ||
          this.network;
      } else {
        this.storageService.setState({
          chain_name: this.chain_name,
          rpc_address: this.rpc_address,
          node_address: this.node_address,
        });
      }
    }

    // Public hosts must never keep a localhost network selected (even without
    // localStorage), e.g. older images that defaulted to ntcl.
    if (
      !this.isPageOnLocalDockerNetwork() &&
      this.isLocalRpcAddress(this.rpc_address)
    ) {
      this.network =
        this.networks.find((x) => x.name === this.env['default_network']) ||
        this.networks.find((x) => !this.isLocalRpcAddress(x.rpc_address)) ||
        this.network;
      this.chain_name = this.network.chain_name;
      this.rpc_address = this.network.rpc_address;
      this.node_address = this.network.node_address;
      this.storageService.setState({
        chain_name: this.chain_name,
        rpc_address: this.rpc_address,
        node_address: this.node_address,
      });
    }

    this.stateService.setState({
      chain_name: this.chain_name,
      rpc_address: this.rpc_address,
      node_address: this.node_address,
    });

    try {
      this.setRPCAndNodeAddress();
    } catch (error) {
      console.error(
        'Failed to set RPC address from localStorage, falling back to default:',
        error,
      );
      // Reset to default network
      this.network =
        this.networks.find((x) => x.name === this.env['default_network']) ||
        this.network;
      this.chain_name = this.network.chain_name;
      this.rpc_address = this.network.rpc_address;
      this.node_address = this.network.node_address;

      // Clear bad localStorage data with default values
      this.storageService.setState({
        chain_name: this.chain_name,
        rpc_address: this.rpc_address,
        node_address: this.node_address,
      });

      // Try again with default values
      this.setRPCAndNodeAddress();
    }

    this.changeDetectorRef.markForCheck();
  }

  selectNetwork($event: Event) {
    let network =
      ($event.target as HTMLInputElement)?.value ||
      this.selectNetworkElt.nativeElement.value;
    network = network && this.networks.find((x) => x.name == network);
    this.network = network;
    this.chain_name = network.chain_name;
    this.rpc_address = network.rpc_address;
    this.node_address = network.node_address;
    this.setRPCAndNodeAddress();
    this.stateService.setState({
      chain_name: network.chain_name,
    });
    this.storageService.setState({
      rpc_address: this.rpc_address,
      node_address: this.node_address,
      chain_name: this.chain_name,
    });
  }

  changePort(peer: PeerEntry) {
    const address = peer.address.split(':');
    const new_address = [
      this.config['default_protocol'],
      address.shift(),
      ':',
      this.config['default_port'],
    ].join('');
    return new_address;
  }

  onCustomNetworkChange($event: Event) {
    this.rpc_address =
      ($event.target as HTMLInputElement)?.value || this.network.rpc_address;
    this.node_address = this.nodeAddressElt?.nativeElement?.value || '';
    const customNetwork = this.networks.find(
      (network) => network.name === 'custom',
    );
    // Todo check
    if (customNetwork) {
      customNetwork.rpc_address = this.rpc_address;
      //  customNetwork.node_address = this.node_address;
      this.sdk.setRPCAddress(this.rpc_address);
      this.sdk.setNodeAddress(this.node_address);
      this.stateService.setState({
        rpc_address: this.rpc_address,
        node_address: this.node_address,
      });
      this.storageService.setState({
        rpc_address: this.rpc_address,
        node_address: this.node_address,
      });
    }
  }

  isCustomNetworkInvalid() {
    return false;
  }

  isCustomNetworkAllowed() {
    // Allow custom networks only in dev and electron (not in production/docker for security)
    return !this.is_docker && (!this.is_production || this.is_electron);
  }

  /** Hide localhost/ntcl options on public hosts; keep them for local compose. */
  isNetworkOptionVisible(network: Network): boolean {
    if (network.name === 'custom' && !this.isCustomNetworkAllowed()) {
      return false;
    }
    if (this.isPageOnLocalDockerNetwork()) {
      return true;
    }
    return !this.isLocalRpcAddress(network.rpc_address);
  }

  private isLocalRpcAddress(rpcAddress: string): boolean {
    return /localhost|127\.0\.0\.1|172\.(1[6-9]|2\d|3[01])\./.test(
      rpcAddress || '',
    );
  }

  onCcustomChainChange($event: Event) {
    this.chain_name =
      ($event.target as HTMLInputElement)?.value || this.network.chain_name;
    const customNetwork = this.networks.find(
      (network) => network.name === 'custom',
    );
    if (customNetwork) {
      customNetwork.chain_name = this.chain_name;
      this.stateService.setState({
        chain_name: this.chain_name,
      });
      this.storageService.setState({
        chain_name: this.chain_name,
      });
    }
  }

  onNodeAddressChange($event: Event) {
    this.node_address = ($event.target as HTMLInputElement)?.value || '';
    this.setRPCAndNodeAddress();
  }

  iscustomChainInvalid() {
    return false;
  }

  isNodeAddressInvalid() {
    return false;
  }

  private isElectron(): boolean {
    return (
      typeof this.window !== 'undefined' &&
      (window.location?.protocol === 'file:' ||
        window.location?.origin?.startsWith('file://') === true)
    );
  }

  private resolveBundledAssetUrl(assetPath: string): string {
    const normalized = assetPath.replace(/^\//, '');
    if (!this.is_electron || !this.window) {
      return normalized;
    }
    const withoutHash = this.window.location.href.split('#')[0];
    const base = withoutHash.endsWith('.html')
      ? withoutHash.slice(0, withoutHash.lastIndexOf('/') + 1)
      : withoutHash.endsWith('/')
        ? withoutHash
        : `${withoutHash}/`;
    return new URL(normalized, base).href;
  }

  private isLocalhostNetwork(): boolean {
    const localhostNetworks = ['ntcl', 'dev'];
    return localhostNetworks.includes(this.network.name);
  }

  /**
   * True when the page itself is on a local / private Docker-compose host.
   * Public hosts (Render, custom domains, etc.) must never rewrite RPC targets
   * to docker_gateway (172.18.0.1) — that only works on the local bridge.
   */
  private isPageOnLocalDockerNetwork(): boolean {
    const host = this.window?.location?.hostname ?? '';
    if (!host || host === 'localhost' || host === '127.0.0.1') {
      return true;
    }
    if (host.endsWith('.local')) {
      return true;
    }
    return /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(host);
  }

  /** Rewrite localhost → docker_gateway only for local compose hosts. */
  private resolveLocalDockerHost(address: string): string {
    if (!this.isPageOnLocalDockerNetwork()) {
      return address;
    }
    return address.replace(
      /localhost/g,
      this.config['docker_gateway'] as string,
    );
  }

  private withCorsProxy(rpcAddress: string, corsAnywhereUrl: string): string {
    return corsAnywhereUrl.replace(/\/$/, '') + '/' + rpcAddress;
  }

  private setRPCAndNodeAddress() {
    try {
      // Use runtime config network_rpc_url if provided (overrides network selection)
      const networkRpcUrl = this.config['network_rpc_url'] as
        string | undefined;
      const corsAnywhereUrl = this.config['cors_anywhere_url'] as
        string | undefined;
      const networkNodeUrl = this.config['network_node_url'] as
        string | undefined;

      if (this.is_electron) {
        this.sdk.setRPCAddress(networkRpcUrl || this.rpc_address);
      } else if (this.is_docker && this.is_production) {
        // Localhost networks (ntcl, dev): prefer NETWORK_RPC_URL override.
        // Public networks keep their configured RPC addresses.
        // Never rewrite localhost → docker_gateway on public HTTPS hosts
        // (e.g. Render); that IP is only valid on a local Docker bridge.
        let rpcTarget: string;
        if (networkRpcUrl && this.isLocalhostNetwork()) {
          rpcTarget = networkRpcUrl;
        } else {
          rpcTarget = this.resolveLocalDockerHost(this.rpc_address);
        }

        if (corsAnywhereUrl) {
          // Example: https://cors…/https://node.testnet.casper.network
          this.sdk.setRPCAddress(
            this.withCorsProxy(rpcTarget, corsAnywhereUrl),
          );
        } else if (this.isPageOnLocalDockerNetwork()) {
          const protocol = this.window?.location?.protocol;
          if (protocol === 'https:') {
            this.sdk.setRPCAddress(
              [
                this.window?.location?.origin,
                '/cors-anywhere/',
                rpcTarget,
              ].join(''),
            );
          } else {
            this.sdk.setRPCAddress(
              [
                'http://',
                this.config['docker_gateway'],
                ':',
                this.config['cors_anywhere_port'],
                '/',
                rpcTarget,
              ].join(''),
            );
          }
        } else {
          // Public host without CORS_ANYWHERE_URL: call RPC directly.
          this.sdk.setRPCAddress(rpcTarget);
        }
      } else {
        const network = this.networks.find(
          (x) => x.rpc_address == this.rpc_address,
        );
        network &&
          this.sdk.setRPCAddress(
            [this.window?.location?.href, network?.name].join(''),
          );
      }

      // Set node address
      if (networkNodeUrl) {
        this.sdk.setNodeAddress(networkNodeUrl);
      } else if (this.is_docker) {
        this.sdk.setNodeAddress(this.resolveLocalDockerHost(this.node_address));
      } else {
        this.sdk.setNodeAddress(this.node_address);
      }
    } catch (e) {
      console.error(e);
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    return false;
  }
}
