import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAndCatalogComponent } from './email-and-catalog.component';

describe('EmailAndCatalogComponent', () => {
  let component: EmailAndCatalogComponent;
  let fixture: ComponentFixture<EmailAndCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailAndCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailAndCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
