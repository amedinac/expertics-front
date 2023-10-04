import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class UserService {

url = 'http://localhost:3000/api/auth/login';


  constructor(
      private http: HttpClient,
      private router: Router,
  ) { }


  login( formData: any ) {
    //console.log(formData)

    return this.http.post(this.url, formData )
  }



  saveLocalStorage( token: string ) {
    localStorage.setItem('token', token );
  }


}
