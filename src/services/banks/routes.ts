import { Request, Response } from "express";
import { checkBody, checkIdParams } from "../../middleware/checks";
import { createBank, deleteBank, getBank, getBanksList, getError } from "./BanksController";

export default [
    {
        path: "/api/v1/banks",
        // tslint:disable-next-line: object-literal-sort-keys
        method: "get",
        handler: [
            async (req: Request, res: Response) => {
                const result = await getBanksList(req.query.swift);
                res.status(200).send(result);
            },
        ],
    },
    {
        path: "/api/v1/banks",
        // tslint:disable-next-line: object-literal-sort-keys
        method: "post",
        handler: [
            checkBody,
            async (req: Request, res: Response) => {
                const result = await createBank(req.body);
                res.status(201).send(result);
            },
        ],
    },
    {
        path: "/api/v1/banks/:id",
        // tslint:disable-next-line: object-literal-sort-keys
        method: "get",
        handler: [
            checkIdParams,
            async (req: Request, res: Response) => {
                // tslint:disable-next-line: radix
                const result = await getBank(parseInt(req.params.id));
                if (result) {
                    res.status(200).send(result);
                } else {
                    res.status(404).send();
                }
            },
        ],
    },
    {
        path: "/api/v1/banks/:id",
        // tslint:disable-next-line: object-literal-sort-keys
        method: "delete",
        handler: [
            checkIdParams,
            async (req: Request, res: Response) => {
                // tslint:disable-next-line: radix
                const result = await deleteBank(parseInt(req.params.id));
                if (result.affectedRows > 0) {
                    res.status(200).send();
                } else {
                    res.status(404).send();
                }
            },
        ],
    },
    {
        path: "/api/v1/error",
        // tslint:disable-next-line: object-literal-sort-keys
        method: "get",
        handler: [
            async (req: Request, res: Response) => {
                const result = await getError();
            },
        ],
    },
];
