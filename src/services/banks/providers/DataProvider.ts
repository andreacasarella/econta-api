// TODO connect to DB and pu queries?
import request from "request-promise";
import dotenv from "dotenv";

dotenv.config();

//export const getBanks = async (query: string) => {
export const getBanks = () => {
   const key = process.env.A_KEY;
  //const url = `https://api.opencagedata.com/geocode/v1/geojson?q=${query}&key=${key}&limit=20&no_annotations=1`;
  //const response = await request(url);
  
  let data = [{
    "bankId": 1,
    "name": "Raiffeisen",
    "logo": "",
    "swift": "82b92c",
    "clearing": "12345",
    "address": "test",
    "postalCode":"1234",
    "locality": "Lugano",
    "country": "Hello World",
    "createdAt": "Hello World",
    "updatedAt": "Hello World"
  },
  {
    "bankId": 2,
    "name": "UBS",
    "logo": "",
    "swift": "64532",
    "clearing": "53421",
    "address": "tet2",
    "postalCode":"1234",
    "locality": "Lugano",
    "country": "Svizzera",
    "createdAt": "Hello World",
    "updatedAt": "Hello World"
  }]
  //return JSON.parse(response);
  return data;
};