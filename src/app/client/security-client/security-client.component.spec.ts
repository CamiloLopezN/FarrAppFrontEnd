import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityClientComponent } from './security-client.component';

describe('SecurityClientComponent', () => {
  let component: SecurityClientComponent;
  let fixture: ComponentFixture<SecurityClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
