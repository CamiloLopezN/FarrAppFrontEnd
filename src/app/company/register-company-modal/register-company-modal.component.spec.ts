import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCompanyModalComponent } from './register-company-modal.component';

describe('RegisterCompanyModalComponent', () => {
  let component: RegisterCompanyModalComponent;
  let fixture: ComponentFixture<RegisterCompanyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCompanyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCompanyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
