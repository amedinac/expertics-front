import { Component, OnInit } from '@angular/core';
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
  public detailsQuote!: DetailQuote[];

  constructor(
    private quoteService: QuoteService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.getQuote();

  }


  getQuote() {
    const quoteid = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.quoteService.getQuote(quoteid).subscribe(data => {

      this.quote = data as Quote;
      this.detailsQuote = data.detailsQuote;
      console.log(this.detailsQuote)
    })
  }





}
