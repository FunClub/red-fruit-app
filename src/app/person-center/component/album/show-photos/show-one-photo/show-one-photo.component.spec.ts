import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOnePhotoComponent } from './show-one-photo.component';

describe('ShowOnePhotoComponent', () => {
  let component: ShowOnePhotoComponent;
  let fixture: ComponentFixture<ShowOnePhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOnePhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOnePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
