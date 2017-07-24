import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteMessageComponent } from './invite-message.component';

describe('InviteMessageComponent', () => {
  let component: InviteMessageComponent;
  let fixture: ComponentFixture<InviteMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
