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
exports.AuthController = void 0;
const users_service_1 = __importDefault(require("../users/users.service"));
const http_status_codes_1 = require("http-status-codes");
const user_dto_1 = __importDefault(require("../users/dtos/user.dto"));
const hash_1 = require("../../utils/hash");
const jwt_1 = __importDefault(require("../../utils/jwt"));
class AuthController {
    constructor(users) {
        this.users = users;
        this.register = ((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body: createUserDto } = req;
            const isfound = yield this.users.getByEmail(createUserDto.email);
            if (isfound) {
                return res.sendError(http_status_codes_1.StatusCodes.CONFLICT, {
                    message: "email already in use"
                });
            }
            const user = yield this.users.create(createUserDto);
            if (!user) {
                return res.sendError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, {
                    message: "failed to create the user"
                });
            }
            return res.sendSuccess(http_status_codes_1.StatusCodes.CREATED, {
                user: (0, user_dto_1.default)(user)
            });
        }));
        this.login = ((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body: loginUserDto } = req;
            const user = yield this.users.getByEmail(loginUserDto.email);
            if (!user) {
                return res.sendError(http_status_codes_1.StatusCodes.NOT_FOUND, {
                    message: "email or password incorrect"
                });
            }
            const hashedPassword = user.password;
            if (!(yield (0, hash_1.compare)(loginUserDto.password, hashedPassword))) {
                return res.sendError(http_status_codes_1.StatusCodes.NOT_FOUND, {
                    message: "email or password incorrect"
                });
            }
            const token = jwt_1.default.generate((0, user_dto_1.default)(user));
            return res.sendSuccess(http_status_codes_1.StatusCodes.OK, {
                token,
                user: (0, user_dto_1.default)(user)
            });
        }));
        this.fetch = ((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            return res.sendSuccess(http_status_codes_1.StatusCodes.OK, {
                user: (0, user_dto_1.default)(user)
            });
        }));
    }
}
exports.AuthController = AuthController;
const authController = new AuthController(users_service_1.default);
exports.default = authController;
