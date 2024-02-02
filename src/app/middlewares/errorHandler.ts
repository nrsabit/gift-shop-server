/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const status = err?.status ? err.status : 500;
  const message = err?.message ? err.message : 'Something went wrong';

  res.status(status).json({
    success: false,
    message,
    err,
  });
};

export default errorHandler;
