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
    this.ordersService.deleteOrder(id).subscribe({
      next: () => {
        console.log('orden eliminada correctamente')
        location.reload();
      },
      error:(error) => {
        console.log('Error al eliminar orden', error)
      }
  });
  }

  ngOnInit() {
    this.ordersService.getOrders().subscribe((orders: Order[]) => {
      console.log(orders);
      this.orders = orders;
    });
  }
}
