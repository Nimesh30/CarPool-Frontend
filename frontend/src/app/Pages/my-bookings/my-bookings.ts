import { Component } from '@angular/core';
import { PassengerService } from '../../services/passenger-service';

@Component({
  selector: 'app-my-bookings',
  imports: [],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css',
})
export class MyBookings {
  bookings: any[] = [];

  constructor(private passengerService: PassengerService) {}
  ngOnInit() {
    this.passengerService.getMyBookings().subscribe((response: any) => {
      this.bookings = response.data;
    });
  }

  cancelBooking(bookingId: string) {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    this.passengerService.cancelBooking(bookingId).subscribe({
      next: (res: any) => {
        alert('Booking cancelled successfully');

        // Update UI instantly (no reload needed)
        this.bookings = this.bookings.map((b) => {
          if (b.bookingId === bookingId) {
            return { ...b, bookingStatus: 'CANCELLED' };
          }
          return b;
        });
      },
      error: (err) => {
        console.error(err);
        alert('Failed to cancel booking');
      },
    });
  }
}
