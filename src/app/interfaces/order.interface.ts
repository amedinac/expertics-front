export interface Order {
  id: number;
  serial: string;
  description: string;
  coverage: string;
  vmi: string;
  fail: string;
  createdAt?: Date;
  user?: number;

  //updatedAt: Date;
  //__v: number;
}
