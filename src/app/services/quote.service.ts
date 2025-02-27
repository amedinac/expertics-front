import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quote } from '../interfaces/quote.interface';
import { DetailQuote } from '../interfaces/detail-quote.interface';



@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  baseUrl = 'http://localhost:3000/api/quotes/';

  constructor(private http: HttpClient) { }

  getQuote(id:string): Observable<Quote>{
    const url = `${this.baseUrl}${id}`
    return this.http.get<Quote>(url);
  }

  addQuoteDetail(quoteDetail: { part?: any; coverage?: string; quote?: number; id?: any; }){
    const url = `${this.baseUrl}detail_quote`
    return this.http.post(url, quoteDetail)
  }

}
