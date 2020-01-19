import { IBank } from "../BanksController";
import * as Provider from "./DataProvider";

describe("DataProvider", () => {
  const uuid: string = new Date().getTime().toString();
  let createdBankId: number;

  test("getBanks", async () => {
    const result = await Provider.Banks.getBanks();
    expect(result.length).toBeGreaterThanOrEqual(0);
  });

  test("getBank", async () => {
    const result = await Provider.Banks.getBank(1);
    expect(result.bankId).toEqual(1);
  });

  test("createBank", async () => {
    const testBank: IBank = {
      bankId: -1,
      country: "US",
      locality: "Locality",
      name: "TEST",
      postalCode: "0000",
      swift: uuid,
    };
    const result = await Provider.Banks.createBank(testBank);
    expect(result.name).toEqual("TEST");
    expect(result.postalCode).toEqual("0000");
    expect(result.locality).toEqual("Locality");
    expect(result.country).toEqual("US");
    expect(result.swift).toEqual(uuid);
  });

  test(`getBanks?swift=${uuid}`, async () => {
    const result = await Provider.Banks.getBanks(uuid);
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result[0].swift).toEqual(uuid);
    createdBankId = result[0].bankId;
  });

  test("deleteBank", async () => {
    const result = await Provider.Banks.deleteBank(0);
    expect(result.affectedRows).toEqual(0);
  });

  test(`getBanks?swift=${uuid} and deleteBank`, async () => {
    const result = await Provider.Banks.getBanks(uuid);
    const result1 = await Provider.Banks.deleteBank(result[0].bankId);
    expect(result1.affectedRows).toEqual(1);
  });

});
