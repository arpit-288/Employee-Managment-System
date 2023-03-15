import { TestBed } from '@angular/core/testing';

import { EdmsService } from './edms.service';

describe('EdmsService', () => {
  let service: EdmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EdmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
