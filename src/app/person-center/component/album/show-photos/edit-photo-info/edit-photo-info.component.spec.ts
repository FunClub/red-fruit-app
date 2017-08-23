import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhotoInfoComponent } from './edit-photo-info.component';

describe('EditPhotoInfoComponent', () => {
  let component: EditPhotoInfoComponent;
  let fixture: ComponentFixture<EditPhotoInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPhotoInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhotoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
