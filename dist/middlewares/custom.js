"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = custom;
function custom() {
    return ((_, res, next) => {
        res.sendSuccess = (code, data) => {
            res
                .status(code)
                .json({
                status: "success",
                data
            })
                .end();
        };
        res.sendError = (code, data) => {
            res
                .status(code)
                .json({
                status: "error",
                data
            })
                .end();
        };
        next();
    });
}
