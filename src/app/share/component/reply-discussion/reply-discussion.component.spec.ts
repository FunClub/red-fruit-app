import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyDiscussionComponent } from './reply-discussion.component';

describe('ReplyDiscussionComponent', () => {
  let component: ReplyDiscussionComponent;
  let fixture: ComponentFixture<ReplyDiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplyDiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
