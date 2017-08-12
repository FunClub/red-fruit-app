import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleArtComponent } from './single-art.component';

describe('SingleArtComponent', () => {
  let component: SingleArtComponent;
  let fixture: ComponentFixture<SingleArtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleArtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
