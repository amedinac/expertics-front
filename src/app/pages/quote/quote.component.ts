import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailQuote } from 'src/app/interfaces/detail-quote.interface';
import { Quote } from 'src/app/interfaces/quote.interface';
import { QuoteService } from 'src/app/services/quote.service';

@Component({
  selector: 'quote',
  templateUrl: './quote.component.html',
})
export class QuoteComponent implements OnInit {

  public quote!: Quote;
  public quoteId!: string;
  public subtotal!: number;
  public tax!: number;
  public total!: number;
  public detailsQuote!: DetailQuote[];

  constructor(
    private quoteService: QuoteService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.getQuote();

  }


  getQuote() {
    // const quoteid = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.quoteService.getQuote(this.quoteId).subscribe(data => {

      this.quote = data as Quote;
      this.quoteId = data.id;
      this.detailsQuote = data.detailsQuote;
      this.subtotal = data.subtotal;
      this.tax = data.tax;
      this.total = data.total;
      console.log(this.quote);
    })
  }

  deleteDetailQuote(id:number) {
    this.quoteService.deleteQuoteDetail(id).subscribe({
      next: () => {
        location.reload();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
