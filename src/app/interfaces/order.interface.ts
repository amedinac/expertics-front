export interface Order {
  id: number;
  serial: string;
  description: string;
  coverage: string;
  vmi: string;
  fail: string;
  createdDate?: Date;
  user: number;
  customer: number;

  //updatedAt: Date;
  //__v: number;
}
