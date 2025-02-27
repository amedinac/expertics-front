import { Part } from "./part.interface";

export interface DetailQuote {
  id: number;
  unitPrice?: number;
  coverage: string;
  part: Part;
}
