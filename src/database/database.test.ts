import { environment } from "../environment";
import { Database } from "./database";
import { IMsqlError, MsqlErrorCode } from "./mysqlError";

describe("Database", () => {
    let db: Database;

    beforeEach(() => {
        db = new Database(environment.dbConfig);
    });

    afterEach(() => {
        // tslint:disable-next-line: no-empty
        db.close().catch((err) => { });
    });

    test("Database connetion configs", async () => {
        expect(db.connection.config.host).toEqual(environment.dbConfig.host);
        expect(db.connection.config.port).toEqual(environment.dbConfig.port);
        expect(db.connection.config.user).toEqual(environment.dbConfig.user);
        expect(db.connection.config.password).toEqual(environment.dbConfig.password);
        expect(db.connection.config.database).toEqual(environment.dbConfig.database);
    });

    test("Database db.query", async () => {
        const query = `show status like 'Connections%'`;
        const result = await db.query(query) as object[];
        expect(result.length).toBeGreaterThanOrEqual(0);
    });

    test("Database db.query error", async () => {
        const query = `uella status like 'Connections%'`;
        const result = await db.query(query).catch((err) => JSON.stringify(err));
        const mysqlError = JSON.parse(result) as IMsqlError;
        expect(mysqlError.code).toEqual(MsqlErrorCode.ER_PARSE_ERROR);
    });

    test("Database db.close error", async () => {
        // tslint:disable-next-line: no-empty
        db.close().catch((err) => { });
        const result = await db.close().catch((err) => JSON.stringify(err));
        const mysqlError = JSON.parse(result) as IMsqlError;
        expect(mysqlError.code).toEqual(MsqlErrorCode.PROTOCOL_ENQUEUE_AFTER_QUIT);
    });

});
