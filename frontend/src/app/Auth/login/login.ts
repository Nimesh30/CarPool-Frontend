import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Authservice } from '../../services/authservice';
import { RouterOutlet,RouterLinkActive,RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
   message = '';
  isError = false;
  loginForm: any;

  constructor(private fb: FormBuilder, private auth: Authservice, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
onSubmit() {
  if (this.loginForm.invalid) {
    this.message = 'Please enter valid details';
    this.isError = true;
    return;
  }

  this.auth.login(this.loginForm.value).subscribe({
    next: (res) => {
      this.message = 'Login Successful ✅';
      this.isError = false;

      // ✅ Redirect after login
      this.router.navigate(['/']);
    },
    error: (err: HttpErrorResponse) => {
      this.message = 'Login Failed ❌';
      this.isError = true;
    }
  });
}
}
