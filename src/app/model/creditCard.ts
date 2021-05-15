export interface CreditCard {
  created: string;
  default: boolean;
  franchise: string;
  mask: string;
  token: string;
}

export interface SendSubscribe {
  planId: string;
  customerId: string;
  cardToken: string;
  docType: string;
  docNumber: string;
}

export interface SendDefaultCard {
  cardToken: string;
  cardFranchise: string;
  cardMask: string;
}

export interface SendCard {
  cardNumber: string;
  cardExpYear: string;
  cardExpMonth: string;
  cardCVC: string;
}
