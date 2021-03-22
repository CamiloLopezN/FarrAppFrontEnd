import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentsCompanyComponent } from './establishments-company.component';

describe('EstablishmentsCompanyComponent', () => {
  let component: EstablishmentsCompanyComponent;
  let fixture: ComponentFixture<EstablishmentsCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstablishmentsCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablishmentsCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
