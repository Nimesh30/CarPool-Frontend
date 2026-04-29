import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PassengerService } from '../../services/passenger-service';

@Component({
  selector: 'app-book-ride',
  imports: [ReactiveFormsModule],
  templateUrl: './book-ride.html',
  styleUrl: './book-ride.css',
})
export class BookRide {
  bookingForm!: FormGroup;
  rideData: any;

  constructor(
    private fb: FormBuilder,
    private service: PassengerService,
  ) {}

  ngOnInit() {
    this.rideData = history.state?.rideData;

    this.bookingForm = this.fb.group({
      pickupPoint: ['', Validators.required],
      dropPoint: ['', Validators.required],
      seats: [1, [Validators.required, Validators.min(1)]],
    });

    this.bookingForm.patchValue({
      pickupPoint: this.rideData?.pickupPoint,
      dropPoint: this.rideData?.dropPoint,
    });
  }

  onSubmit() {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    const formData = this.bookingForm.value;
    console.log('Ride Data:', this.rideData);
    this.service.bookRide(this.rideData.id, formData).subscribe({
      next: (res) => {
        alert('Booking Successful');
        console.log('Booking Response:', res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  increase() {
    const current = this.bookingForm.value.seats;
    const max = this.rideData?.availableSeats || 5;

    if (current < max) {
      this.bookingForm.patchValue({ seats: current + 1 });
    }
  }

  decrease() {
    const current = this.bookingForm.value.seats;

    if (current > 1) {
      this.bookingForm.patchValue({ seats: current - 1 });
    }
  }
}
