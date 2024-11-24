import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { OrdersService } from '../../services/orders.service';
import { Order } from '../../interfaces/order.interface';
import { PdfService } from 'src/app/services/pdf.service';

@Component({
  selector: 'order-detail',
  templateUrl: './order-detail.component.html'
})

export class OrderDetailComponent implements OnInit {

  //Typar correctemente.
  public order: any;

  constructor(
    private orderService: OrdersService,
    private activatedRoute: ActivatedRoute,
    private pdfService: PdfService
  ){}


  ngOnInit(): void {
    this.order = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.getOrder(this.order);
  }


  getOrder(id: string){
    this.orderService.getOrder(id).subscribe((response) => {
      console.log(response)
      this.order = response;
    })
  }

  getPdf(): void {
    this.pdfService.getPdf(this.order.id).subscribe({
      next: (blob) => {
        this.pdfService.openPdfInNewTab(this.order.id)
      }
    })
  }



}
