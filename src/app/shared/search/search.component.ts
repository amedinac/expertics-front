import { Component, EventEmitter, Input, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { of, fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/app/interfaces/customer.interface';


@Component({
  selector: 'shared-search',
  templateUrl: './search.component.html'
})

export class SearchComponent  {
  searchQuery = new FormControl('')
  query = this.searchQuery.value?.toString()
  customers: Customer[] = [];
  searchQueryChanged: Subject<string> = new Subject<string>();


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private customerService: CustomerService
  ) { }

  search(searchQuery: any): void {
    this.searchQueryChanged.next(searchQuery);
    console.log(searchQuery);
    this.customerService.searchCustomers(searchQuery)
    .subscribe((customers: Customer[]) => {
      this.customers = customers;
      console.log("desde search", this.customers)
    })
  }

  // ngOnInit(): void {
  //   this.searchQueryChanged.pipe(
  //     // debounceTime(2000),
  //     distinctUntilChanged(),
  //     switchMap((query: string) => this.customerService.searchCustomers(query))
  //   ).subscribe((customers: Customer[]) => {
  //       this.customers = customers;
  //       console.log(this.customers);

  //     })
  // }



}

