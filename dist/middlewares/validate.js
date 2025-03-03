"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateSchema;
function validateSchema(schema) {
    return (req, res, next) => {
        const validationResult = schema.validate(req.body);
        const { error: err } = validationResult;
        if (!err) {
            return next();
        }
        return next(err);
    };
}
