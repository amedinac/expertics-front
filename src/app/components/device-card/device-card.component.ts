import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../services/orders.service';


@Component({
  selector: 'device-card',
  templateUrl: './device-card.component.html',
})
export class DeviceCardComponent implements OnInit {

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


 }
