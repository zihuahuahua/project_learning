import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { first, map } from 'rxjs/operators'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  private readonly baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  private readonly forcastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';
  private readonly appID = environment.appID;

  constructor(public http: HttpClient) { }

  getWeather(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get(`${this.http}${city}&units=${metric}&APPID=${this.appID}`).pipe((first()))
  }

  getForecast(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get(`${this.forcastURL}${city}&units=${metric}&APPID=${this.appID}`)
      .pipe(first(), map(weather => weather['list']))
  }
}