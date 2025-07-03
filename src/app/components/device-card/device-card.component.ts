import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { Order } from 'src/app/interfaces/order.interface';


@Component({
  selector: 'device-card',
  templateUrl: './device-card.component.html',
})
export class DeviceCardComponent {

    @Input() order!: Order;
}
