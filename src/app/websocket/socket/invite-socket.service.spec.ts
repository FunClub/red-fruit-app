import { TestBed, inject } from '@angular/core/testing';

import { InviteSocketService } from './invite-socket.service';

describe('InviteSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InviteSocketService]
    });
  });

  it('should be created', inject([InviteSocketService], (service: InviteSocketService) => {
    expect(service).toBeTruthy();
  }));
});
