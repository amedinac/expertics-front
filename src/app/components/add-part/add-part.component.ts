import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Part } from 'src/app/interfaces/part.interface';
import { DetailQuote } from 'src/app/interfaces/detail-quote.interface';
import { PartsService } from 'src/app/services/parts.service';
import { QuoteService } from 'src/app/services/quote.service';

@Component({
  selector: 'add-part',
  templateUrl: 'add-part.component.html',
})

export class AddPartComponent {
  searchQuery = new FormControl('');
  part: any = '';

  constructor(
    private partsService: PartsService,
    private quoteService: QuoteService
  ){}

  search(searchQuery: any): void {
    this.partsService.searchPart(searchQuery)
    .subscribe((part: Part) => {
      this.part = part;
      console.log('Desde add-part',part);
    })
  }

  addNewPart(){
    console.log("addNewPart <>", this.part)
    const { id } = this.part;
    const newQuoteDetail = {
      part: id,
      coverage: 'Limited Warranty',
      quote: 5
    }

    this.quoteService.addQuoteDetail(newQuoteDetail)
      .subscribe()

      location.reload();
  }

}
