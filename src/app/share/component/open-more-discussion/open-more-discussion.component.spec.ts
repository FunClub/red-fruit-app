import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenMoreDiscussionComponent } from './open-more-discussion.component';

describe('OpenMoreDiscussionComponent', () => {
  let component: OpenMoreDiscussionComponent;
  let fixture: ComponentFixture<OpenMoreDiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenMoreDiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenMoreDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
