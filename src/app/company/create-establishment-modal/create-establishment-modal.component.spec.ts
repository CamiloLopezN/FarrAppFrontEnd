import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEstablishmentModalComponent } from './create-establishment-modal.component';

describe('CreateEstablishmentModalComponent', () => {
  let component: CreateEstablishmentModalComponent;
  let fixture: ComponentFixture<CreateEstablishmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEstablishmentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEstablishmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
