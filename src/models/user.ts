import { Currencies } from "./Currencies";
import { Langs } from "./Langs";

interface Metadata {
  id: number;
  email: string;
}

export interface User extends Metadata {
  firstName: string;
  lastName: string;
  country: string;
  current_lang: Langs;
  balance: number;
  currency: Currencies;
  joined: Date;
}

export interface Session {
  userId: number;
  success: boolean;
  token: string;
}
