import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import requestHandler from '../utils/requestHandler';

const requestValidator = (schema: AnyZodObject) => {
  return requestHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      await schema.parseAsync({
        body: req.body,
      });
      next();
    },
  );
};

export default requestValidator;
