import { Component, OnInit } from '@angular/core';
import { CityWeatherData, CityWeatherDescription } from '../models/city-weather.model';

@Component({
  selector: 'app-weather-view-comp',
  templateUrl: './weather-view-comp.component.html',
  styleUrls: ['./weather-view-comp.component.css']
})
export class WeatherViewCompComponent implements OnInit {
  private cities: CityWeatherData[] = [];

  constructor() { }

  ngOnInit(): void {
    this.cities.push({ city: 'new-york', temp: 15, maxTemp: 18, minTemp: 14, weatherDesc: CityWeatherDescription.raining });
  }

}
