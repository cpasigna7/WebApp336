import { TestBed } from '@angular/core/testing';

import { ManfService } from './manf.service';

describe('ManfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManfService = TestBed.get(ManfService);
    expect(service).toBeTruthy();
  });
});
