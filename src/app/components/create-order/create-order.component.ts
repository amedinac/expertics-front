import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OrdersService } from '../../services/orders.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Order } from '../../interfaces/order.interface';
import { Router, RouterLink } from '@angular/router';
import { Customer } from 'src/app/interfaces/customer.interface';

@Component({
  selector: 'create-order',
  templateUrl: './create-order.component.html',
  styles: [
  ]
})
export class CreateOrderComponent implements OnInit {

  orders: Order[] = [];

  constructor(
    private ordersService: OrdersService,
    private customerService: CustomerService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log(this.customer)
  }


  public customer = this.customerService.customer$;

  public orderForm: FormGroup = this.fb.group({
    serial: [],
    description: [],
    coverage: [],
    vmi: [],
    fail: [],
    user: [this.getUserId()],
    customer: [this.customer.id]
  });



  getUserId(){
    const token = localStorage.getItem('token') || '';
    var payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  }

  // getCustomerId(){
  //   return customer$.id;
  //  }

  onSubmit(orderForm: FormGroup) {
    this.ordersService.createOrder(orderForm.value)
    .subscribe(() => {
      this.router.navigateByUrl('/orders');
    });
  }



}
