import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Authservice } from '../../services/authservice';
import { HttpErrorResponse } from '@angular/common/http';
import { UserDTO } from '../../models/user-dto.model';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerForm: FormGroup;
  message: string = '';
  isError: boolean = false;

  constructor(private fb: FormBuilder, private auth: Authservice) {

    this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['USER', Validators.required]
    });
  }

  onSubmit() {

    console.log('Form Data:', this.registerForm.value);
    if (this.registerForm.invalid) {
      this.message = 'Please fill all fields correctly';
      this.isError = true;
      return;
    }

    this.auth.register(this.registerForm.value).subscribe({
  next: () => {
    this.message = 'Registration Successful ✅';
    this.isError = false;
    this.registerForm.reset({ role: 'USER' });
  },
  error: (err: HttpErrorResponse) => {
    this.message = err.error?.message || 'Registration Failed ❌';
    this.isError = true;
  }
});
  }
}
