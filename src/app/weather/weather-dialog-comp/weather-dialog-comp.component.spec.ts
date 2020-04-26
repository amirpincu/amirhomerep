import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDialogCompComponent } from './weather-dialog-comp.component';

describe('WeatherDialogCompComponent', () => {
  let component: WeatherDialogCompComponent;
  let fixture: ComponentFixture<WeatherDialogCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherDialogCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDialogCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
