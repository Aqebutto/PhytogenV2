import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealDialogComponent } from './meal-dialog.component';

describe('MealDialogComponent', () => {
  let component: MealDialogComponent;
  let fixture: ComponentFixture<MealDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
