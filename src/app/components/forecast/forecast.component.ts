import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatCardModule,MatProgressBarModule],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss'
})
export class ForecastComponent {
  @Input() data!:any;

  ngOnChanges(chages:any){
  }
}
