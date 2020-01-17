import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../utils/httpErrors";

export const checkSearchParams = (
  req: Request,
  res: Response,
  next: NextFunction
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
  next: NextFunction
) => {
  if (!req.params.id) {
    throw new HTTP400Error("Missing :id parameter");
  } else {
    next();
  }
};

export const checkBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  //console.log(Object.keys(req.body).length);
  if (Object.keys(req.body).length === 0) {
    throw new HTTP400Error("Missing body");
  } else {
    next();
  }
};