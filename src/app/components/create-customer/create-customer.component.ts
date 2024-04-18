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
    private customerService: CustomerService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  // orders: Order[] = [];
  //userLogged = 0;

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

  onSubmit(customerForm: FormGroup) {
    this.customerService.createCustomer(customerForm.value)
  }


  search(term: string):void {
    this.customerService.searchCustomers(term)
      .subscribe(customers => {
        console.log(customers)
        // this.customers = customers;
      });
  }


}
