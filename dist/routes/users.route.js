"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const users_controller_1 = __importDefault(require("../modules/users/users.controller"));
const profile_route_1 = __importDefault(require("./users/profile.route"));
const router = (0, express_1.Router)();
router.get("/:userID/places", (0, asyncHandler_1.default)(users_controller_1.default.getPlaces));
router.get("/:userID/profile", (0, asyncHandler_1.default)(users_controller_1.default.getProfile));
router.use("/profile", profile_route_1.default);
exports.default = router;
