import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../interfaces/customer.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'create-customer',
  templateUrl: './create-customer.component.html',
  styles: [
  ]
})

export class CreateCustomerComponent {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private customerService: CustomerService
  ) { }

  // orders: Order[] = [];
  //userLogged = 0;

  public customerForm: FormGroup = this.fb.group({
    name: [],
    email: [],
    phone: []
  });

  createCustomer() {
    this.customerService.createCustomer(this.customerForm.value)
      .subscribe(
        resp => {
          console.log(resp)
        },
        error => {
          if (error.status === 400){
            this.customerForm.setErrors({ alreadyRegister: true})
            console.log("desde excepcion error cliente ya existe")
          }
        }
      )
  }


  search(term: string):void {
    this.customerService.searchCustomers(term)
      .subscribe(customers => {
        console.log(customers)
        // this.customers = customers;
      });
  }



    // getUserId(){
  //   const token = localStorage.getItem('token') || '';
  //   var payload = JSON.parse(atob(token.split('.')[1]));
  //   return payload.id;
  // }


}
