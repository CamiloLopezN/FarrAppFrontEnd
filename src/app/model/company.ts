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
  date: string;
  name: string;
  city: string;
  img: string | ArrayBuffer;
  hourInit: string;
  hourFin: string;
}

export interface EventView {
  _id: string;
  city: string;
  eventName: string;
  startDate: Date;
  endDate: Date;
  photos: string[];
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
  imgFile: File;
  imgUrl: string | ArrayBuffer;
}

export interface Ticket2 {
  ticketName: string;
  onlinePrice: number;
  amountEntries: number;
  startDateSale: Date;
  endDateSale: Date;
  description: string;
  doorPrice: number;
  fastLine: boolean;
  statusTicket: string;
  promotionalCode: CodePromotional[];
  maxTicketPerTransfer: number;
  minTicketPerTransfer: number;
  transferable: boolean;
  otherInfo: string;
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

export interface EventRegister {
  eventName: string;
  sDate: Date;
  eDate: Date;
  photos: string[];
  eventCategory: string[];
  description: string;
  dresCode: string[];
  minAge: number;
  establishmentId: string;
  latitude: number;
  longitude: number;
  address: string;
  capacity: number;
  city: string;
  tickets: Ticket2[];
  status: string;
}

export interface Status {
  name: string;
  isSelect: boolean;
}

export interface CodePromotional {
  code: string;
  ammountExchanges: number;
  discountType: string;
  discountRate: number;
}

export interface Establishment2 {
  _id: string;
  address: string;
  name: string;
  photo: string[];
  latitude: number;
  longitude: number;
  city: string;
}
