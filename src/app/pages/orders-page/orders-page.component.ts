import { Component } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../interfaces/order.interface';

@Component({
  selector: 'orders-page',
  templateUrl: './orders-page.component.html',
  styles: [
  ]
})
export class OrdersPageComponent {
  orders: Order[] = [];

  constructor(private ordersService: OrdersService) {
    //this.orders = [];
    //this.order = {  serial: 'C02XL', description: '', coverage: '', vmi: '', fail: '' };
  }

  deleteOrder(id:number){
    this.ordersService.deleteOrder(id).subscribe(
      () => {
        console.log('ordern eliminada correctamente')
        location.reload();
      },
      (error) => {
        console.log('Error al eliminar orden', error)
      }
    );
    console.log("desde OrdersPage.ts")
  }

  ngOnInit() {
    this.ordersService.getOrders().subscribe((orders: Order[]) => {
      console.log(orders);
      this.orders = orders;
    });
  }
}
