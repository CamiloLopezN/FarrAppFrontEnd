import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsAdminComponent } from './clients-admin.component';

describe('ClientsAdminComponent', () => {
  let component: ClientsAdminComponent;
  let fixture: ComponentFixture<ClientsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
