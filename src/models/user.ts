interface Metadata {
  id: number;
  email: string;
}

export interface User extends Metadata {
  first_name: string;
  last_name: string;
  country: string;
  current_lang: Langs;
  balance: number;
  currency: Currencies;
  joined: Date;
}
