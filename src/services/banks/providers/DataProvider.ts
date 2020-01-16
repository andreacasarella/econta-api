// TODO connect to DB and pu queries?
import request from "request-promise";
import dotenv from "dotenv";
import mysql, { Connection } from 'mysql';
import util from 'util';
import { createBank, Bank } from "../BanksController";
import { environment } from "../../../environment";


dotenv.config();

class Database {
    connection: Connection;

    constructor(config: any) {
        this.connection = mysql.createConnection(config);
    }
    query(sql: string) {
        return new Promise<any[]>((resolve, reject) => {
            this.connection.query(sql, (err, rows) => {
                if (err)
                    return reject(err);
                //console.log(`Resolving sql query and found ${rows}`);
                resolve(rows);
            });
        });
    }
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                console.log('Connection closed');
                resolve();
            });
        });
    }
}

//export const getBanks = async (query: string) => {
export const Banks = {

    async getBanks(): Promise<Bank[]> {
        const database = new Database(environment.dbConfig);
        return database.query('SELECT * FROM banks')
            .then(rows => {
                console.log('Called getBanks()');
                database.close()
                return JSON.parse(JSON.stringify(rows))
            });
    },

    async getBank(id: number): Promise<Bank> {
        const database = new Database(environment.dbConfig);
        return database.query(`SELECT * FROM banks WHERE bankId=${id}`)
            .then(rows => {
                console.log(`Called getBank(${id})`);
                database.close()
                if(rows.length > 0) return JSON.parse(JSON.stringify(rows[0]));
                return null
            },
            error => {
                return database.close().then(() => { throw error; })
            });
    },

    async createBank(bank: Bank): Promise<Bank> {

        const database = new Database(environment.dbConfig);
        let otherRows: any, someRows: any;

        return database.query(`INSERT INTO banks (name,swift,clearing,address,postalCode,locality,country) 
        VALUES ('${bank.name}','${bank.swift}','${bank.clearing}','${bank.address}','${bank.postalCode}','${bank.locality}','${bank.country}');`)
            .then(rows => {
                someRows = rows;
                return database.query(`SELECT * FROM banks WHERE bankId=${someRows.insertId}`);
            })
            .then(otherRows => {
                // do something with someRows and otherRows
                //console.log(JSON.parse(JSON.stringify(otherRows)));
                database.close()
                return JSON.parse(JSON.stringify(otherRows))
            },
                err => {
                    return database.close().then(() => { throw err; })
                });
        //return results;
    }


    //const data = await connection.query(sql);

    /* => {
        if (err) throw err;
        console.log(data);
    });
    */
    // connection.end(err => {
    //});

    // return data;
    //return JSON.parse(response);
    //return data;
};
