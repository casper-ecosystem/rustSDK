import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

export interface HealthResult {
  status: string;
  service: string;
  version: string;
}

const VERSION = '2.1.1';

export function buildHealthResult(): HealthResult {
  return {
    status: 'healthy',
    service: 'Casper Webclient',
    version: VERSION,
  };
}

@Component({
  selector: 'app-health',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HealthComponent {
  healthResult: HealthResult = buildHealthResult();
}
