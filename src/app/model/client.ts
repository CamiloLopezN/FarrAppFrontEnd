export class ClientRegistration {
  firstName: string;
  lastName: string;
  birthdate: string;
  gender: string;
  email: string;
  password: string;
}

export interface ClientLogin {
  email: string;
  password: string;
}

export interface ClientAccount {
  email: string;
  password: string;
}

export interface ClientResponse {

  firstName: string;
  lastName: string;
  birthdate: string | Date;
  gender: string;

}

export interface ClientResponseAdmin {
  _id: string;
  name: string;
  lastname: string;
  birthdate: string;
  gender: string;
  email: string;
}

export interface ClientResponseAdmin2 {
  birthdate: Date;
  firstName: string;
  gender: string;
  lastName: string;
  userId: UserResponseAdmin;
  _id: string;
}

export interface UserResponseAdmin {
  email: string;
  hasReqDeactivation: boolean;
  isActive: boolean;
  isVerified: boolean;
  _id: string;
}

export class ClientRegistration2 {
  firstName: string;
  lastName: string;
  birthdate: string;
  gender: string;
  email: string;
}

export class ClientAdmin {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class ClientsInterest {
  interests: string[];
  follows: string[];
}
