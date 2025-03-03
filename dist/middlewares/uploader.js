"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: "tmp/uploads",
    filename: (_, file, cb) => {
        const ext = file.path.split(".")[-1];
        const path = `${file.originalname}-${Date.now()}.${ext}`;
        return cb(null, path);
    }
});
const multerUploadFiles = (0, multer_1.default)({ storage }).array("pictures");
const fileUploadHandler = ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield multerUploadFiles(req, res, (err) => {
        if (!err)
            return next();
        if (err instanceof multer_1.default.MulterError) {
            switch (err.code) {
                case "LIMIT_UNEXPECTED_FILE":
                    return res.sendError(http_status_codes_1.StatusCodes.BAD_REQUEST, {
                        message: "maximum number of files uploaded reached."
                    });
            }
        }
        return res.sendError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, {
            message: "failed to upload files"
        });
    });
}));
exports.default = fileUploadHandler;
