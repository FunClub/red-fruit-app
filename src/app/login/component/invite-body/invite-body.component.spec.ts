import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteBodyComponent } from './invite-body.component';

describe('InviteBodyComponent', () => {
  let component: InviteBodyComponent;
  let fixture: ComponentFixture<InviteBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
