import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt, templateJitUrl } from '@angular/compiler';
import { CityWeatherData } from '../models/city-weather.model';

export enum WeatherAPIResponseCod {
  valid = 200,
  cityNotFound = 404,
  invalidApiKey = 401,
  unknown = -1
}

@Injectable({
  providedIn: 'root'
})
export class WeatherServService {
  private _cities : CityWeatherData[] = [];
  private _tempCode : WeatherAPIResponseCod = WeatherAPIResponseCod.valid;

  constructor(public http: HttpClient) { }

  private getCityWeather(url: string) {
    return this.http.get(url, {responseType: 'json'}).subscribe(restResult => {
      switch (((restResult as {})['cod'])) {
        case 200:
          this._tempCode = WeatherAPIResponseCod.valid; break;
        case 401:
          this._tempCode = WeatherAPIResponseCod.invalidApiKey; break;
        case 404:
          this._tempCode = WeatherAPIResponseCod.cityNotFound; break;
        default:
          this._tempCode = WeatherAPIResponseCod.unknown;
      }

      if (this._tempCode == WeatherAPIResponseCod.valid) {
        this._cities.push( {
            city: (restResult as {})['name'],
            temp: (restResult as {})['main']['temp'],
            maxTemp: (restResult as {})['main']['temp_max'],
            minTemp: (restResult as {})['main']['temp_min'],
            weatherDesc: (restResult as {})['weather'][0]['icon']
          }
        );
      }
    });
  }

  /*
  /// Gets weather info for city
  /// Return values:
  /// WeatherAPIResponseCod.valid (200) -         The requested city was added to the city list and now needs to be updated.
  /// WeatherAPIResponseCod.cityNotFound (404) -  The requested city was not found. Inform the requester.
  /// WeatherAPIResponseCod.invalidApiKey (401) - The API needs to be renewd or extanded.
  */
 public async cityWeatherByName(city: string) {
  const url : string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=72a1ea74c1b0cbe1633ae3d07c395dd3`;
  await this.getCityWeather(url);
}

  public getCityRequestCode() {
    return this._tempCode;
  }

  public getCities(): CityWeatherData[] {
    return this._cities;
  }
}