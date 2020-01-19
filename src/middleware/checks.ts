import { NextFunction, Request, Response } from "express";
import { HTTP400Error } from "../utils/http400Error";

export const checkSearchParams = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.query.q) {
    throw new HTTP400Error("Missing q parameter");
  } else {
    next();
  }
};

export const checkIdParams = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (isNaN(+req.params.id)) {
    throw new HTTP400Error("Wrong :id format");
  } else {
    next();
  }
};

export const checkBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (Object.keys(req.body).length === 0) {
    throw new HTTP400Error("Missing body");
  } else {
    next();
  }
};
