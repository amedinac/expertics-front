import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../interfaces/order.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'create-order',
  templateUrl: './create-order.component.html',
  styles: [
  ]
})
export class CreateOrderComponent {

  orders: Order[] = [];

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private fb: FormBuilder
  ) { }
  //userLogged = 0;

  public orderForm: FormGroup = this.fb.group({
    serial: [],
    description: [],
    coverage: [],
    vmi: [],
    fail: [],
    user: [this.getUserId()],
    customer: [this.getCustomerId()]
  });



  getUserId(){
    const token = localStorage.getItem('token') || '';
    var payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  }

  getCustomerId(){
    const customerId = localStorage.getItem('customer') || '';
    return JSON.parse(customerId);
   }

  onSubmit(orderForm: FormGroup) {
    this.ordersService.createOrder(orderForm.value)
    .subscribe((order) => {
      this.router.navigateByUrl('/orders');
    });
  }



}
