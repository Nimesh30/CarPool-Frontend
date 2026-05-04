import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from '../models/user-dto.model';
import { tap } from 'rxjs/internal/operators/tap';
@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private baseUrl = 'http://localhost:8081/api/auth'; // change if needed

  constructor(private http: HttpClient) {}

  register(user: UserDTO) {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  //   login(data: any) {
  //   return this.http.post('http://localhost:8081/api/auth/login', data, {
  //     responseType: 'text'+
  //   });
  // }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data).pipe(
      tap((res: any) => {
        console.log(res);
        //  Store tokens separately
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);

        //  Store only required user info
        localStorage.setItem(
          'user',
          JSON.stringify({
            id: res.data.userId,
            email: res.data.email,
            role: res.data.role,
          }),
        );
      }),
    );
  }

  // ✅ Logout
  logout() {
    sessionStorage.clear(); // or removeItem('user')
  }

  // ✅ Check login
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  // ✅ Get user
  getUser() {
    return JSON.parse(sessionStorage.getItem('user') || '{}');
  }
}
