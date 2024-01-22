import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanesComponent } from './lanes.component';

describe('LanesComponent', () => {
  let component: LanesComponent;
  let fixture: ComponentFixture<LanesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanesComponent]
    });
    fixture = TestBed.createComponent(LanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
