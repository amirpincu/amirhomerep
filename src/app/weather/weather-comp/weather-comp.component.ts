import { Component, OnInit, Inject, Input, OnDestroy } from '@angular/core';
import { CityWeatherData } from '../models/city-weather.model';
import { WeatherServService } from '../services/weather-serv.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-comp',
  templateUrl: './weather-comp.component.html',
  styleUrls: ['./weather-comp.component.css']
})
export class WeatherCompComponent implements OnInit, OnDestroy {
  @Input()
  data: CityWeatherData = { city: `City not specified`, temp: 0, maxTemp: 1, minTemp: -1, weatherDesc: '01d'};

  public weatherImageSrc(): string {
    const url: string = `assets/weather-pics/${this.data.weatherDesc}.png`;
    return url;
  }

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {

  }
}
