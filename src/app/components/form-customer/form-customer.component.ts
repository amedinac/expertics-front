import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../interfaces/customer.interface';
import { Router, RouterLink } from '@angular/router';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';



@Component({
  selector: 'form-customer',
  templateUrl: './form-customer.component.html',
  styles: [
  ]
})
export class FormCustomerComponent {

  private searchTerms = new Subject<string>();

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => this.customerService.searchCustomer(term)),
      )
      .subscribe((results) => {
        console.log(results);
      });
  }

  searchCustomer(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.searchTerms.next(element.value);
  }


  public customerForm = this.fb.group({
    name: [],
    email: [],
    phone: []
  });



  // getUserId(){
  //   const token = localStorage.getItem('token') || '';
  //   var payload = JSON.parse(atob(token.split('.')[1]));
  //   return payload.id;
  // }
  // searchCustomer(email:string) {
  //   this.customerService.searchCustomer(email)
  //     .subscribe(
  //       customer => {
  //         console.log(customer)
  //         this.customerEmail = email;
  //       }
  //     )
  // }


  onSubmit(customerForm: FormGroup) {
    this.customerService.createCustomer(customerForm.value)
      .subscribe((customer) => {
          return
      },
      error => {
        if (error.status === 400) {
          this.customerForm.setErrors({ customerAlreadyExist: true })
        }
      });
  }



}
