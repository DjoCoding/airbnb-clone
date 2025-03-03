import { Request, NextFunction, RequestHandler } from "express";
import { CustomResponse } from "../types/custom";

export default function custom() {
    return ((_: Request, res: CustomResponse, next: NextFunction) => {
        res.sendSuccess = (code, data) => {
            if(res.headersSent) { 
                return;
            }

            res
            .status(code)
            .json({
                status: "success",
                data
            })
            .end();
        }

        res.sendError = (code, data) => {
            if(res.headersSent) { 
                return;
            }
            
            res
            .status(code)
            .json({
                status: "error",
                data
            })
            .end();
      }

      next();
    }) as RequestHandler;
}