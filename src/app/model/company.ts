import {UserResponseAdmin} from './client';

export interface CompanyRegistration {
  email: string;
  password: string;
  companyName: string;
  address: string;
  contactNumber: string;
  nit: string;
}

export interface CompanyRegistration2 {
  email: string;
  companyName: string;
  address: string;
  contactNumber: string;
  nit: string;
}

export interface CompanyResponse {
  address: string;
  companyName: string;
  contactNumber: string;
  establishments: EstablishmentView[];
  events: EventView[];
  nit: string;
  userId: string;
  _id: string;
  customerId?: string;
}

export interface CompanyResponseAdmin {

  address: string;
  companyName: string;
  contactNumber: string;
  nit: string;
  user: UserResponseAdmin;
  _id: string;
}

export interface CompanyResponseAdmin2 {

  companyName: string;
  contactNumber: string;
  nit: string;
  userId: UserResponseAdmin;
  _id: string;
  address;
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
  establishmentId: string;
  companyId: string;
  eventId: string;
  eventName: string;
  city: string;
  start: Date;
  end: Date;
  imageUrl: string;
  status: string;
  interested: number;
}

export interface Establishment {
  name: string;
  address: string;
  img: string;
}

export interface Category {
  category: CategoryType;
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
  establishmentTypes: string[];
  categories: string[];
  photoUrls: string[];
  establishmentName: string;
  description: string;
  logoUrl: string;
  capacity: number;
  location: Location;
}

export interface EstablishmentPerfil {
  averageRating: number;
  followers: number;
  capacity: number;
  categories: string[];
  company: Company;
  description: string;
  establishmentName: string;
  establishmentTypes: EstablishmentTypeId[];
  events: EventView[];
  isActive: boolean;
  location: LocationId;
  logoUrl: string;
  photoUrls: string[];
  reviews: any[];
  _id: string;
}

export interface Company {
  companyId: string;
  companyName: string;
}

export interface CategoryType {
  establishmentCategoryName: string;
  description: string;
}

export interface CategoryTypeId {
  _id: string;
  establishmentCategoryName: string;
  description: string;
}

export interface EstablishmentTypeId {
  _id: string;
  establishmentTypeName: string;
  description: string;
}

export interface EstablishmentType {
  establishmentTypeName: string;
  description: string;
}

export interface LocationId {
  _id: string;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
}


export interface EventRegister {

  eventName: string;
  start: Date;
  end: Date;
  photoUrls: string[];
  categories: string[];
  description: string;
  dressCodes: string[];
  minAge: number;
  location: Location;
  capacity: number;
  tickets: Ticket[];

}

export interface EventPerfil {
  capacity: number;
  categories: string[];
  description: string;
  dressCodes: string[];
  end: Date;
  eventName: string;
  location: LocationId;
  minAge: number;
  photoUrls: string[];
  reviews: any[];
  start: Date;
  status: string;
  tickets: Ticket[];
  _id: string;
  interested: number;
}

export interface Ticket {
  ticketName: string;
  onlinePrice: number;
  onDoorPrice: number;
  isFastLine: boolean;
  totalAvailable: number;
  salesStart: Date;
  salesEnd: Date;
  description: string;
  status: string;
  maxPerPurchase: number;
  minPerPurchase: number;
  isTransferable: boolean;
  otherInfo?: string;
  promotionalCodes: CodePromotional[];

}


export interface Status {
  name: string;
  isSelect: boolean;
}

export interface CodePromotional {
  codeString: string;
  totalValidExchanges: number;
  remainingValidExchanges: number;
  discountType: string;
  discountRate: number;
}


export interface EstablishmentView {
  companyId: string;
  followers: number;
  establishmentId: string;
  establishmentName: string;
  location: LocationId;
  imageUrl: string;
  status: boolean;
}

export interface EstablishmentViewId {
  _id: string;
  establishmentId: string;
  establishmentName: string;
  location: LocationId;
  imageUrl: string;
  status: boolean;
}

export interface RemoveEvent {
  idCompany: string;
  idEstablishment: string;
  idEvent: string;
  name: string;
}

export interface RemoveEstablishment {
  idCompany: string;
  idEstablishment: string;
  name: string;
}

export interface Subscription {
  select: boolean;
  discount: number;

  planId: string;
  planName: string;
  price: number;
  intervalCount: number;
  intervalUnit: string;
  trialDays: number;
  taxBase: number;
  tax: number;
}

export interface Plan {
  description: string;
  price: number;
  id: string;
  currency: string;
}

export interface PayMethod {
  desc: string;
  select: boolean;
}

export interface Customer {

  firstName: string;
  lastName: string;
  email: string;
  city: string;
  address: string;
  phone?: string;
  cellPhone: string;
  cardNumber: string;
  cardExpYear: string;
  cardExpMonth: string;
  cardCVC: string;
  isDefaultCard: boolean;
  companyId: string;

}

export interface SubscriptionActual{
  orderReference: string;
  orderStatus: string;
  orderDate: Date;
  description: string;
  periodStart: Date;
  periodEnd: Date;
  paymentType: string;
  paymentMethod: string;
  intervalCount: number;
  interval: string;
  price: number;
  tax: number;
  discount: number;
}
