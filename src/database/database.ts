import mysql, { Connection } from "mysql";

export class Database {
    public connection: Connection;

    constructor(config: any) {
        this.connection = mysql.createConnection(config);
    }
    public query(sql: string) {
        return new Promise<any>((resolve, reject) => {
            this.connection.query(sql, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }
    public close() {
        return new Promise<any>((resolve, reject) => {
            this.connection.end((err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
}
