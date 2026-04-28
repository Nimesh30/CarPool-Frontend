import { Component } from '@angular/core';
import { PassengerService } from '../../services/passenger-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-searched-jobs',
  imports: [CommonModule],
  templateUrl: './searched-jobs.html',
  styleUrl: './searched-jobs.css',
})
export class SearchedJobs {
  rides: any[] = [];

  constructor(private passengerService: PassengerService) {}

  ngOnInit() {
    const data = history.state.searchData;

    if (data) {
      this.fetchRides(data);
    } else {
      console.warn('No search data found');

      // 👇 optional dummy data (for testing without backend)
      this.rides = [
        {
          journeyId: 1,
          startLocation: 'Ahmedabad',
          endLocation: 'Palanpur',
          date: '2026-04-28',
          departureTime: '08:30',
          price: 350,
          availableSeats: 3,
          stops: ['Mehsana'],
          driverName: 'Ravi Patel',
          carName: 'Swift',
          numberPlate: 'GJ01AB1234'
        }
      ];
    }
  }

  fetchRides(data: any) {
    this.passengerService.searchRides(data).subscribe({
      next: (res: any) => {
        this.rides = res.data || res;
        console.log('Rides:', this.rides);
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
}
