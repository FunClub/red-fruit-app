import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovePhotoComponent } from './move-photo.component';

describe('MovePhotoComponent', () => {
  let component: MovePhotoComponent;
  let fixture: ComponentFixture<MovePhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovePhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
