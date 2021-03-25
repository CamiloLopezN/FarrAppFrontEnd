import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlleventsCompanyComponent } from './allevents-company.component';

describe('AlleventsCompanyComponent', () => {
  let component: AlleventsCompanyComponent;
  let fixture: ComponentFixture<AlleventsCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlleventsCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlleventsCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
