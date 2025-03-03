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
exports.default = routeProtector;
const http_status_codes_1 = require("http-status-codes");
const jwt_1 = __importDefault(require("../utils/jwt"));
const users_service_1 = __importDefault(require("../modules/users/users.service"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
function routeProtector() {
    const func = ((req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.sendError(http_status_codes_1.StatusCodes.UNAUTHORIZED, {
                message: "unauthorized"
            });
        }
        const [bearer, token] = authHeader.split(" ");
        if (bearer !== "Bearer") {
            return res.sendError(http_status_codes_1.StatusCodes.UNAUTHORIZED, {
                message: "malformed authorization header"
            });
        }
        const payload = jwt_1.default.check(token);
        if (!payload) {
            return res.sendError(http_status_codes_1.StatusCodes.UNAUTHORIZED, {
                message: "invalid json web token"
            });
        }
        const id = payload.id;
        const user = yield users_service_1.default.getById(id);
        if (!user) {
            return res.sendError(http_status_codes_1.StatusCodes.NOT_FOUND, {
                message: `user with id ${id} not found`
            });
        }
        req.user = user;
        return next();
    }));
    return (0, asyncHandler_1.default)(func);
}
