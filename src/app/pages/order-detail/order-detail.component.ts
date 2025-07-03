import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { OrdersService } from '../../services/orders.service';
import { Order } from '../../interfaces/order.interface';
import { PdfService } from 'src/app/services/pdf.service';

@Component({
  selector: 'order-detail',
  templateUrl: './order-detail.component.html'
})

export class OrderDetailComponent implements OnInit {

  orderId: string = '';
  order!: Order;

  constructor(
    private ordersService: OrdersService,
    private activatedRoute: ActivatedRoute,
    private pdfService: PdfService
  ){
    this.orderId = this.activatedRoute.snapshot.paramMap.get('id') || '';
  }


  ngOnInit(): void {
    this.ordersService.getOrder(this.orderId).subscribe((order) => {
      this.order = order;
      console.log('Desde order-detail',order);
    });
    // this.getCurrentOrder();
  }


  // getCurrentOrder(){
  //   this.ordersService.order$.subscribe((order) => {
  //     this.order = order;
  //     console.log('Desde order-detail',order);
  //   }
  //   )
  // }

  getPdf(): void {
    this.pdfService.getPdf(this.order.id).subscribe({
      next: (blob) => {
        this.pdfService.openPdfInNewTab(this.order.id)
      }
    })
  }

  openUpdateCustomerModal(order: any) {
    this.order = order;
  }

  onCustomerUpdated(success: boolean) {
    if (success) {
      this.loadOrderDetails(this.order.id.toString());
    }
  }

  loadOrderDetails(orderId: string) {
    this.ordersService.getOrder(orderId).subscribe(
      (updatedOrder) => {
        this.order = updatedOrder;
      }
    );
  }



}
