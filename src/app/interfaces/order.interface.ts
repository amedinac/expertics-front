import { Client } from "./client.interface";
import { Quote } from "./quote.interface";
import { User } from "./user.interface";

export interface Order {
  id: number;
  serial: string;
  description: string;
  coverage: string;
  vmi: string;
  fail: string;
  createdDate?: Date;
  user: User;
  client: Client;
  quote: Quote;

  //updatedAt: Date;
  //__v: number;
}
