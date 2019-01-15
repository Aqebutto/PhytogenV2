/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TptService } from './tpt.service';

describe('Service: Tpt', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TptService]
    });
  });

  it('should ...', inject([TptService], (service: TptService) => {
    expect(service).toBeTruthy();
  }));
});
