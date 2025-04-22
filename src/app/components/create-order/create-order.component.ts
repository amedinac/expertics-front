import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OrdersService } from '../../services/orders.service';
import { ClientService } from 'src/app/services/client.service';
import { Order } from '../../interfaces/order.interface';
import { Router, RouterLink } from '@angular/router';
import { Client } from 'src/app/interfaces/client.interface';

@Component({
  selector: 'create-order',
  templateUrl: './create-order.component.html',
  styles: [
  ]
})
export class CreateOrderComponent implements OnInit {

  orders: Order[] = [];
  clientId$ = this.clientService.clientId$;

  constructor(
    private ordersService: OrdersService,
    private clientService: ClientService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log("desde ngOninit create order",this.clientId$)
  }




  public orderForm: FormGroup = this.fb.group({
    serial: [],
    description: [],
    coverage: [''],
    vmi: [],
    fail: [],
    user: [this.getUserId()],
    client: [this.clientId$] // Aqui hay un error, tengo que acceder al ID de este objeto.
  });







  getUserId(){
    const token = localStorage.getItem('token') || '';
    var payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  }


//   getCustomerId(){
//    return this.customer.id;
//  }

  onSubmit(orderForm: FormGroup) {
    this.ordersService.createOrder(orderForm.value)
    .subscribe(() => {
      this.router.navigateByUrl('/dashboard');
    });
  }



}
