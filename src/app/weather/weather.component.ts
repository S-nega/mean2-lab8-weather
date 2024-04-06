import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city: string='Almaty';
  data: any;
  datas: any[] = [];

  constructor(  
    private weatherService: WeatherService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}



  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const searchCity = params.get('city'); // Получаем userId из параметров маршрута
    if (searchCity){
      this.city = searchCity;
    }
    this.weatherService.getWeather(this.city).subscribe((data: any) => {
      this.data = data;
    });;
    })
  }
}
