import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../interfaces/customer.interface';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl = 'http://localhost:3000/api/customers';

  constructor(private http: HttpClient) { }

  createCustomer(customer: Customer) {
    //order.user = 1; // **Value hardcodeado*** -> Falta corregir que tome id de usuario que esta logeado.
    console.log(customer)
    return this.http.post(this.baseUrl, customer)
  }
}
