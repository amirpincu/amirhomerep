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

  // ngModel
  public cityName: string;

  constructor(private wethServ: WeatherServService, private activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
    // test city
    this._cities.push({ city: 'TEST CITY', temp: 15, maxTemp: 18, minTemp: 14, weatherDesc: CityWeatherState.raining });
  }

  addCity(): void {
    const data: any = this.wethServ.getCityWeatherByName(this.cityName);
    this.cities.push(data);
    console.log(data);
  }

  ngOnDestroy() {
  }
}
