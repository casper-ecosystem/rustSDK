import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private readonly error = new BehaviorSubject<string>('');

  setError(error: string) {
    const currentError = this.error.getValue();
    currentError !== error ? this.error.next(error) : '';
  }

  getError() {
    return this.error.asObservable();
  }
}
