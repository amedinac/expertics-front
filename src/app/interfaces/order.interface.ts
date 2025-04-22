export interface Order {
  id: number;
  serial: string;
  description: string;
  coverage: string;
  vmi: string;
  fail: string;
  createdDate?: Date;
  user: number;
  client: number;

  //updatedAt: Date;
  //__v: number;
}
