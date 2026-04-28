import { Component } from '@angular/core';
import { PassengerService } from '../../services/passenger-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-searched-jobs',
  imports: [CommonModule],
  templateUrl: './searched-jobs.html',
  styleUrl: './searched-jobs.css',
})
export class SearchedJobs {
  rides: any[] = [];

  constructor(
    private passengerService: PassengerService,
    private router: Router,
    private cdr:ChangeDetectorRef
  ) { }

  ngOnInit() {
    const data = history.state?.searchData;

    if (data) {
      this.fetchRides(data);
    } else {
      console.warn('No search data found');
    }
  }

  fetchRides(data: any) {
    this.passengerService.searchRides(data).subscribe({
      next: (res: any) => {
        this.rides = res.data || res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
}
