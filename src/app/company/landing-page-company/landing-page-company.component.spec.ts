import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageCompanyComponent } from './landing-page-company.component';

describe('LandingPageCompanyComponent', () => {
  let component: LandingPageCompanyComponent;
  let fixture: ComponentFixture<LandingPageCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
