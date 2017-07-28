import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigleMoodComponent } from './sigle-mood.component';

describe('SigleMoodComponent', () => {
  let component: SigleMoodComponent;
  let fixture: ComponentFixture<SigleMoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigleMoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigleMoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
