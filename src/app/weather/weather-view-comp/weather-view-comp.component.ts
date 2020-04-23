import { Component, OnInit, OnDestroy } from '@angular/core';
import { CityWeatherData, CityWeatherDescription as CityWeatherState } from '../models/city-weather.model';
import { WeatherServService } from '../services/weather-serv.service';
import { FormsModule } from '@angular/forms';
import { state } from '@angular/animations';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-view-comp',
  templateUrl: './weather-view-comp.component.html',
  styleUrls: ['./weather-view-comp.component.css']
})
export class WeatherViewCompComponent implements OnInit, OnDestroy {
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
  private weatherStateSub: Subscription;
  private tempSub: Subscription;
  private maxTempSub: Subscription;
  private minTempSub: Subscription;

  // ngModel
  public cityName: string;

  constructor(private wethServ: WeatherServService, private activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
    // test city
    this._cities.push({ city: 'TEST CITY', temp: 15, maxTemp: 18, minTemp: 14, weatherDesc: CityWeatherState.raining });
  }

  addCity(): void {
    const dataSubs = this.wethServ.getCityWeather(this.cityName);

    this.activeRouter.paramMap.subscribe((route: any) => { 
      // // uses the given city name to get information about the city
      this.weatherStateSub = dataSubs.description.subscribe((state) => this.cityState = this.stateStringtoEnum(state));
      this.tempSub = dataSubs.temperature.subscribe((temp) => this.cityTemp = temp);
      this.maxTempSub = dataSubs.maxTemperature.subscribe((temp) => this.cityMaxTemp = temp);
      this.minTempSub = dataSubs.minTemperature.subscribe((temp) => this.cityMinTemp = temp);

      this._cities.push( { city: this.cityName, temp: this.cityTemp, maxTemp: this.cityMaxTemp, 
      minTemp: this.cityMinTemp, weatherDesc: this.cityState } );
    })
  }

  stateStringtoEnum(state: string) {
    switch (state.toLowerCase()) {
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
    this.weatherStateSub.unsubscribe();
    this.tempSub.unsubscribe();
    this.maxTempSub.unsubscribe();
    this.minTempSub.unsubscribe();
  }
}
