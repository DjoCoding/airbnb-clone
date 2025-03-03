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
exports.PlacesService = void 0;
const places_model_1 = __importDefault(require("./places.model"));
class PlacesService {
    constructor(places) {
        this.places = places;
        this.getOfUser = (ownerID) => __awaiter(this, void 0, void 0, function* () {
            return yield this.places.find({
                ownerID
            });
        });
        this.getByID = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.places.findById(id);
        });
        this.getByTitleOfUser = (ownerID, title) => __awaiter(this, void 0, void 0, function* () {
            return yield this.places.findOne({
                ownerID,
                title
            });
        });
        this.get = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.places.find();
        });
        this.create = (ownerID, createPlaceDto) => __awaiter(this, void 0, void 0, function* () {
            const place = new places_model_1.default(Object.assign({ ownerID }, createPlaceDto));
            return yield place.save();
        });
        this.update = (id, updatePlaceDto) => __awaiter(this, void 0, void 0, function* () {
            return yield this.places.findByIdAndUpdate(id, updatePlaceDto, { new: true });
        });
        this.remove = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.places.findByIdAndDelete(id);
        });
    }
}
exports.PlacesService = PlacesService;
const placesService = new PlacesService(places_model_1.default);
exports.default = placesService;
