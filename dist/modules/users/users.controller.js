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
exports.UsersController = void 0;
const http_status_codes_1 = require("http-status-codes");
const users_service_1 = __importDefault(require("./users.service"));
const places_service_1 = __importDefault(require("../places/places.service"));
const user_dto_1 = __importDefault(require("./dtos/user.dto"));
const place_dto_1 = require("../places/dtos/place.dto");
class UsersController {
    constructor(users, places) {
        this.users = users;
        this.places = places;
        this.updatePartial = ((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.user) {
                return res.sendError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, {
                    message: "failed to fetch the user"
                });
            }
            const { field, value } = req.body;
            const { _id: id } = req.user;
            if (field === "email") {
                const isfound = yield this.users.getByEmail(value);
                if (isfound) {
                    return res.sendError(http_status_codes_1.StatusCodes.CONFLICT, {
                        message: `email ${value} already in use`
                    });
                }
            }
            const user = yield this.users.update(id, {
                [field]: value
            });
            if (!user) {
                return res.sendError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, {
                    message: "failed to update the user"
                });
            }
            return res.sendSuccess(http_status_codes_1.StatusCodes.OK, {
                user: (0, user_dto_1.default)(user)
            });
        }));
        this.getProfile = ((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { userID } = req.params;
            const user = yield this.users.getById(userID);
            if (!user) {
                return res.sendError(http_status_codes_1.StatusCodes.NOT_FOUND, {
                    message: `user ${userID} not found`
                });
            }
            return res.sendSuccess(http_status_codes_1.StatusCodes.OK, {
                user: (0, user_dto_1.default)(user)
            });
        }));
        this.getPlaces = ((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { userID } = req.params;
            const places = yield this.places.getOfUser(userID);
            if (!places) {
                return res.sendError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, {
                    message: `failed to fetch places of user ${userID}`
                });
            }
            return res.sendSuccess(http_status_codes_1.StatusCodes.OK, {
                places: (0, place_dto_1.transformPlaces)(places)
            });
        }));
    }
}
exports.UsersController = UsersController;
const usersController = new UsersController(users_service_1.default, places_service_1.default);
exports.default = usersController;
