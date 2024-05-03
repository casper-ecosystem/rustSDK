import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { State } from '@util/state';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private window!: (Window & typeof globalThis) | null;
  private readonly prefix = 'casper-client';

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.window = this.document.defaultView;
  }

  setState(state: State) {
    const storage = JSON.parse(this.window?.localStorage.getItem(this.prefix) || '{}');
    const new_storage = {
      ...storage,
      ...state
    };
    this.window?.localStorage.setItem(this.prefix, JSON.stringify(new_storage));
  }

  get(key: string) {
    return (JSON.parse(this.window?.localStorage.getItem(this.prefix) || '{}') || {})[key];
  }
}