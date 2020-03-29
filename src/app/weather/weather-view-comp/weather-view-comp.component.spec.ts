import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherViewCompComponent } from './weather-view-comp.component';

describe('WeatherViewCompComponent', () => {
  let component: WeatherViewCompComponent;
  let fixture: ComponentFixture<WeatherViewCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherViewCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherViewCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
