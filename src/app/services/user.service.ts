import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:3000/api/auth/login';


  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }



  login(formData: LoginForm): Observable<LoginForm> {
    return this.http.post(this.url, formData)
      .pipe(
        tap((resp: any) => {
          this.saveLocalStorage(resp.token)
        })
      )

  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }



  saveLocalStorage(token: string) {
    localStorage.setItem('token', token);
  }


}
