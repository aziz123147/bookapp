import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfineComponent } from './user-profine.component';

describe('UserProfineComponent', () => {
  let component: UserProfineComponent;
  let fixture: ComponentFixture<UserProfineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
