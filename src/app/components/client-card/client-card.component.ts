import { Component, Input } from '@angular/core';
import { Order } from 'src/app/interfaces/order.interface';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'client-card',
  templateUrl: './client-card.component.html',
})
export class ClientCardComponent {


  //Typar correctamente.
      // public order: any;
      @Input() order!: Order;

        constructor(
          private orderService: OrdersService,
        ){}



    onClientUpdated(success: boolean) {
      if (success) {
        // this.loadOrderDetails(this.order.id);
      }
    }

    loadOrderDetails(orderId: string) {
      this.orderService.getOrder(orderId).subscribe(
        (updatedOrder) => {
          this.order = updatedOrder;
        }
      );
    }

}
