import { Component, OnInit } from '@angular/core';
import { CityWeatherData, CityWeatherDescription as CityWeatherState } from '../models/city-weather.model';
import { WeatherServService } from '../services/weather-serv.service';
import { FormsModule } from '@angular/forms';
import { state } from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-view-comp',
  templateUrl: './weather-view-comp.component.html',
  styleUrls: ['./weather-view-comp.component.css']
})
export class WeatherViewCompComponent implements OnInit {
  // keeps a list of the cities displayed
  private _cities: CityWeatherData[] = [];

  public get cities(): CityWeatherData[] { return this._cities; }

  public set cities(value: CityWeatherData[]) { this._cities = value; }

  // City info (used temporeraly)
  private cityState: CityWeatherState = CityWeatherState.clear;
  private cityTemp: number = 0;
  private cityMaxTemp: number = 0;
  private cityMinTemp: number = 0;

  // subscriptions to city information
  private stateSub: Subscription;
  private tempSub: Subscription;
  private maxTempSub: Subscription;
  private minTempSub: Subscription;

  // ngModel
  public cityName: string;

  constructor(private wethServ: WeatherServService) { }

  ngOnInit(): void {
    // test city
    this._cities.push({ city: 'TEST CITY', temp: 15, maxTemp: 18, minTemp: 14, weatherDesc: CityWeatherState.raining });
  }

  addCity(): void {
    // uses the given city name to get information about the city
    // FOR NOW STARTING WITH THE STATE

    this.stateSub = this.wethServ.getWeatherState(this.cityName).subscribe((state) => this.cityState = this.stateStringtoEnum(state));
    this.tempSub = this.wethServ.getCurrentTemperature(this.cityName).subscribe((temp) => this.cityTemp = temp);
    this.maxTempSub = this.wethServ.getMaxTemperature(this.cityName).subscribe((temp) => this.cityMaxTemp = temp);
    this.minTempSub = this.wethServ.getMinTemperature(this.cityName).subscribe((temp) => this.cityMinTemp = temp);

    this._cities.push( { city: this.cityName, temp: this.cityTemp, maxTemp: this.cityMaxTemp, 
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
