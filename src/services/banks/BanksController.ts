import { Banks } from "./providers/DataProvider";

export interface Bank {
    "bankId":number,
    "name":string,
    "swift":string,
    "clearing":string,
    "address":string,
    "postalCode":string,
    "locality":string,
    "country":string,
    "createdAt":string,
    "updatedAt":string
}

export const getBanksList = () => {
    return Banks.getBanks();
}

export const createBank = (bank: Bank) => {
    return Banks.createBank(bank);
}

export const getBank = (bankId: number) => {
  return Banks.getBank(bankId);
}


/*
export const getPlacesByName = async (q: string) => {
  if (q.length < 3) {
    return {
      type: "FeatureCollection",
      features: []
    };
  }

  return await getBanks(q);
};
*/
