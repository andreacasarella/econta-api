import { IMsqlError, MsqlErrorCode } from "../../../database/mysqlError";
import { IBank } from "../BanksController";
import * as Provider from "./DataProvider";

describe("DataProvider", () => {
  const uuid: string = new Date().getTime().toString();
  let createdBankId: number;

  test("getError using Promise.catch", () => {
    expect.assertions(1);
    return Provider.Banks.getError().catch((error) => expect(error).not.toBeNull());
  });

  test("getError using async/await", async () => {
    expect.assertions(1);
    try {
      await Provider.Banks.getError();
    } catch (error) {
      expect(error).not.toBeNull();
    }
  });

  test("getBanks", async () => {
    const result = await Provider.Banks.getBanks();
    expect(result.length).toBeGreaterThanOrEqual(0);
  });

  test("getBanks error", async () => {
    try {
      await Provider.Banks.getBanks("ci'exp'ao");
    } catch (error) {
      const mysqlError = JSON.parse(JSON.stringify(error)) as IMsqlError;
      expect(mysqlError.code).toEqual(MsqlErrorCode.ER_PARSE_ERROR);
    }
  });

  test("getBank id=1", async () => {
    const result = await Provider.Banks.getBank(1);
    expect(result.bankId).toEqual(1);
  });

  test("getBank id=NaN error", async () => {
    try {
      await Provider.Banks.getBank(NaN);
    } catch (error) {
      const mysqlError = JSON.parse(JSON.stringify(error)) as IMsqlError;
      expect(mysqlError.code).toEqual(MsqlErrorCode.ER_BAD_FIELD_ERROR);
    }
  });

  test("createBank", async () => {
    const testBank: IBank = {
      bankId: NaN,
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

  test("createBank error", async () => {
    const testBank: IBank = {
      bankId: NaN,
      country: undefined,
      locality: undefined,
      name: "N'a'a*m$e",
      swift: undefined,
    };
    try {
      await Provider.Banks.createBank(testBank);
    } catch (error) {
      const mysqlError = JSON.parse(JSON.stringify(error)) as IMsqlError;
      expect(mysqlError.code).toEqual(MsqlErrorCode.ER_PARSE_ERROR);
    }

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

  test("deleteBank id NaN", async () => {
    try {
      await Provider.Banks.deleteBank(NaN);
    } catch (error) {
      const mysqlError = JSON.parse(JSON.stringify(error)) as IMsqlError;
      expect(mysqlError.code).toEqual(MsqlErrorCode.ER_BAD_FIELD_ERROR);
    }
  });

  test(`getBanks?swift=${uuid} and deleteBank`, async () => {
    const result = await Provider.Banks.getBanks(uuid);
    const result1 = await Provider.Banks.deleteBank(result[0].bankId);
    expect(result1.affectedRows).toEqual(1);
  });

});
