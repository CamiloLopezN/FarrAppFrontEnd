export interface Client {
  name: string;
  lastname: string;
  birthdate: string;
  gender: string;
  e_mail: string;
  password: string;
}

export interface ClientLogin {
  e_mail: string;
  password: string;
}

export interface ClientResponse {
  name: string;
  lastname: string;
  birthdate: string;
  gender: string;
}

export interface ClientAccount{
  e_mail: string;
  password: string;
}
