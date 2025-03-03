import { NextFunction, RequestHandler } from "express";
import { CustomResponse, CustomRequest } from "../types/custom";
import { StatusCodes } from "http-status-codes";
import jwt from "../utils/jwt";
import usersService from "../modules/users/users.service";
import asyncHandler from "../utils/asyncHandler";

export default function routeProtector() {
    const func = (async (req: CustomRequest, res: CustomResponse, next: NextFunction) => {
        const authHeader = req.headers["authorization"];
        if(!authHeader) {
            return res.sendError(StatusCodes.UNAUTHORIZED, {
                message: "unauthorized"
            });
        }

        const [bearer, token] = authHeader.split(" ");
        if(bearer !== "Bearer") { 
            return res.sendError(StatusCodes.UNAUTHORIZED, {
                message: "malformed authorization header"
            });
        }

        const payload = jwt.check(token);
        if(!payload) {
            return res.sendError(StatusCodes.UNAUTHORIZED, {
                message: "invalid json web token"
            });
        }

        const id = payload.id;
        const user = await usersService.getById(id);
        if(!user) {
            return res.sendError(StatusCodes.NOT_FOUND, {
                message: `user with id ${id} not found`
            });
        }

        req.user = user;
        return next();
    }) as RequestHandler;

    return asyncHandler(func);
}