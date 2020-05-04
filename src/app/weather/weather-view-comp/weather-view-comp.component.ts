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
  public cities: CityWeatherData[] = [];

  public msg: string = "";

  constructor(public wethServ: WeatherServService, 
    private activeRouter: ActivatedRoute ) { }

  ngOnInit(): void { }

  /*
  /// Sends the city in cityName to the weather servie, gets an http response code and acts acordingly.
  */
  async addCity( city: string ) {
    if (city) { // check if a city was even given
      const retCode: WeatherAPIResponseCod = await this.wethServ.requestCityWeatherByName(city);
  
      switch (retCode) {
        case WeatherAPIResponseCod.valid : { // The city was found in an returned from the web service, an existing city was updated.
          this.msg = "";
          this.cities = this.wethServ.cities; break;
        }
        case WeatherAPIResponseCod.cityNotFound : { // The city was not found within the web sevice's database.
          this.msg = `The city '${city}' was not found within the service's database.`; break;
        }
        case WeatherAPIResponseCod.invalidApiKey : { // Since i'm using the free version of the API, this means I should
          this.msg = `The API key currently used is now invalid. please renew it.`; break;
        }
        default: { // An unknown error returned. This exists just to cover all my bases.
          this.msg = `Unknown error occoured, please try again.`; break;
        }
      }
    }
    else { // a city was not given
      this.msg = `Please write a city name in the line bellow.`;
    }
    
  }

  ngOnDestroy() {
  }
}
