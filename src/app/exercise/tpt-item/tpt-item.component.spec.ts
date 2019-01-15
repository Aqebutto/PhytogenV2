/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TptItemComponent } from './tpt-item.component';

describe('TptItemComponent', () => {
  let component: TptItemComponent;
  let fixture: ComponentFixture<TptItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TptItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TptItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
