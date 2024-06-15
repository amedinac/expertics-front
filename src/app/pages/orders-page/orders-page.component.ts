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
  public orders: Order[] = [];
  public totalOrders: number = 0;
  public offset: number = 0;
  public limit : number = 10;

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

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.ordersService.getOrders(this.limit, this.offset).subscribe((response) => {
      this.orders = response.data;
      this.totalOrders = response.total;
      console.log(this.orders)
    });
  }

  nextPage(value: number){
    this.offset += value;
    this.getOrders();
    console.log(this.offset)
  }

  prevPage(value: number){
    this.offset -= value;
    this.getOrders();
    console.log(this.offset)
  }

}
