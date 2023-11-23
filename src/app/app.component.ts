import { Component, inject,effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MyWeatherService } from './services/my-weather.service';
import { HttpClientModule } from '@angular/common/http';
import {Subscription} from 'rxjs';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { TodayComponent } from './components/today/today.component';
import { Today } from './model/today';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ForecastComponent } from './components/forecast/forecast.component';
import { Forecast } from './model/forecast';
import { LocationService } from './services/location.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, 
    RouterOutlet,HttpClientModule,
    NavbarComponent,MatGridListModule,
    TodayComponent,MatProgressSpinnerModule,
    ForecastComponent
    ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private subscription!:Subscription
  public mw = inject(MyWeatherService);
  public loc = inject(LocationService);

  public todayForecast!:Today;
  public futureForecast:Forecast = {
    days:[]
  }

  constructor(){
    effect(()=>{
      this.updatePosition(this.loc.position().lat,this.loc.position().lng);
    });
  }

  private updatePosition(lat:number,lng:number):any{
   
    if(lat==-1000 || lng==-1000){
      return 0;
    }
    this.subscription=this.mw.getForeCast(lat,lng).subscribe(data=>{
      console.log(data)
      this.todayForecast = {
        location:data.location.name,
        maxtemp:data.forecast[0].day.maxtemp_c,
        mintemp:data.forecast[0].day.mintemp_c,
        condition:data.forecast[0].day.condition
      };
      //seteo del otro componente???
      this.futureForecast.days=[];
      for(let d of data.forecast){
        this.futureForecast.days.push(
          {
            date:d.date,
            weather:{
              location:data.location.name,
              maxtemp:d.day.maxtemp_c,
              mintemp:d.day.mintemp_c,
              condition:d.day.condition
            }
          }
        )
      }

    })
  }


  ngOnInit(){
    //queremos la ubicación
    this.loc.getLocation();
  }

  

  //Ya no es necesario gracias a takeUntiDestroyed
  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

}
