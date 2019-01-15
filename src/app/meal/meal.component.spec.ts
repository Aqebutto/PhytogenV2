import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MptComponent } from './mpt.component';

describe('MptComponent', () => {
  let component: MptComponent;
  let fixture: ComponentFixture<MptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
