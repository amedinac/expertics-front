import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  @Input() quoteId!: string;

  constructor(
    private partsService: PartsService,
    private quoteService: QuoteService,
    private fb: FormBuilder
  ){}

  public partForm: FormGroup = this.fb.group({
    part: [this.part],
    coverage: [''],
    quote: [this.quoteId]
  });





  search(searchQuery: any): void {
    this.partsService.searchPart(searchQuery)
    .subscribe((part: Part) => {
      this.part = part;
      console.log('Desde add-part',part);
    })
  }

  onSubmit(partForm: FormGroup){
    // this.quoteService.addQuoteDetail(partForm.value)
    //   .subscribe((data) => {
    //     console.log('Desde add-part',data);
    //   }
    //   )

    console.log('partFort value',partForm.value);
  }




  // addNewPart(){
  //   console.log("addNewPart <>", this.part)
  //   const { id } = this.part;
  //   const newQuoteDetail = {
  //     part: id,
  //     coverage: 'Limited Warranty',
  //     quote: this.quoteId
  //   }

  //   this.quoteService.addQuoteDetail(newQuoteDetail)
  //     .subscribe()

  //     location.reload();
  // }

}
