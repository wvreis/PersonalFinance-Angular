import { TestBed } from '@angular/core/testing';

import { TransactionFormBuilderService } from './transaction-form-builder.service';

describe('TransactionFormBuilderService', () => {
  let service: TransactionFormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionFormBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
