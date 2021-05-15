import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodePromotionalCardComponent } from './code-promotional-card.component';

describe('CodePromotionalCardComponent', () => {
  let component: CodePromotionalCardComponent;
  let fixture: ComponentFixture<CodePromotionalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodePromotionalCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodePromotionalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
