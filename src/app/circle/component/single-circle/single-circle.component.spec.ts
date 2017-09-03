import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCircleComponent } from './single-circle.component';

describe('SingleCircleComponent', () => {
  let component: SingleCircleComponent;
  let fixture: ComponentFixture<SingleCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
