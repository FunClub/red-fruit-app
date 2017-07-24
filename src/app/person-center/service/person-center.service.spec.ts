import { TestBed, inject } from '@angular/core/testing';

import { PersonCenterService } from './person-center.service';

describe('PersonCenterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonCenterService]
    });
  });

  it('should be created', inject([PersonCenterService], (service: PersonCenterService) => {
    expect(service).toBeTruthy();
  }));
});
