import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtOperationComponent } from './art-operation.component';

describe('ArtOperationComponent', () => {
  let component: ArtOperationComponent;
  let fixture: ComponentFixture<ArtOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
