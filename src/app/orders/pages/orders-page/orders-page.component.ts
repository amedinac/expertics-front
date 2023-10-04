import { Component } from '@angular/core';
import { OrdersService } from '../../orders.service';
import { Order } from '../../interfaces/order.interface';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styles: [
  ]
})
export class OrdersPageComponent {
  orders: Order[] = [];
  //order: Order;

  constructor(private ordersService: OrdersService) {
    //this.orders = [];
    //this.order = {  serial: 'C02XL', description: '', coverage: '', vmi: '', fail: '' };
  }

  ngOnInit() {
    this.ordersService.getOrders().subscribe((orders: Order[]) => {
      console.log(orders);
      this.orders = orders;
    });
  }
}
