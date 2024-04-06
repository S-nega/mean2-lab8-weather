import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'http://localhost:3000/api/weather';

  constructor(
    private http: HttpClient,
    private router: Router,
    ) { }
  
  getWeather(city: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${city}`)
    // return this.http.get<any>(`${this.apiUrl}/?city=${city}`)
    // .pipe(
    //   catchError(error => {
    //     console.error(error.error.message);
    //     return throwError(error.error.message);
    //   })
    // );
  }
}
