import { ErrorRequestHandler, NextFunction, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomResponse } from "../types/custom";
import Joi from "joi";


export default function error() {
    return ((err: any, _: Request, res: CustomResponse, __: NextFunction) => {
        if(err instanceof Joi.ValidationError) {
            return res.sendError(StatusCodes.BAD_REQUEST, {
                err
            });
        }

        return res.sendError(StatusCodes.INTERNAL_SERVER_ERROR, {
            message: "Internal server error"
        });
    }) as ErrorRequestHandler;
}