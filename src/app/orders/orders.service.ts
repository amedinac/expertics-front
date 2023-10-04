import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { Order } from './interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  url = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get<Order[]>(this.url)
  }

  createOrder(order: Order) {
    return this.http.post(this.url, order)
  }
}
