import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { OrdersService } from '../../services/orders.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from './../../interfaces/customer.interface';
import { Order } from './../../interfaces/order.interface';




@Component({
  selector: 'update-customer',
  templateUrl: 'update-customer.component.html'
})


export class UpdateCustomerComponent implements OnInit {

  @Input() order! : any;
  @Output() customerUpdated = new EventEmitter<boolean>();
  editCustomerForm : FormGroup;




  constructor(
    private orderService: OrdersService,
    private customerService: CustomerService,
    private fb: FormBuilder
  ) {
    this.editCustomerForm  = this.fb.group(
      {
        name: [''],
        email: [''],
        phone: ['']
      }
    )
  }




  ngOnInit() {
    initFlowbite();
    this.getOrder(this.order)
  }

  getOrder(id: string){
    this.orderService.getOrder(id).subscribe((response) => {
      this.order = response;
      this.populateForm(this.order.customer);
    })
  }

  populateForm(customer: any){
    this.editCustomerForm.patchValue({
      name: customer.name,
      email: customer.email,
      phone: customer.phone
    });
  }

  updateCustomer(){
    const updatedCustomer = this.editCustomerForm.value;

    this.customerService.updateCustomer(this.order.customer.id, updatedCustomer)
    .subscribe({
      next: (updatedCustomer) => {
        console.log('Customer updated successfully', updatedCustomer);
        this.customerUpdated.emit(true);
      },
      error: (error) => {
        this.customerUpdated.emit(false);
        console.log('Error updating customer', error);
      }
    })
  }
}
