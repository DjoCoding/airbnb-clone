import { RequestHandler } from "express";

export default function asyncHandler(handleFunc: RequestHandler): RequestHandler {
    return async (req, res, next) => {
        try {
            await handleFunc(req, res, next);
            return next();
        } catch(err) {
            return next(err);
        }
    }
}