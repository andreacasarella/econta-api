// TODO connect to DB and pu queries?
import request from "request-promise";
import dotenv from "dotenv";
import mysql, { Connection } from 'mysql';
import util from 'util';


dotenv.config();

class Database {
    connection: Connection;

    constructor( config:any ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql:string ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, ( err, rows ) => {
                if ( err )
                    return reject( err );
                console.log(`Resolving sql query and found ${rows}`);
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                    console.log('Connection closed');
                resolve();
            } );
        } );
    }
}

//export const getBanks = async (query: string) => {
export const Banks = {
   //const key = process.env.A_KEY;
  //const url = `https://api.opencagedata.com/geocode/v1/geojson?q=${query}&key=${key}&limit=20&no_annotations=1`;
  //const response = await request(url);
  
    async getBanks() : Promise<any> {
    /// Connections
    let config = {
        host: 'localhost',
        port: 8889,
        user: 'root',
        password: 'root',
        database: 'econta'
    };
  
    const database = new Database( config );
    let results:any, someRows:any;
    
    return database.query( 'SELECT * FROM banks' )
        .then( rows => {
            someRows = rows;
            //return database.query( 'SELECT * FROM other_table' );
        } )
        //.then( rows => {
          //  otherRows = rows;
           // return database.close();
        //}, 
        //err => {
          //  return database.close().then( () => { throw err; } )
        //} )
        .then( () => {
            // do something with someRows and otherRows
            console.log(JSON.parse(JSON.stringify(someRows)));
            database.close()
            return JSON.parse(JSON.stringify(someRows))
        })
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
