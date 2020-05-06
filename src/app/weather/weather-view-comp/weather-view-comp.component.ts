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

  public cityName;

  constructor(public wethServ: WeatherServService, 
    private activeRouter: ActivatedRoute ) { }

  ngOnInit(): void { }
  
  private AddCityToList( newCity: CityWeatherData ) : void {
    const existingCityIndex = this.cities.findIndex(currentCity => ( currentCity.cityName == newCity.cityName ));
    (existingCityIndex == -1) ? this.cities.push(newCity) : this.cities[existingCityIndex] = newCity;
  }

  /*
  /// Sends the city in cityName to the weather servie, gets an http response code and acts acordingly.
  */
  async addCity( city: string ) {
    if (city) { // check if a city was even given
      const retCode: WeatherAPIResponseCod = await this.wethServ.RequestCityWeatherByName(city);
  
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

  // Using observable
  public addCityObservable( city: string ) {
    this.wethServ.CityWeatherObservable(city).subscribe(
      // A normal response
      (res) => {
        // Creates a new city from the data then add it
        const newCity: CityWeatherData = {
          cityName: res['name'], 
          temp: res['main']['temp'], 
          maxTemp: res['main']['temp_max'],
          minTemp: res['main']['temp_min'], 
          weatherDesc: res['weather'][0]['icon']
        };

        this.AddCityToList(newCity);
        this.msg = ``;;
      },

      // An Error
      (err) => {
        // An error message came back. As such I just need the code to find out what went wrong.
          // To understand how I extract the code, here is an object example:
          /*
          { headers: HttpHeaders,
            status: 404, 
            statusText: "Not Found", 
            url: "https://api.openweathermap.org/data/2.5/ …" }
          */

          // Getting the error-code to make code clear and save enum equivelent in variable.
          const errorCode = err['status'];
          let errorType = WeatherAPIResponseCod.unknown;

          switch (errorCode) {
            case 401:
              this.msg = `The API key currently used is now invalid. please renew it.`; break;
            case 404:
              this.msg = `The city '${city}' was not found within the service's database.`; break;
            default:
              this.msg = `Unknown error occoured, please try again.`; break;
          }
      },

      // Stream completed
      () => {
        console.log('http rest completed.');
      }
    );
  }

  ngOnDestroy() {
  }
}
