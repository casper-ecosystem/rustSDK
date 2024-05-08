import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { CONFIG, EnvironmentConfig, Network } from '@util/config';
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

  networks: Network[] = this.config['networks'] as Network[];
  network: Network = this.config['network'] as Network;
  chain_name: string = this.network.chain_name;
  node_address: string = this.network.node_address;
  customNetwork!: string;

  private local_host = [this.config['default_protocol'], this.config['localhost'], ':', this.config['app_port']].join('');
  private window!: (Window & typeof globalThis) | null;
  private is_electron!: boolean;

  constructor(
    @Inject(SDK_TOKEN) private readonly sdk: SDK,
    @Inject(CONFIG) public readonly config: EnvironmentConfig,
    @Inject(DOCUMENT) private document: Document,
    private readonly stateService: StateService,
    private readonly storageService: StorageService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    this.window = this.document.defaultView;
    this.is_electron = this.isElectron();
  }

  async ngAfterViewInit() {
    if (this.storageService.get('chain_name') && this.storageService.get('node_address')) {
      this.chain_name = this.storageService.get('chain_name') || this.chain_name;
      this.node_address = this.storageService.get('node_address') || this.node_address;
      this.network = this.networks.find(x => x.node_address == this.node_address) || this.network;
    }

    this.stateService.setState({
      chain_name: this.chain_name,
      node_address: this.node_address,
    });
    this.setNodeAddress();
    this.changeDetectorRef.markForCheck();
  }

  selectNetwork($event: Event) {
    let network = ($event.target as HTMLInputElement)?.value || this.selectNetworkElt.nativeElement.value;
    network = network && this.networks.find(x => x.name == network);
    this.network = network;
    this.chain_name = network.chain_name;
    this.node_address = network.node_address;
    this.setNodeAddress();
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

  private isElectron(): boolean {
    return typeof this.window !== 'undefined' && window.location?.origin?.startsWith('file://');
  }

  private setNodeAddress() {
    if ((this.is_electron)) {
      this.sdk.setNodeAddress(this.node_address);
    } else {
      const network = this.networks.find(x => x.node_address == this.node_address);
      network && this.sdk.setNodeAddress([this.local_host, network?.name].join('/'));
    }
  }
}
