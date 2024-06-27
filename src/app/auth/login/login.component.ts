import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
// import { LoginForm } from '../../interfaces/login-form.interface';
// import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  //styleUrls: ['./login.component.css']

})
export class LoginComponent {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
  ) { }

  public loginForm: FormGroup = this.fb.group({
    email: [localStorage.getItem('email'), [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false]
  });


  login() {
    this.userService.login(this.loginForm.value)
      .subscribe(
        resp => {

          console.log(this.userService.token)
          return this.router.navigateByUrl('/dashboard');
        },
        error => {
          if (error.status === 401) {
            this.loginForm.setErrors({ unauthenticated: true })
          } else if (error.status === 404) {
            this.loginForm.setErrors({ userNotFound: true })
          }

        }
      )

      console.log(this.loginForm.value)

      if (this.loginForm.get('remember')?.value) {
        localStorage.setItem('email', this.loginForm.get('email')?.value)
      } else {
        localStorage.removeItem('email');
      }
  }
}
