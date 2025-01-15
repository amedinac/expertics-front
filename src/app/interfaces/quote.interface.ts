import { DetailQuote } from "./detail-quote.interface";

export interface Quote {
  id: number;
  createDate: string;
  subtotal: number;
  tax: number;
  total: number;
  detailsQuote: DetailQuote[];
}
