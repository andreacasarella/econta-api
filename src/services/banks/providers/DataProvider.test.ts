import request from "request-promise";
import * as Provider from "./DataProvider";

jest.mock("request-promise");

describe("DataProvider", () => {
  test("get the list of banks", async () => {
    (request as any).mockImplementation(() => mock_services_banks);
    const result = await Provider.Banks.getBanks();
    expect(result.length).toEqual(2);
  });

  /*
  test("an invalid non-json response", async () => {
    (request as any).mockImplementation(() => "Service Unavailable.");
    await expect(Provider.getBanks()).rejects.toThrow(SyntaxError);
  });
  */

});