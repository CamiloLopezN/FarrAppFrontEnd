export interface CompanyRegistration {
  e_mail: string;
  password: string;
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
