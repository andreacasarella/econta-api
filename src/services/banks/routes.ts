import { Request, Response } from "express";

import { getBanksList } from "./BanksController";

export default [
  {
    path: "/api/v1/banks",
    method: "get",
    handler: [
      async ({}: Request, res: Response) => {
        const result = await getBanksList();
        res.status(200).send(result);
      }
    ]
  }
];