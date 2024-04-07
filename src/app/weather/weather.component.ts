import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city: string='Almaty';
  data: any;
  datas: any[] = [];
  searchForm: FormGroup

  constructor(  
    private weatherService: WeatherService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.searchForm = this.formBuilder.group({
      city: [''],
    })
  }

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

  onSubmit(): void {
    if (this.searchForm.valid){
      this.city = this.searchForm.value.city;
      this.weatherService.getWeather(this.city).subscribe(
        data => {
          console.log('User added successfully:', data);
        },
        error => {
          console.error('Error adding user:', error);
          this.router.navigate(['/weather']);
        }
      );
      this.router.navigate(['/weather/' + this.city]);

    }
  }
}
