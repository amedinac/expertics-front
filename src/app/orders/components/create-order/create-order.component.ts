import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OrdersService } from '../../orders.service';
import { Order } from '../../interfaces/order.interface';

@Component({
  selector: 'create-order',
  templateUrl: './create-order.component.html',
  styles: [
  ]
})
export class CreateOrderComponent {

  orders: Order[] = [];

  orderForm = new FormGroup({
    serial: new FormControl('C6KD72KMN739'),
    description: new FormControl(''),
    coverage: new FormControl(''),
    vmi: new FormControl(''),
    fail: new FormControl(''),
  });


  constructor(
    private ordersService: OrdersService
  ) { }

  onSubmit(orderForm: FormGroup) {
    this.ordersService.createOrder(orderForm.value)
    .subscribe((order) => {
    });
  }



}
