import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterMarkComponent } from './water-mark.component';

describe('WaterMarkComponent', () => {
  let component: WaterMarkComponent;
  let fixture: ComponentFixture<WaterMarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterMarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
