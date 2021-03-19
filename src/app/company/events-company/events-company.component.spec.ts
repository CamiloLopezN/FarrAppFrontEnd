import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsCompanyComponent } from './events-company.component';

describe('EventsCompanyComponent', () => {
  let component: EventsCompanyComponent;
  let fixture: ComponentFixture<EventsCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
