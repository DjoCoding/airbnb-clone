"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = __importDefault(require("../../middlewares/validate"));
const protectRoute_1 = __importDefault(require("../../middlewares/protectRoute"));
const users_controller_1 = __importDefault(require("../../modules/users/users.controller"));
const users_validation_1 = require("../../modules/users/users.validation");
const router = (0, express_1.Router)();
router.patch("/", [
    (0, validate_1.default)(users_validation_1.updateUserFieldSchema),
    (0, protectRoute_1.default)()
], users_controller_1.default.updatePartial);
exports.default = router;
