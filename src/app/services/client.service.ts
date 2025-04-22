import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../interfaces/client.interface';
import { Observable, tap } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  baseUrl = 'http://localhost:3000/api/clients';

  clientId$!: any;
  clientsList$!: any;

  constructor(private http: HttpClient, private router: Router) {}

  // get customer(): string {
  //   return localStorage.getItem('customer') || '';
  // }

  searchClients(query: string): Observable<Client[]> {
    const url = `${this.baseUrl}/search?email=${query}`;
    console.log(url);
    return this.http.get<Client[]>(url);
  }

  selectClient(clientId: any) {
    console.log('Desde selectClient en clientService', clientId);
    this.clientId$ = clientId;
    console.log(
      'Desde selectClient en clientService - Client',
      this.clientId$
    );
    this.router.navigateByUrl('/orders/new');
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post(this.baseUrl, client).pipe(
      tap((client: any) => {
        this.clientId$ = client.id;
        console.log(this.clientId$);
        this.router.navigateByUrl('/orders/new');
      })
    );
  }

  updateClient(
    clientId: number,
    updatedClient: Partial<Client>
  ): Observable<Client> {
    const url = `${this.baseUrl}/${clientId}`;
    return this.http.patch<Client>(url, updatedClient);
  }
}
