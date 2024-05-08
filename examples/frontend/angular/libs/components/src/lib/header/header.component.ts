import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONFIG, ENV, EnvironmentConfig, Network } from '@util/config';
import { PeerEntry, SDK } from 'casper-sdk';
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

  @Input() peers!: PeerEntry[];

  chain_name = this.env['chain_name'].toString();
  node_address = this.env['node_address'].toString();
  network: Network = {
    name: this.config['default_network'].toString(),
    node_address: this.env['node_address'].toString(),
    chain_name: this.env['chain_name'].toString()
  };

  networks!: Network[];
  customNetwork!: string;

  constructor(
    @Inject(SDK_TOKEN) private readonly sdk: SDK,
    @Inject(CONFIG) public readonly config: EnvironmentConfig,
    @Inject(ENV) public readonly env: EnvironmentConfig,
    private readonly stateService: StateService,
    private readonly storageService: StorageService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
  }

  async ngAfterViewInit() {
    this.networks = Object.entries(this.config['networks']).map(([name, network]) => ({
      name,
      ...network,
    }));

    if (!(this.env['production'] as unknown as boolean)) {
      const network = this.networks.find(x => x.name == this.config['default_network'].toString());
      if (network) {
        network.chain_name = this.chain_name;
        network.node_address = this.node_address;
      }
    }

    if (this.storageService.get('chain_name') && this.storageService.get('node_address')) {
      this.chain_name = this.storageService.get('chain_name') || this.chain_name;
      this.node_address = this.storageService.get('node_address') || this.node_address;
      this.network = this.networks.find(x => x.node_address == this.node_address) || this.network;
    }

    this.stateService.setState({
      chain_name: this.chain_name,
      node_address: this.node_address,
    });

    this.sdk.setNodeAddress(this.node_address);
    this.changeDetectorRef.markForCheck();
  }

  selectNetwork($event: Event) {
    let network = ($event.target as HTMLInputElement)?.value || this.selectNetworkElt.nativeElement.value;
    network = network && this.networks.find(x => x.name == network);
    this.network = network;
    this.chain_name = network.chain_name;
    this.node_address = network.node_address;
    this.sdk.setNodeAddress(this.node_address);
    this.stateService.setState({
      chain_name: network.chain_name
    });
    this.storageService.setState({
      node_address: this.node_address,
      chain_name: this.chain_name
    });
  }

  changePort(peer: PeerEntry) {
    const address = peer.address.split(':');
    const new_address = [this.config['default_protocol'], address.shift(), ':', this.config['default_port']].join('');
    return new_address;
  }

  onCustomNetworkChange($event: Event) {
    this.node_address = ($event.target as HTMLInputElement)?.value || this.network.node_address;
    const customNetwork = this.networks.find(network => network.name === 'custom');
    if (customNetwork) {
      customNetwork.node_address = this.node_address;
      this.sdk.setNodeAddress(this.node_address);
      this.stateService.setState({
        node_address: this.node_address
      });
      this.storageService.setState({
        node_address: this.node_address
      });
    }
  }

  isCustomNetworkInvalid() {
    return false;
  }

  onCcustomChainChange($event: Event) {
    this.chain_name = ($event.target as HTMLInputElement)?.value || this.network.chain_name;
    const customNetwork = this.networks.find(network => network.name === 'custom');
    if (customNetwork) {
      customNetwork.chain_name = this.chain_name;
      this.stateService.setState({
        chain_name: this.chain_name
      });
      this.storageService.setState({
        chain_name: this.chain_name
      });
    }
  }

  iscustomChainInvalid() {
    return false;
  }
}
