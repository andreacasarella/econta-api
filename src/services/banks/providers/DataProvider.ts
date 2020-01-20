import dotenv from "dotenv";
import { Database } from "../../../database/database";
import { IMysqlObjectDeleteResult } from "../../../database/mysqlObjectDeleteResult";
import { environment } from "../../../environment";
import { IBank } from "../BanksController";

dotenv.config();

export const Banks = {

    async getBanks(swift?: string): Promise<IBank[]> {
        const database = new Database(environment.dbConfig);
        let query = `SELECT * FROM banks`;
        if (swift) {
            query = query.concat(` WHERE swift='${swift}'`);
        }
        return database.query(query)
            .then((rows) => {
                return JSON.parse(JSON.stringify(rows));
            })
            .catch((error) => { throw error; })
            .finally(() => database.close());
    },

    async getBank(id: number): Promise<IBank> {
        const database = new Database(environment.dbConfig);
        return database.query(`SELECT * FROM banks WHERE bankId=${id}`)
            .then((rows) => {
                if (rows.length > 0) { return JSON.parse(JSON.stringify(rows[0])); }
                return null;
            }).catch((error) => { throw error; })
            .finally(() => database.close());
    },

    async createBank(bank: IBank): Promise<IBank> {
        const database = new Database(environment.dbConfig);
        let result: any;
        return database.query(`INSERT INTO banks (name,swift,clearing,address,postalCode,locality,country) VALUES ('${bank.name}','${bank.swift}','${bank.clearing}','${bank.address}','${bank.postalCode}','${bank.locality}','${bank.country}');`)
            .then((rows) => {
                result = rows;
                return database.query(`SELECT * FROM banks WHERE bankId=${result.insertId}`);
            })
            .then((banks) => JSON.parse(JSON.stringify(banks[0])))
            .catch((error) => { throw error; })
            .finally(() => database.close());
    },

    async deleteBank(id: number): Promise<IMysqlObjectDeleteResult> {
        const database = new Database(environment.dbConfig);
        return database.query(`DELETE FROM banks WHERE bankId=${id}`)
            .then((result) => {
                return JSON.parse(JSON.stringify(result));
            })
            .catch((error) => { throw error; })
            .finally(() => database.close());
    },

    async getError(): Promise<IMysqlObjectDeleteResult> {
        const database = new Database(environment.dbConfig);
        return database.query(`TEST INTERNAL SERVER ERROR QUERY`)
            .catch((error) => { throw error; })
            .finally(() => database.close());
    },
};
