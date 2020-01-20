import { Banks } from "./providers/DataProvider";

export interface IBank {
  bankId: number;
  name: string | null;
  swift?: string | number;
  clearing?: string;
  address?: string;
  postalCode?: string;
  locality?: string;
  country?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const getBanksList = async (swift: string) => {
  return Banks.getBanks(swift);
};

export const createBank = (bank: IBank) => {
  return Banks.createBank(bank);
};

export const getBank = (bankId: number) => {
  return Banks.getBank(bankId);
};

export const deleteBank = (bankId: number) => {
  return Banks.deleteBank(bankId);
};

export const getError = () => {
  return Banks.getError();
};

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
