import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'client-card',
  templateUrl: './client-card.component.html',
})
export class ClientCardComponent implements OnInit {


  //Typar correctamente.
      public order: any;

        constructor(
          private orderService: OrdersService,
          private activatedRoute: ActivatedRoute
        ){}

    ngOnInit(): void {
      this.order = this.activatedRoute.snapshot.paramMap.get('id') || '';
      this.getOrder(this.order);
    }


    getOrder(id: string){
      this.orderService.getOrder(id).subscribe((response) => {
        console.log(response)
        this.order = response;
      })
    }

    onCustomerUpdated(success: boolean) {
      if (success) {
        this.loadOrderDetails(this.order.id);
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
