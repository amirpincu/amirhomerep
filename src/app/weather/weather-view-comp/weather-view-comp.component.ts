import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { CityWeatherData } from '../models/city-weather.model';
import { WeatherServService, WeatherAPIResponseCod } from '../services/weather-serv.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-view-comp',
  templateUrl: './weather-view-comp.component.html',
  styleUrls: ['./weather-view-comp.component.css']
})
export class WeatherViewCompComponent implements OnInit, OnDestroy {
  // keeps a list of the cities displayed
  private _cities: CityWeatherData[] = [];
  public msg: string = "";

  public get cities(): CityWeatherData[] { return this._cities; }

  public set cities(value: CityWeatherData[]) { this._cities = value; }

  // ngModel
  public cityName: string;

  constructor(private wethServ: WeatherServService, 
    private activeRouter: ActivatedRoute ) { }

  ngOnInit(): void { }

  addCity() {
    const a = this.wethServ.requestCityWeatherByName(this.cityName);
    const retCode = this.wethServ.getCityRequestCode();
    console.log('response: ' + retCode);

    switch (retCode) {
      case WeatherAPIResponseCod.valid : {
        this.msg = "";
        this.cities = this.wethServ.getCities(); break;
      }
      case WeatherAPIResponseCod.cityNotFound : {
        this.msg = `The city '${this.cityName}' was not found within the service's database.`; break;
      }
      case WeatherAPIResponseCod.invalidApiKey : {
        this.msg = `The API key currently used is now invalid. please renew it.`; break;
      }
      case WeatherAPIResponseCod.unknown: {
        this.msg = `Unknown error occoured, please try again.`; break;
      }
      case undefined: {
        this.msg = `The function RequestCityWeatherByName was not activated.`
      }
    }
  }

  ngOnDestroy() {
  }
}
