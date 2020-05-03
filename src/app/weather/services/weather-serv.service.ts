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
  private _tempCode : WeatherAPIResponseCod = WeatherAPIResponseCod.unknown;

  constructor(public http: HttpClient) { }

  /*
  /// Adds an entierley new city and replaces an already existing one.
  */
  private addCity( newCity: CityWeatherData ) : void {
    var foundCityIndex = -1;
    this._cities.forEach((city, cityIndex) => {
      if (city.cityName == newCity.cityName) { foundCityIndex = cityIndex; }
    });
    const result = (foundCityIndex == -1) ? this._cities.push(newCity) : this._cities[foundCityIndex] = newCity;
  }

  // /*
  // /// Requests the http rest query.
  // */
  // private getCityWeather( url: string ) {
  //   return this.http.get( url, {responseType: 'json'} ).toPromise().then(data => {
  //     // Checks what message came back
  //     var msgCode = WeatherAPIResponseCod.unknown;
  //     switch (((data as {})['cod'])) {
  //       case 200:
  //         msgCode = WeatherAPIResponseCod.valid; break;
  //       case 401:
  //         msgCode = WeatherAPIResponseCod.invalidApiKey; break;
  //       case 404:
  //         msgCode = WeatherAPIResponseCod.cityNotFound; break;
  //       default:
  //         msgCode = WeatherAPIResponseCod.unknown;
  //     }

  //     this._tempCode = msgCode;

  //     // Creates a new city
  //     if (this._tempCode == WeatherAPIResponseCod.valid) {
  //       // Creates a new city from the data
  //       const newCity: CityWeatherData = {
  //         cityName: (data as {})['name'], temp: (data as {})['main']['temp'], maxTemp: (data as {})['main']['temp_max'],
  //         minTemp: (data as {})['main']['temp_min'], weatherDesc: (data as {})['weather'][0]['icon']
  //       };

  //       this.addCity(newCity);
  //     }
  //   });
  // }

  // /*
  // /// Gets weather info for city
  // /// Return values:
  // /// WeatherAPIResponseCod.valid (200) -         The requested city was added to the city list and now needs to be updated.
  // /// WeatherAPIResponseCod.cityNotFound (404) -  The requested city was not found. Inform the requester.
  // /// WeatherAPIResponseCod.invalidApiKey (401) - The API needs to be renewd or extanded.
  // */
  // public async cityWeatherByName(city: string) {
  //   const url : string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=72a1ea74c1b0cbe1633ae3d07c395dd3`;
  //   await this.getCityWeather(url);
  // }

  public requestCityWeatherByName( city: string ) {
    return new Promise<WeatherAPIResponseCod>((resolve, reject) => {
      const url : string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=72a1ea74c1b0cbe1633ae3d07c395dd3`;
      this.http.get(url).toPromise().then(
        res => {
          console.log(`requestCityWeatherByName - accepter - cod: 200`);
          this._tempCode = WeatherAPIResponseCod.valid;

          // Creates a new city
          if (this._tempCode == WeatherAPIResponseCod.valid) {
            // Creates a new city from the data
            const newCity: CityWeatherData = {
              cityName: (res as {})['name'], temp: (res as {})['main']['temp'], maxTemp: (res as {})['main']['temp_max'],
              minTemp: (res as {})['main']['temp_min'], weatherDesc: (res as {})['weather'][0]['icon']
            };

            this.addCity(newCity);
          }

          resolve(this._tempCode);
          console.log("positive code recieved.")
        },
        msg => {
          // An error message came back. As such I just need the code to find out what went wrong.
          // To understand how I extract the code, here is an object example:
          /*
          { headers: HttpHeaders,
            status: 404, 
            statusText: "Not Found", 
            url: "https://api.openweathermap.org/data/2.5/ …" }
          */

          // Getting the error-code to make code clear and save enum equivelent in variable.
          const errorCode = (msg as {})['status'];
          var msgCode = WeatherAPIResponseCod.unknown;

          switch (errorCode) {
            case 401:
              msgCode = WeatherAPIResponseCod.invalidApiKey; break;
            case 404:
              msgCode = WeatherAPIResponseCod.cityNotFound; break;
            default:
              msgCode = WeatherAPIResponseCod.unknown;
          }

          console.log(`requestCityWeatherByName - rejected - code: ${msgCode}`);
          this._tempCode = msgCode;
          resolve(this._tempCode);
          reject();
        }
      )
    });
  }

  /*
  /// Returns the latest cod returned from a request and resets.
  /// This should be used after cityWeatherByName
  */
  public getCityRequestCode() : WeatherAPIResponseCod {
    const keepVal = this._tempCode; // this._tempCode = WeatherAPIResponseCod.unknown;
    return keepVal;
  }

  /*
  /// Returns the current city list
  */
  public getCities(): CityWeatherData[] {
    return this._cities;
  }
}