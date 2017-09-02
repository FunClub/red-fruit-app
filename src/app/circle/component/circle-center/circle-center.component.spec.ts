import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleCenterComponent } from './circle-center.component';

describe('CircleCenterComponent', () => {
  let component: CircleCenterComponent;
  let fixture: ComponentFixture<CircleCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircleCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
