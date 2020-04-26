import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { CityWeatherData } from '../models/city-weather.model';
import { WeatherServService, WeatherAPIResponseCod } from '../services/weather-serv.service';
import { FormsModule } from '@angular/forms';
import { state } from '@angular/animations';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WeatherDialogCompComponent } from '../weather-dialog-comp/weather-dialog-comp.component';

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

  constructor(private wethServ: WeatherServService, private activeRouter: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit(): void {
    // this._cities.push({ city: 'TEST CITY', temp: 15, maxTemp: 18, minTemp: 14, weatherDesc: '01d' });
  }

  async addCity(): Promise<void> {
    await this.wethServ.cityWeatherByName(this.cityName);
    const returnCode = this.wethServ.getCityRequestCode();

    switch (returnCode) {
      case WeatherAPIResponseCod.valid : {
        this.cities = this.wethServ.getCities();
      }
      default : {
        this.openDialog(returnCode);
      }
    }
  }

  public openDialog(code: number) {
    const dialogRef = this.dialog.open(WeatherDialogCompComponent, {
      width: '500px',
      data: { data: code }
    });
  }

  ngOnDestroy() {
  }
}
