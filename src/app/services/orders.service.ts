import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Order } from '../interfaces/order.interface';

interface ApiResponse<T> {
  total: number;
  data: T[];
}


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient) { }

  // getOrders(limit: number, offset: number): Observable<Order[]> {
  //   const url = `${this.baseUrl}/?limit=${limit}&offset=${offset}`
  //   return this.http.get<Order[]>(url)
  // }

  getOrders(limit: number, offset: number): Observable<ApiResponse<Order>> {
    const url = `${this.baseUrl}/?limit=${limit}&offset=${offset}`
    return this.http.get<ApiResponse<Order>>(url);
  }


  createOrder(order: Order) {
    //order.user = 1; // **Value hardcodeado*** -> Falta corregir que tome id de usuario que esta logeado.
    console.log(order)
    return this.http.post(this.baseUrl, order)
  }

  deleteOrder(id: number) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
    console.log("Orden eliminada");
  }
}
