import { Request, Response } from "express"
import * as core from "express-serve-static-core"
import { IUser } from "../modules/users/users.model";

export interface CustomResponse<ResBody = any, Locals extends Record<string, any> = Record<string, any>> extends Response<ResBody, Locals> {
    sendSuccess(code: number, data: any): void;
    sendError(code: number, data: any): void;
}

export interface CustomRequest<
            P = core.ParamsDictionary,
            ResBody = any,
            ReqBody = any,
            ReqQuery = core.Query,
            Locals extends Record<string, any> = Record<string, any>
        > extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
    user?: IUser;
}
