import { TestBed } from '@angular/core/testing';

import { MptService } from './mpt.service';

describe('MptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MptService = TestBed.get(MptService);
    expect(service).toBeTruthy();
  });
});
