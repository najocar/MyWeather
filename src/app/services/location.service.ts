import { Injectable,WritableSignal,signal } from '@angular/core';
import { Position } from '../model/position';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  public position:WritableSignal<Position> = signal({lat:-1000,lng:-1000});
 
  constructor() { }

  getLocation(): any{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
          (position)=>{
            console.log(position)
            this.position.update(oldValue=>{
              return {
                lat : position.coords.latitude,
                lng : position.coords.longitude
              }
            })
          },(error)=>{
            console.error(error)
          });
    }
  }
}
