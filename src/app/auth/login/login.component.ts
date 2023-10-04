import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LoginForm } from '../../interfaces/login-form.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
  ) { }

  loginForm = this.fb.group({
    email: [localStorage.getItem('email')],
    password: [''],
    //remember: [false]
  });




  login(loginForm: FormGroup) {
    this.userService.login(loginForm.value)
      .subscribe( resp => {
        //const { email } = loginForm.value
        //console.log(loginForm.value)
        //console.log(JSON.stringify(email))
        localStorage.setItem('email', loginForm.value.email);

        // Navegar al Dashboard
        this.router.navigateByUrl('/dashboard');
        });
    }
}
