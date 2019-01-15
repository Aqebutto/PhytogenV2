import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MptItemComponent } from './mpt-item.component';

describe('MptItemComponent', () => {
  let component: MptItemComponent;
  let fixture: ComponentFixture<MptItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MptItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MptItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
