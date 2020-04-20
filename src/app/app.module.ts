import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Components
import { WelcomeCompComponent } from './welcome/welcome-comp/welcome-comp.component';
import { WeatherCompComponent } from './weather/weather-comp/weather-comp.component';
import { WeatherViewCompComponent } from './weather/weather-view-comp/weather-view-comp.component';
import { WeatherServService } from './weather/services/weather-serv.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: WelcomeCompComponent }, 
  { path: 'weather', component: WeatherViewCompComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    WelcomeCompComponent,
    WeatherCompComponent,
    WeatherViewCompComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,

    MatInputModule, MatButtonModule, MatCardModule,
    MatFormFieldModule, MatGridListModule, HttpClientModule,
    FormsModule,

    RouterModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  providers: [ WeatherServService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
