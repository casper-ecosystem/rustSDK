import { TestBed } from '@angular/core/testing';

import { BinaryService } from './binary.service';

describe('BinaryService', () => {
  let service: BinaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BinaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
