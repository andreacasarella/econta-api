import { Request, Response } from "express";
import { getBank, getBanksList, createBank } from "./BanksController";
import { checkBody, checkIdParams } from "../../middleware/checks";


export default [
    {
        path: "/api/v1/auth/login",
        method: "get",
        handler: [
            //checkBody,
            async ({ }: Request, res: Response) => {
                //const result = await getBanksList();
                res.status(200).send();
            }
        ]
    },
    {
        path: "/api/v1/auth/logout",
        method: "get",
        handler: [
           // checkBody,
            async ({ }: Request, res: Response) => {
                //const result = await getBanksList();
                res.status(200).send();
            }
        ]
    },
    {
        path: "/api/v1/banks",
        method: "get",
        handler: [
            //checkSearchParams,
            async (req: Request, res: Response) => {
                let result = await getBanksList();
                res.status(200).send(result);
            }
        ]
    },
    {
        path: "/api/v1/banks",
        method: "post",
        handler: [
            checkBody,
            async (req: Request, res: Response) => {
                let result = await createBank(req.body);
                res.status(200).send(result);
            }
        ]
    },
    {
        path: "/api/v1/banks/:id",
        method: "get",
        handler: [
            checkIdParams,
            async (req: Request, res: Response) => {
                const result = await getBank(parseInt(req.params.id));
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
            checkIdParams,
            async (req: Request, res: Response) => {
                res.status(200).send(req.params.id);
            }
        ]
    }
];