import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCatalogNoteComponent } from './single-catalog-note.component';

describe('SingleCatalogNoteComponent', () => {
  let component: SingleCatalogNoteComponent;
  let fixture: ComponentFixture<SingleCatalogNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleCatalogNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCatalogNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
