import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Client } from '../../interfaces/client.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'create-client',
  templateUrl: './create-client.component.html',
  styles: [
  ]
})

export class CreateClientComponent {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private clientService: ClientService
  ) { }

  // orders: Order[] = [];
  //userLogged = 0;

  public clientForm: FormGroup = this.fb.group({
    name: [],
    email: [],
    phone: []
  });

  createClient() {
    this.clientService.createClient(this.clientForm.value)
      .subscribe(
        resp => {
          console.log(resp)
        },
        error => {
          if (error.status === 400){
            this.clientForm.setErrors({ alreadyRegister: true})
            console.log("desde excepcion error cliente ya existe")
          }
        }
      )
  }


  search(term: string):void {
    this.clientService.searchClients(term)
      .subscribe(clients => {
        console.log(clients)
        // this.customers = customers;
      });
  }



    // getUserId(){
  //   const token = localStorage.getItem('token') || '';
  //   var payload = JSON.parse(atob(token.split('.')[1]));
  //   return payload.id;
  // }


}
