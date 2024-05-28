import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OrdersService } from '../../services/orders.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Order } from '../../interfaces/order.interface';
import { Router, RouterLink } from '@angular/router';
import { Customer } from 'src/app/interfaces/customer.interface';

@Component({
  selector: 'create-order',
  templateUrl: './create-order.component.html',
  styles: [
  ]
})
export class CreateOrderComponent implements OnInit {

  orders: Order[] = [];
  customerId$ = this.customerService.customerId$;

  constructor(
    private ordersService: OrdersService,
    private customerService: CustomerService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log("desde ngOninit create order",this.customerId$)
  }




  public orderForm: FormGroup = this.fb.group({
    serial: [],
    description: [],
    coverage: [''],
    vmi: [],
    fail: [],
    user: [this.getUserId()],
    customer: [this.customerId$] // Aqui hay un error, tengo que acceder al ID de este objeto.
  });







  getUserId(){
    const token = localStorage.getItem('token') || '';
    var payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  }


//   getCustomerId(){
//    return this.customer.id;
//  }

  onSubmit(orderForm: FormGroup) {
    this.ordersService.createOrder(orderForm.value)
    .subscribe(() => {
      this.router.navigateByUrl('/dashboard');
    });
  }



}
