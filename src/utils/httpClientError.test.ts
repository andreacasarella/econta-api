import { HTTP400Error } from "./http400Error";
import { HTTP404Error } from "./http404Error";

describe("HTTPClientError", () => {

    test("HTTP400Error", async () => {
        const result = new HTTP400Error();
        expect(result.message).toEqual("Bad Request");
        expect(result.name).toEqual(result.constructor.name);
        expect(result.statusCode).toEqual(400);
    });

    test("HTTP400Error with message:string", async () => {
        const message = "HTTP400Error with message";
        const result = new HTTP400Error(message);
        expect(result.message).toEqual(message);
    });

    test("HTTP400Error with message:object", async () => {
        const messageObj = { message: "HTTP400Error with message" };
        const result = new HTTP400Error(messageObj);
        expect(JSON.parse(result.message)).toEqual(messageObj);
    });

    test("HTTP404Error", async () => {
        const result = new HTTP404Error();
        expect(result.statusCode).toEqual(404);
        expect(result.message).toEqual("Not found");
        expect(result.name).toEqual("HTTP404Error");
    });

    test("HTTP404Error with message", async () => {
        const result = new HTTP404Error("HTTP404Error with message");
        expect(result.statusCode).toEqual(404);
        expect(result.message).toEqual("HTTP404Error with message");
        expect(result.name).toEqual("HTTP404Error");
    });

});
