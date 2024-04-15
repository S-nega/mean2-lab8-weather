import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'http://localhost:3000/api/weather';

  


  constructor(
    private http: HttpClient,
    private router: Router,
    private apollo: Apollo,
    ) {}

  getWeather(city: string): Observable<any> {
    return this.http.get<any>(`http://localhost:4000/api/weather/${city}`);
    // return this.apollo.query({
    //   query: gql`
    //     query GetWeatherByCity($city: String!) {
    //       getWeatherByCity(city: $city) {
    //         city
    //         temperature
    //         description
    //       }
    //     }
    //   `,
    //   variables: {
    //     city: city,
    //   },
    // });

    // return this.http.get<any>(`${this.apiUrl}/${city}`)
  }
}
