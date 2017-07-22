import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveMessageComponent } from './leave-message.component';

describe('LeaveMessageComponent', () => {
  let component: LeaveMessageComponent;
  let fixture: ComponentFixture<LeaveMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
