import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../interfaces/customer.interface';
import { Observable, tap } from 'rxjs';
import { Router, RouterLink } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  baseUrl = 'http://localhost:3000/api/customers';

  customer$!: any;
  customersList$!: any;

  constructor(
    private http: HttpClient,
    private router: Router) {}

  // get customer(): string {
  //   return localStorage.getItem('customer') || '';
  // }

  searchCustomers(query: string): Observable<Customer[]> {
    const url = `${this.baseUrl}/search?email=${query}`;
    console.log(url)
    return this.http.get<Customer[]>(url);
  }

  createCustomer(customer: Customer) {
    return this.http.post(this.baseUrl, customer).subscribe({
      next: (customer) => {
        this.customer$ = customer;
        console.log(this.customer$);
        this.router.navigateByUrl('/orders/new');
      },
    });
    // .pipe(
    //   tap((resp: any) => {
    //     this.customerId = resp.id
    //     console.log(this.customerId)
    //   })
    // )
  }

  // saveCustomer(customer: any) {
  //   this.customerId = customer.id
  // }
}
