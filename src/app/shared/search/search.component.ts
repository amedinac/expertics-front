import { Component, EventEmitter, Input, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { of, fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { FormBuilder, FormControl } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { HttpClient } from '@angular/common/http';
import { Client } from 'src/app/interfaces/client.interface';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'shared-search',
  templateUrl: './search.component.html'
})

export class SearchComponent implements OnInit {
  searchQuery = new FormControl('')
  clientSelected: any = '';
  query = this.searchQuery.value?.toString()
  clients: Client[] = [];
  // searchQueryChanged: Subject<string> = new Subject<string>();


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private clientService: ClientService
  ) { }

  search(searchQuery: any): void {
    // this.searchQueryChanged.next(searchQuery);
    this.clientService.searchClients(searchQuery)
    .subscribe((clients: Client[]) => {
      this.clients = clients;
    })
  }

  getClientSelected(){
    const id = Number(this.clientSelected)
    this.clientService.selectClient(id)
  }

  ngOnInit(): void {
    initFlowbite()
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

