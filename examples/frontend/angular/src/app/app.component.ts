import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CONFIG, EnvironmentConfig } from '@util/config';

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /** Shown in the footer so deploys are identifiable. */
  readonly appVersion: string;
  readonly gitSha: string;
  readonly footerLabel: string;

  constructor(@Inject(CONFIG) config: EnvironmentConfig) {
    this.appVersion = (config['app_version'] as string) || '2.2.0';
    this.gitSha = (config['git_sha'] as string) || '';
    this.footerLabel = this.gitSha
      ? `Casper WebClient v${this.appVersion} (${this.gitSha})`
      : `Casper WebClient v${this.appVersion}`;
  }
}
