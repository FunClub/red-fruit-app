import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleArtCatalogComponent } from './circle-art-catalog.component';

describe('CircleArtCatalogComponent', () => {
  let component: CircleArtCatalogComponent;
  let fixture: ComponentFixture<CircleArtCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircleArtCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleArtCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
