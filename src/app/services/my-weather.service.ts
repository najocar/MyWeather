import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map, of, take } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { WeatherMocked } from './Mock/weatherMocked';

@Injectable({
  providedIn: 'root'
})
export class MyWeatherService {

  constructor(private http:HttpClient) { }

  getForeCast(lat:number,lng:number):Observable<any>{
    //return WeatherMocked.getMockData();
  

    return this.http.get(`${environment.apis.weather.url}
                            &key=${environment.apis.weather.key}
                            &q=${lat},${lng}`)
    .pipe(
      map(res=>{
        const {current,...info} = res as any;
        return info;
      }),
      map(res=>{
        return {'location':res.location,'forecast':res.forecast.forecastday}
      }),
      take(1)
    )
  }

}
