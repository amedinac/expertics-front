import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../interfaces/customer.interface';
import { Observable, tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl = 'http://localhost:3000/api/customers';

  constructor(private http: HttpClient) { }

  get customer(): string {
    return localStorage.getItem('customer') || '';
  }

  searchCustomer(query: string): Observable<any> {
    const url = `${this.baseUrl}?query=${query}`;
    return this.http.get(url)
  }

  createCustomer(customer: Customer){
    return this.http.post(this.baseUrl, customer)
      .pipe(
        tap((resp: any) => {
          console.log(resp)
          this.saveLocalStorage(resp.id)
        })
      )
  }

  saveLocalStorage(customer: string) {
    localStorage.setItem('customer', customer);
  }
}
