import { Component, OnInit, Inject, Input } from '@angular/core';
import { CityWeatherDescription, CityWeatherData } from '../models/city-weather.model';

@Component({
  selector: 'app-weather-comp',
  templateUrl: './weather-comp.component.html',
  styleUrls: ['./weather-comp.component.css']
})
export class WeatherCompComponent implements OnInit {
  CityWeatherDescription = CityWeatherDescription;
  @Input()
  data: CityWeatherData = { city: `City not specified`, temp: 0, maxTemp: 1, minTemp: -1, weatherDesc: `not specified`};

  public weatherImageSrc()

  constructor() { }

  ngOnInit(): void {
  }

}
