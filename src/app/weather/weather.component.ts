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
  myCity: string='Almaty';
  data: any;
  weatherData: any;
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
    console.log("on init")
    this.route.paramMap.subscribe(params => {
      const searchCity = params.get('city'); 

    if (searchCity){
      this.myCity = searchCity;
    }
    console.log("city = " + searchCity + "  " + this.myCity)

    this.weatherService.getWeather(this.myCity).subscribe(data => {
      this.weatherData = data;
      // console.log("My Data = " + data);
      // console.log('Weather Data:', this.weatherData);
    }, error => {
      console.error('Error fetching weather data:', error);
    });
    })
  }

  onSubmit(): void {
    if (this.searchForm.valid){
      console.log("on submit");
      this.myCity = this.searchForm.value.city;
      this.weatherService.getWeather(this.myCity).subscribe(
        data => {
          console.log('User added successfully:', data);//данные не приходят
        },
        error => {
          console.error('Error adding user:', error);//=>срабатывает ошибка
          this.router.navigate(['/error']);
        }
      );
      this.router.navigate(['/weather/' + this.myCity]);

    }
  }
}
