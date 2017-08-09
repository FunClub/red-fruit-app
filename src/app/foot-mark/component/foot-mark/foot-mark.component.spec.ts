import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootMarkComponent } from './foot-mark.component';

describe('FootMarkComponent', () => {
  let component: FootMarkComponent;
  let fixture: ComponentFixture<FootMarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootMarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
