import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCommentModalComponent } from './user-comment-modal.component';

describe('UserCommentModalComponent', () => {
  let component: UserCommentModalComponent;
  let fixture: ComponentFixture<UserCommentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCommentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCommentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
