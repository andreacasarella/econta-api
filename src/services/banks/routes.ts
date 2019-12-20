import { Request, Response } from "express";
import { getBanksList } from "./BanksController";
import { checkSearchParams } from "../../middleware/checks";


export default [
    {
        path: "/api/v1/banks",
        method: "get",
        handler: [
            //checkSearchParams,
            async ({}: Request, res: Response) => {
            const result = await getBanksList();
            res.status(200).send(result);
            }
        ]
    }
];