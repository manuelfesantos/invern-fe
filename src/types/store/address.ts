import { Country } from "@/types/store/country";

export interface Address {
  addressId: string;
  line1: string;
  line2: string;
  postalCode: string;
  city: string;
  country: Country;
}
