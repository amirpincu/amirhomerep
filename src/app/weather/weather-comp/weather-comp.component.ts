import { Component, OnInit, Inject, Input, OnDestroy } from '@angular/core';
import { CityWeatherDescription, CityWeatherData } from '../models/city-weather.model';
import { WeatherServService } from '../services/weather-serv.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-comp',
  templateUrl: './weather-comp.component.html',
  styleUrls: ['./weather-comp.component.css']
})
export class WeatherCompComponent implements OnInit, OnDestroy {
  CityWeatherDescription = CityWeatherDescription;
  @Input()
  data: CityWeatherData = { city: `City not specified`, temp: 0, maxTemp: 1, minTemp: -1, weatherDesc: CityWeatherDescription.sunny};

  public weatherImageSrc(): string {
    const urlbase: string = "assets/weather-pics/";
    const keys = Object.keys(CityWeatherDescription).
      filter(weather => typeof CityWeatherDescription[weather as any] === "number");
    var specificFileSuffix = '';

    keys.forEach(weather => {
      if (this.data.weatherDesc == CityWeatherDescription[weather]) {
        specificFileSuffix = `${weather}.png`;
      }
    })

    return `${urlbase}/${specificFileSuffix}`;
  }

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {

  }
}
