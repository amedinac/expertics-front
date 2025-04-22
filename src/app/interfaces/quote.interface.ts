import { DetailQuote } from "./detail-quote.interface";

export interface Quote {
  id: string;
  createDate: string;
  subtotal: number;
  tax: number;
  total: number;
  detailsQuote: DetailQuote[];
}
