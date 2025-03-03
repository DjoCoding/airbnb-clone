import { NextFunction, RequestHandler } from "express";
import { CustomRequest, CustomResponse } from "../types/custom";
import { StatusCodes } from "http-status-codes";
import multer from "multer"

// const storage = multer.diskStorage({
//     destination: "tmp/uploads",
//     filename: (req, file, cb) => {
//         const name = file.originalname;
//         const ext = name.split(".")[-1];
//         const path = `${name}-${Date.now()}.${ext}`;
//         return cb(null, path);
//     }
// })


const storage = multer.memoryStorage();
const multerUploadFiles = multer({ storage }).array("pictures");
// const fileUploadHandler = multerUploadFiles;

const fileUploadHandler = (async(req: CustomRequest, res: CustomResponse, next: NextFunction) => {
    return await multerUploadFiles(req, res, (err) => {
        if(!err) return next();

        if(err instanceof multer.MulterError) {
            switch(err.code) {
                case "LIMIT_UNEXPECTED_FILE": 
                    return res.sendError(StatusCodes.BAD_REQUEST, {
                        message: "maximum number of files uploaded reached."
                    })
            }
        }

        return res.sendError(StatusCodes.INTERNAL_SERVER_ERROR, {
            message: "failed to upload files"
        });
    });
}) as RequestHandler;


export default fileUploadHandler;