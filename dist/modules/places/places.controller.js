"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.PlacesController = void 0;
const places_service_1 = __importDefault(require("./places.service"));
const http_status_codes_1 = require("http-status-codes");
const cloudinary_1 = require("../../config/cloudinary");
const place_dto_1 = __importStar(require("./dtos/place.dto"));
class PlacesController {
    constructor(places) {
        this.places = places;
        this.getAll = ((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const places = yield this.places.get();
            if (!places) {
                return res.sendError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, {
                    message: `failed to fetch places`
                });
            }
            return res.sendSuccess(http_status_codes_1.StatusCodes.OK, {
                places: (0, place_dto_1.transformPlaces)(places)
            });
        }));
        this.getByID = ((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { placeID } = req.params;
            const place = yield this.places.getByID(placeID);
            if (!place) {
                return res.sendError(http_status_codes_1.StatusCodes.NOT_FOUND, {
                    message: `no place of id ${placeID} found`
                });
            }
            return res.sendSuccess(http_status_codes_1.StatusCodes.OK, {
                place: (0, place_dto_1.default)(place)
            });
        }));
        this.create = ((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            return res.sendStatus(200);
            const { body: createPlaceDto } = req;
            const { title } = createPlaceDto;
            const userID = req.user._id;
            const isfound = yield this.places.getByTitleOfUser(userID, title);
            if (isfound) {
                return res.sendError(http_status_codes_1.StatusCodes.CONFLICT, {
                    message: `title already used`
                });
            }
            const files = req.files;
            const promises = files.map((file) => {
                return new Promise((res, rej) => {
                    cloudinary_1.uploader.upload_stream({ folder: "uploads" }, (err, result) => {
                        if (err)
                            return rej(err);
                        if (!result)
                            return rej(new Error("failed to upload the file"));
                        return res(result === null || result === void 0 ? void 0 : result.secure_url);
                    }).end(file.buffer);
                });
            });
            const pictures = yield Promise.all(promises);
            const place = yield this.places.create(userID, Object.assign(Object.assign({}, createPlaceDto), { pictures }));
            if (!place) {
                return res.sendError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, {
                    message: `failed to create place`
                });
            }
            return res.sendSuccess(http_status_codes_1.StatusCodes.CREATED, {
                place: (0, place_dto_1.default)(place)
            });
        }));
        this.update = ((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const userID = req.user._id;
            const { updatePlaceDto } = req.body;
            const { id } = req.params;
            const place = yield this.places.getByID(id);
            if (!place) {
                return res.sendError(http_status_codes_1.StatusCodes.NOT_FOUND, {
                    message: `place ${id} not found`
                });
            }
            if (place.ownerID !== userID) {
                return res.sendError(http_status_codes_1.StatusCodes.UNAUTHORIZED, {
                    message: "unauthorized"
                });
            }
            const { title } = updatePlaceDto;
            if (title) {
                const isfound = yield this.places.getByTitleOfUser(userID, title);
                if (isfound) {
                    return res.sendError(http_status_codes_1.StatusCodes.CONFLICT, {
                        message: `place title ${title} already used by the user ${userID}`
                    });
                }
            }
            const newPlace = yield this.places.update(id, updatePlaceDto);
            if (!newPlace) {
                return res.sendError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, {
                    message: `failed to update place ${id}`
                });
            }
            return res.sendSuccess(http_status_codes_1.StatusCodes.OK, {
                place: (0, place_dto_1.default)(newPlace)
            });
        }));
        this.remove = ((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const userID = req.user._id;
            const { id } = req.params;
            const place = yield this.places.getByID(id);
            if (!place) {
                return res.sendError(http_status_codes_1.StatusCodes.NOT_FOUND, {
                    message: `place ${id} not found`
                });
            }
            if (place.ownerID !== userID) {
                return res.sendError(http_status_codes_1.StatusCodes.UNAUTHORIZED, {
                    message: `unauthorized`
                });
            }
            const deletedPlace = yield this.places.remove(id);
            if (!deletedPlace) {
                return res.sendError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, {
                    message: `failed to remove place ${id}`
                });
            }
            return res.sendSuccess(http_status_codes_1.StatusCodes.OK, {
                place: (0, place_dto_1.default)(deletedPlace)
            });
        }));
    }
}
exports.PlacesController = PlacesController;
const placesController = new PlacesController(places_service_1.default);
exports.default = placesController;
