import { Part } from "./part.interface";

export interface DetailQuote {
  id: number;
  unitPrice: number;
  vmi: string;
  part: Part;
}
