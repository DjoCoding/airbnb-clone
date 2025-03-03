"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = __importDefault(require("../middlewares/validate"));
const protectRoute_1 = __importDefault(require("../middlewares/protectRoute"));
const auth_controller_1 = __importDefault(require("../modules/auth/auth.controller"));
const users_validation_1 = require("../modules/users/users.validation");
const auth_validation_1 = require("../modules/auth/auth.validation");
const router = (0, express_1.Router)();
router.post("/register", [(0, validate_1.default)(users_validation_1.createUserSchema)], auth_controller_1.default.register);
router.post("/login", [(0, validate_1.default)(auth_validation_1.loginUserSchema)], auth_controller_1.default.login);
router.get("/fetch", [(0, protectRoute_1.default)()], auth_controller_1.default.fetch);
exports.default = router;
