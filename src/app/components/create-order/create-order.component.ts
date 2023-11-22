import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  //userLogged = 0;

  orderForm = new FormGroup({
    serial: new FormControl('C6KD72KMN739'),
    description: new FormControl(''),
    coverage: new FormControl(''),
    vmi: new FormControl(''),
    fail: new FormControl(''),
    user: new FormControl(this.getUserId())
  });

  constructor(
    private ordersService: OrdersService,
    private router: Router
  ) { }

  getUserId(){
    const token = localStorage.getItem('token') || '';
    var payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  }

  onSubmit(orderForm: FormGroup) {
    this.ordersService.createOrder(orderForm.value)
    .subscribe((order) => {
      this.router.navigateByUrl('/orders');
    });
  }



}
