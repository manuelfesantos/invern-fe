export interface Payment {
  createdAt: string;
  type: string;
  state: string;
  netAmount: number;
  grossAmount: number;
}
