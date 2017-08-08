import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreDiscussionComponent } from './more-discussion.component';

describe('MoreDiscussionComponent', () => {
  let component: MoreDiscussionComponent;
  let fixture: ComponentFixture<MoreDiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreDiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
