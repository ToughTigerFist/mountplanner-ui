import { TestBed } from '@angular/core/testing';

import { BnetService } from './bnet.service';

describe('BnetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BnetService = TestBed.get(BnetService);
    expect(service).toBeTruthy();
  });
});
