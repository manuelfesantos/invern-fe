import { Currency } from "@/types/store/currency";
import { Tax } from "@/types/store/tax";

export interface Country {
  name: string;
  code: string;
  currency: Currency;
  taxes: Tax[];
}
