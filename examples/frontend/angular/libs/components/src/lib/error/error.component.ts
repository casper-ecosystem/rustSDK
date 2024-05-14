import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorService } from '@util/error';
import { Subscription } from 'rxjs';

@Component({
  selector: 'comp-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent implements AfterViewInit, OnDestroy {

  error?: string;

  private errorSubscription!: Subscription;

  constructor(
    private readonly errorService: ErrorService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  async ngAfterViewInit() {
    this.seterrorSubscription();
  }

  ngOnDestroy() {
    this.errorSubscription && this.errorSubscription.unsubscribe();
  }

  private seterrorSubscription() {
    this.errorSubscription = this.errorService.getError().subscribe(async (error: string) => {
      if (this.error !== error) {
        this.error = error;
        this.changeDetectorRef.markForCheck();
      }
    });
  }
}
