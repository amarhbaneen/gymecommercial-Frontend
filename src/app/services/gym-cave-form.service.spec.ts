import { TestBed } from '@angular/core/testing';

import { GymCaveFormService } from './gym-cave-form.service';

describe('GymCaveFormService', () => {
  let service: GymCaveFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GymCaveFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
