import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtDiscussionComponent } from './art-discussion.component';

describe('ArtDiscussionComponent', () => {
  let component: ArtDiscussionComponent;
  let fixture: ComponentFixture<ArtDiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtDiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
