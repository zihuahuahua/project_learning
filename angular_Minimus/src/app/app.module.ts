import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import { AngularFireLite } from 'angularfire-lite'
import { environment } from '../environments/environment';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { AddCardComponent } from './components/add-card/add-card.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WeatherCardComponent,
    AddCardComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    NguiAutoCompleteModule,
    FormsModule,
    // AngularFireLite.forRoot(environment.config),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
