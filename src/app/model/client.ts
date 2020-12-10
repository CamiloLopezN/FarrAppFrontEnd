export class ClientRegistration {
  nameC: string;
  lastName: string;
  birthdate: string;
  gender: string;
  e_mail: string;
  password: string;
  passwordCon: string;
}

export interface ClientLogin {
  e_mail: string;
  password: string;
}
