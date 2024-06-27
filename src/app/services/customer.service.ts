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

  customerId$!: any;
  customersList$!: any;

  constructor(
    private http: HttpClient,
    private router: Router) { }

  // get customer(): string {
  //   return localStorage.getItem('customer') || '';
  // }

  searchCustomers(query: string): Observable<Customer[]> {
    const url = `${this.baseUrl}/search?email=${query}`;
    console.log(url)
    return this.http.get<Customer[]>(url);
  }


  selectCustomer(customerId: any) {
    console.log("Desde selectCustomer en customerService", customerId)
    this.customerId$ = customerId;
    console.log("Desde selectCustomer en customerService - Customer", this.customerId$)
    this.router.navigateByUrl('/orders/new');
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post(this.baseUrl, customer)
      .pipe(
        tap((resp: any) => {
          this.customerId$ = customer.id;
        console.log(this.customerId$);
        this.router.navigateByUrl('/orders/new');
        })
      )
    }

  }
      // )



    // }  ({
    //   next: (customer: Customer) => {
    //     this.customerId$ = customer.id;
    //     console.log(this.customerId$);
    //     this.router.navigateByUrl('/orders/new');
    //   },
    //   error: (error) => {
    //     if (error.status === 400) {
    //       console.log(error)
    //     }
    //   });
    // .pipe(
    //   tap((resp: any) => {
    //     this.customerId = resp.id
    //     console.log(this.customerId)
    //   })
    // )
  // }

  // saveCustomer(customer: any) {
  //   this.customerId = customer.id
  // }

