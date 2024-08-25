import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserstatusdialogComponent } from './userstatusdialog.component';

describe('UserstatusdialogComponent', () => {
  let component: UserstatusdialogComponent;
  let fixture: ComponentFixture<UserstatusdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserstatusdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserstatusdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
