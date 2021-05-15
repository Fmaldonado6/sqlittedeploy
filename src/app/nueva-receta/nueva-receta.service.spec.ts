import { TestBed } from '@angular/core/testing';

import { NuevaRecetaService } from './nueva-receta.service';

describe('NuevaRecetaService', () => {
  let service: NuevaRecetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NuevaRecetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
