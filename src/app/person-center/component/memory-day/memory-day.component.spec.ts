import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryDayComponent } from './memory-day.component';

describe('MemoryDayComponent', () => {
  let component: MemoryDayComponent;
  let fixture: ComponentFixture<MemoryDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoryDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
