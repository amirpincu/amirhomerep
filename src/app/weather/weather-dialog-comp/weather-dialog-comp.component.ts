import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weather-dialog-comp',
  templateUrl: './weather-dialog-comp.component.html',
  styleUrls: ['./weather-dialog-comp.component.css']
})
export class WeatherDialogCompComponent implements OnInit {
  @Input()
  data: number;

  constructor() { }

  ngOnInit(): void {
  }

}
