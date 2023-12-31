import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanetComponent } from './add-planet.component';

describe('AddPlanetComponent', () => {
  let component: AddPlanetComponent;
  let fixture: ComponentFixture<AddPlanetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPlanetComponent]
    });
    fixture = TestBed.createComponent(AddPlanetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
