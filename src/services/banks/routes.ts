import { Request, Response } from "express";
import { getBank, getBanksList, createBank } from "./BanksController";
import { checkSearchParams } from "../../middleware/checks";


export default [
    {
        path: "/api/v1/banks",
        method: "get",
        handler: [
            //checkSearchParams,
            async ({ }: Request, res: Response) => {
                const result = await getBanksList();
                res.status(200).send(result);
            }
        ]
    },
    {
        path: "/api/v1/banks",
        method: "post",
        handler: [
            //checkSearchParams,
            async (req: Request, res: Response) => {
                const result = await createBank(req.body);
                res.status(200).send(result);
            }
        ]
    },
    {
        path: "/api/v1/banks/:id",
        method: "get",
        handler: [
            //checkSearchParams,
            async (req: Request, res: Response) => {
                const result = await getBank(parseInt(req.params.id));
                console.log(result);
                if (result) {
                    res.status(200).send(result);
                } else {
                    res.status(404).send();
                }
            }
        ]
    },
    {
        path: "/api/v1/banks/:id",
        method: "delete",
        handler: [
            //checkSearchParams,
            async (req: Request, res: Response) => {
                //const result = await getBanksList();
                res.status(200).send(req.params.id);
            }
        ]
    }
];