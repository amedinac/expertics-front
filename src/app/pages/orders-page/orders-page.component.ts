import { Component } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../interfaces/order.interface';
import { PdfService } from 'src/app/services/pdf.service';

@Component({
  selector: 'orders-page',
  templateUrl: './orders-page.component.html',
  styles: [
  ]
})
export class OrdersPageComponent {
  public orders: Order[] = [];
  public totalOrders: number = 0;
  public offset: number = 0;
  public limit : number = 10;
  public order: any;


  constructor(
    private ordersService: OrdersService,
    private pdfService: PdfService
  ) {
    //this.orders = [];
    //this.order = {  serial: 'C02XL', description: '', coverage: '', vmi: '', fail: '' };
  }

  ngOnInit(): void {
    this.getOrders();
  }

  deleteOrder(id:number){
    this.ordersService.deleteOrder(id).subscribe({
      next: () => {
        console.log('orden eliminada correctamente')
        location.reload();
      },
      error:(error) => {
        console.log('Error al eliminar orden', error)
      }
  });
  }


  getPdf(id: number){
    this.pdfService.getPdf(id).subscribe({
      next: (blob) => {
        this.pdfService.openPdfInNewTab(id)
      }
    })
  }



  getOrders() {
    this.ordersService.getOrders(this.limit, this.offset).subscribe((response) => {
      this.orders = response.data;
      this.totalOrders = response.total;
      console.log(this.orders)
    });
  }

  nextPage(value: number){
    this.offset += value;
    this.getOrders();
    console.log(this.offset)
  }

  prevPage(value: number){
    this.offset -= value;
    this.getOrders();
    console.log(this.offset)
  }


}
