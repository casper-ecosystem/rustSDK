import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { HighlightService } from '@util/hightlight-webworker';
import { Subject } from 'rxjs';
import { Result } from './result';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private readonly result = new Subject<Result>;
  private readonly window = this.document.defaultView;
  /** Bumps on each setResult so a late highlight cannot overwrite a newer clear/result. */
  private setResultGeneration = 0;

  constructor(
    private readonly highlightService: HighlightService,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  getResult() {
    return this.result.asObservable();
  }

  async setResult(result: object | string) {
    const generation = ++this.setResultGeneration;
    if (typeof result === 'string') {
      if (generation !== this.setResultGeneration) {
        return;
      }
      this.result.next({
        result,
        resultHtml: result,
      });
      return;
    }

    // Yield so the shell (status bar, forms) can paint before stringify/highlight.
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => resolve());
    });
    if (generation !== this.setResultGeneration) {
      return;
    }

    const pretty = JSON.stringify(result, null, 2);
    if (generation !== this.setResultGeneration) {
      return;
    }
    // Show plain JSON immediately; upgrade to highlighted HTML when the worker returns.
    this.result.next({
      result: pretty,
      resultHtml: this.escapeHtml(pretty),
    });

    const resultHtml = await this.highlightService.highlightMessage(pretty);
    if (generation !== this.setResultGeneration) {
      return;
    }
    this.result.next({
      result: pretty,
      resultHtml: resultHtml || this.escapeHtml(pretty),
    });
  }

  copyClipboard(value: string) {
    this.window?.navigator.clipboard.writeText(value).catch(e => console.error(e));
  }

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

}
