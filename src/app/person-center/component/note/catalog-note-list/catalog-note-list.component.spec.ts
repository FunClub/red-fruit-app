import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogNoteListComponent } from './catalog-note-list.component';

describe('CatalogNoteListComponent', () => {
  let component: CatalogNoteListComponent;
  let fixture: ComponentFixture<CatalogNoteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogNoteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogNoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
