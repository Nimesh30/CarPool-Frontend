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

  register(user: UserDTO){
    return this.http.post(`${this.baseUrl}/register`, user);
  }

//   login(data: any) {
//   return this.http.post('http://localhost:8081/api/auth/login', data, {
//     responseType: 'text'
//   });
// }

  login(data: any){
    return this.http.post(`${this.baseUrl}/login`, data).pipe(
      tap((res: any) => {
        // ✅ Store in sessionStorage (or localStorage)
        sessionStorage.setItem('user', JSON.stringify(res));

        // 👉 if token exists
        if (res.token) {
          sessionStorage.setItem('token', res.token);
        }
      })
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
