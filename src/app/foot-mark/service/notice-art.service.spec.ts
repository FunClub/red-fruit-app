import { TestBed, inject } from '@angular/core/testing';

import { NoticeArtService } from './notice-art.service';

describe('NoticeArtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoticeArtService]
    });
  });

  it('should be created', inject([NoticeArtService], (service: NoticeArtService) => {
    expect(service).toBeTruthy();
  }));
});
