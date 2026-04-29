import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PassengerService {
  private apiUrl = 'http://localhost:8081/passenger/search';

  constructor(private http: HttpClient) {
    console.log('in passanger search API contructor');
  }

  searchRides(data: any): Observable<any> {
    console.log('in passanger search API ', data);

    const token = localStorage.getItem('accessToken'); // your JWT

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(this.apiUrl, data, { headers });
  }

  bookRide(journeyId: string, data: any) {
    const token = localStorage.getItem('accessToken'); // your JWT

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`http://localhost:8081/passenger/book/${journeyId}`, data,{ headers });
  }
}
