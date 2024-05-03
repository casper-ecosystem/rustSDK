import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { UtilHihlightWebworkerModule } from '@util/hightlight-webworker';
import { Verbosity, jsonPrettyPrint } from 'casper-sdk';
import { Result, ResultService } from '@util/result';

@Component({
  selector: 'comp-result',
  standalone: true,
  imports: [CommonModule, UtilHihlightWebworkerModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent implements AfterViewInit, OnDestroy {
  title!: string;
  result!: string;
  resultHtml!: string;

  @ViewChild('resultElt') resultElt!: ElementRef;
  @ViewChild('codeElt', { read: ElementRef }) contentChildren!: ElementRef;

  private getResultSubscription!: Subscription;

  constructor(
    private readonly resultService: ResultService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngAfterViewInit() {
    this.getResultSubscription = this.resultService.getResult().subscribe((res: Result) => {
      this.result = res.result;
      this.resultHtml = res.resultHtml;
      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy() {
    this.getResultSubscription && this.getResultSubscription.unsubscribe();
  }

  copy(value: string): void {
    this.resultService.copyClipboard(jsonPrettyPrint(JSON.parse(value), Verbosity.High));
  }

  reset() {
    this.result = '';
    this.resultHtml = '';
    this.resultService.setResult('');
  }
}
