import { TestBed } from '@angular/core/testing';

import { FavdbService } from './favdb.service';

describe('FavdbService', () => {
  let service: FavdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
