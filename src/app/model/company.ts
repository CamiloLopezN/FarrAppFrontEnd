export interface CompanyRegistration {
  e_mail: string;
  password: string;
  name: string;
  address: string;
  contact_number: string;
  nit: string;
}

export interface CompanyRegistration2 {
  e_mail: string;
  name: string;
  address: string;
  contact_number: string;
  nit: string;
}

export interface CompanyResponse {
  name: string;
  address: string;
  contact_number: string;
  nit: string;
}

export interface CompanyResponseAdmin {

  _id: string;
  name: string;
  nit: string;
}

export interface CompanyResponseAdmin2 {

  _id: string;
  name: string;
  nit: string;
  contact_number: string;
  address: string;
  active: boolean;
}

export interface EventC {
  date: Date;
  name: string;
  city: string;
  img: string;
  hourInit: string;
  hourFin: string;
}

export interface Establishment {
  name: string;
  address: string;
  img: string;
}

export interface Category {
  name: string;
  select: boolean;
}

export interface Img {
  imgFile: FileList;
  imgUrl: string | ArrayBuffer;
}

export interface EstablishmentRegister {
  typeEstablishment: string[];
  categories: string [];
  name: string;
  logo: string;
  description: string;
  photo: string[];
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  capacity: number;
}
