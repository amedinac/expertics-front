import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { OrdersService } from '../../services/orders.service';
import { ClientService } from 'src/app/services/client.service';
import { Client } from '../../interfaces/client.interface';
import { Order } from '../../interfaces/order.interface';




@Component({
  selector: 'update-client',
  templateUrl: 'update-client.component.html'
})


export class UpdateClientComponent implements OnInit {

  @Input() order! : any;
  @Output() clientUpdated = new EventEmitter<boolean>();
  editClientForm : FormGroup;




  constructor(
    private orderService: OrdersService,
    private clientService: ClientService,
    private fb: FormBuilder
  ) {
    this.editClientForm  = this.fb.group(
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
      this.populateForm(this.order.client);
    })
  }

  populateForm(client: any){
    this.editClientForm.patchValue({
      name: client.name,
      email: client.email,
      phone: client.phone
    });
  }

  updateClient(){
    const updatedClient = this.editClientForm.value;

    this.clientService.updateClient(this.order.client.id, updatedClient)
    .subscribe({
      next: (updatedClient) => {
        console.log('Client updated successfully', updatedClient);
        this.clientUpdated.emit(true);
      },
      error: (error) => {
        this.clientUpdated.emit(false);
        console.log('Error updating client', error);
      }
    })
  }
}
