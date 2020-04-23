import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class WeatherServService {
  constructor(public http: HttpClient) { }

  public getCityWeather(city: string) : any {
    let dataSubject: any = [
      new Subject<string>(), new Subject<number>(), // desctiprion, temperature
      new Subject<number>(), new Subject<number>()  // minimum and maximum temperature
    ];

    const qry : string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=de2c28d421ef9a6cba1f11256865f442`;
    this.http.get(qry).subscribe(
      (data) =>  { 
        dataSubject[0].next(data['weather'][0].main);
        dataSubject[1].next(Math.round(Number(data['main'].temp)));
        dataSubject[2].next(Math.round(Number(data['main'].temp_max)));
        dataSubject[3].next(Math.round(Number(data['main'].temp_min)));
      },
      (err) => { console.log(err); }
    );

    const returnData = {
      description: dataSubject[0],
      temperature: dataSubject[1],
      maxTemperature: dataSubject[2],
      minTemperature: dataSubject[3]
    };
    return returnData;
  }

  /*
  public getCityWeatherByName(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<string> {
    const dataSub = new Subject<string>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=de2c28d421ef9a6cba1f11256865f442`)
      .subscribe((data) => {
        dataSub.next(data['weather']);
      }, (err) => {
        console.log(err);
      });
    return dataSub;
  }

  // Returns weather description: clear, sunny, cloudy, raining, storm, snowy
  public getWeatherState(city: string): Subject<string> {
    const dataSubject = new Subject<string>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=de2c28d421ef9a6cba1f11256865f442`)
      .subscribe((data) => {
        dataSubject.next(data['weather'][0].main);
      });
    return dataSubject;
  }

  // Returns current temperature
  public getCurrentTemperature(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=de2c28d421ef9a6cba1f11256865f442`)
      .subscribe((weather: any) => {
        dataSubject.next(Math.round(Number(weather.main.temp)));
      });
    return dataSubject;
  }

  // Returns the maximum temperature
  public getMaxTemperature(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number>  {
    const dataSubject = new Subject<number>();
    let max: number;
    this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=de2c28d421ef9a6cba1f11256865f442`)
      .subscribe((weather: any) => {
        max = weather.list[0].main.temp;
        weather.list.forEach((value) => {
          if (max < value.main.temp) {
            max = value.main.temp;
          }
        });
        dataSubject.next(Math.round(max));
      });
    return dataSubject;
  }

  // Returns the minimum temperature
  public getMinTemperature(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number>  {
    const dataSubject = new Subject<number>();
    let min: number;
    this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=de2c28d421ef9a6cba1f11256865f442`)
      .subscribe((weather: any) => {
        min = weather.list[0].main.temp;
        weather.list.forEach((value) => {
          if (min > value.main.temp) {
            min = value.main.temp;
          }
        });
        dataSubject.next(Math.round(min));
      });
    return dataSubject;
  }
  */
}
