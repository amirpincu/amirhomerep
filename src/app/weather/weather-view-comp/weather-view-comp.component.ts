import { Component, OnInit } from '@angular/core';
import { CityWeatherData, CityWeatherDescription as CityWeatherState } from '../models/city-weather.model';
import { WeatherServService } from '../services/weather-serv.service';
import { state } from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-view-comp',
  templateUrl: './weather-view-comp.component.html',
  styleUrls: ['./weather-view-comp.component.css']
})
export class WeatherViewCompComponent implements OnInit {
  private cities: CityWeatherData[] = [];

  // City info
  private cityName: string;
  private cityState: CityWeatherState;
  private cityTemp: number;
  private cityMaxTemp: number;
  private cityMinTemp: number;

  // subscriptions
  private stateSub: Subscription;
  private tempSub: Subscription;
  private maxTempSub: Subscription;
  private minTempSub: Subscription;

  constructor(private wethServ: WeatherServService) { }

  ngOnInit(): void {
    this.cities.push({ city: 'new-york', temp: 15, maxTemp: 18, minTemp: 14, weatherDesc: CityWeatherState.raining });
  }

  addCity(): void {
    this.stateSub = this.wethServ.getWeatherState(this.cityName).subscribe((state) => this.cityState = this.stateStringtoEnum(state));
    this.tempSub = this.wethServ.getCurrentTemperature(this.cityName).subscribe((temp) => this.cityTemp = temp);
    this.maxTempSub = this.wethServ.getMaxTemperature(this.cityName).subscribe((temp) => this.cityMaxTemp = temp);
    this.minTempSub = this.wethServ.getMinTemperature(this.cityName).subscribe((temp) => this.cityMinTemp = temp);

    this.cities.push( { city: this.cityName, temp: this.cityTemp, maxTemp: this.cityMaxTemp, 
      minTemp: this.cityMinTemp, weatherDesc: this.cityState } );
  }

  stateStringtoEnum(state: string) {
    switch (state) {
      case 'clear':
        return CityWeatherState.clear;
      case 'sunny':
        return CityWeatherState.sunny;
      case 'cloudy':
        return CityWeatherState.cloudy;
      case 'raining':
        return CityWeatherState.raining;
      case 'storm':
        return CityWeatherState.storm;
      case 'snowing':
        return CityWeatherState.snowing;
    }

    return undefined;
  }

  ngOnDestroy() {
    this.stateSub.unsubscribe();
    this.tempSub.unsubscribe();
    this.maxTempSub.unsubscribe();
    this.minTempSub.unsubscribe();
  }
}
