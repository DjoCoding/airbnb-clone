"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const protectRoute_1 = __importDefault(require("../middlewares/protectRoute"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const places_controller_1 = __importDefault(require("../modules/places/places.controller"));
const places_validation_1 = require("../modules/places/places.validation");
const uploader_1 = __importDefault(require("../middlewares/uploader"));
const router = (0, express_1.Router)();
const logRequestBody = (req, res, next) => {
    const { body, files } = req;
    console.log(files);
    console.log(body);
    res.sendStatus(200);
};
router.get("/", (0, asyncHandler_1.default)(places_controller_1.default.getAll));
router.get("/:id", (0, asyncHandler_1.default)(places_controller_1.default.getByID));
router.post("/", [
    (0, asyncHandler_1.default)(uploader_1.default),
    logRequestBody
]);
router.put("/:id", [
    (0, validate_1.default)(places_validation_1.updatePlaceSchema),
    (0, protectRoute_1.default)()
], (0, asyncHandler_1.default)(places_controller_1.default.update));
router.delete("/:id", [
    (0, protectRoute_1.default)()
], (0, asyncHandler_1.default)(places_controller_1.default.remove));
exports.default = router;
