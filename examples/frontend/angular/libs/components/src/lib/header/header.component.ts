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
      this.chain_name =
        this.storageService.get('chain_name') || this.chain_name;
      this.rpc_address =
        this.storageService.get('rpc_address') || this.rpc_address;
      this.node_address =
        this.storageService.get('node_address') || this.node_address;
      this.network =
        this.networks.find((x) => x.rpc_address == this.rpc_address) ||
        this.network;
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
      window.location?.origin?.startsWith('file://')
    );
  }

  private setRPCAndNodeAddress() {
    try {
      if (this.is_electron) {
        this.sdk.setRPCAddress(this.rpc_address);
      } else if (this.is_docker && this.is_production) {
        this.sdk.setRPCAddress(
          [
            this.config['default_protocol'],
            this.config['docker_gateway'],
            ':',
            this.config['cors_anywhere_port'],
            '/',
            this.rpc_address.replace(
              /localhost/g,
              this.config['docker_gateway'] as string,
            ),
          ].join(''),
        );
      } else {
        const network = this.networks.find(
          (x) => x.rpc_address == this.rpc_address,
        );
        network &&
          this.sdk.setRPCAddress(
            [this.window?.location?.href, network?.name].join(''),
          );
      }

      if (this.is_docker) {
        this.sdk.setNodeAddress(
          this.node_address.replace(
            /localhost/g,
            this.config['docker_gateway'] as string,
          ),
        );
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
