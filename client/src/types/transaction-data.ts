export interface Transaction {
  product: {
    verteItemId: string;
    pictures: string[];
    productName: string;
    shortDescription: string;
    title: string;
  };
  app: {
    publisher_id: string;
    game_id: string;
    placement_id: string;
    bundle_id: string;
    appv: string;
  };
  price: number;
  shippingRateComputationMethodSystemName: string;
  shippingOption: string;
  CreditCardName: string;
  creditCardNumber: string;
  creditCardExpireYear: number;
  creditCardExpireMonth: number;
  creditCardCvv2: string;
}

export interface TransactionUser {
  email: string;
  phoneNumber: number;
  firstName: string;
  lastName: string;
  countryId: string;
  stateProvinceId: string;
  city: string;
  address: string;
  zipPostalCode: string;
}

export interface TransactionData {
  transactions: Transaction[];
  user: TransactionUser;
}
