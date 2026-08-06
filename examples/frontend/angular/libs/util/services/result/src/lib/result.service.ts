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

  async setResult<T>(result: object | string) {
    const generation = ++this.setResultGeneration;
    const isString = typeof result === 'string';
    // Strings skip the highlight worker (resultHtml is the raw string anyway).
    if (isString) {
      if (generation !== this.setResultGeneration) {
        return;
      }
      this.result.next({
        result: result as string,
        resultHtml: result as string,
      });
      return;
    }
    const resultHtml = await this.highlightService.highlightMessage<T>(
      result as T
    );
    if (generation !== this.setResultGeneration) {
      return;
    }
    this.result.next({
      result: JSON.stringify(result),
      resultHtml,
    });
  }

  copyClipboard(value: string) {
    this.window?.navigator.clipboard.writeText(value).catch(e => console.error(e));
  }

}
