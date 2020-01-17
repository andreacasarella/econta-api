import request from "request-promise";
import * as Provider from "./DataProvider";

describe("DataProvider", () => {
  test("get the list of banks", async () => {
    let result = await Provider.Banks.getBanks();
    expect(result.length).toBeGreaterThanOrEqual(0);
  });
  test("get bank id 1", async () => {
    let result = await Provider.Banks.getBank(1);
    expect(result.bankId).toEqual(1);
  });
});