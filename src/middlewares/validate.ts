import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export default function validateSchema(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const validationResult = schema.validate(req.body);
        const { error: err } = validationResult;
        if(!err) { return next(); }
        return next(err);
    }
}