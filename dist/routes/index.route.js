"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = routes;
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
const users_route_1 = __importDefault(require("./users.route"));
const places_route_1 = __importDefault(require("./places.route"));
function routes() {
    const router = (0, express_1.Router)();
    router.use("/auth", auth_route_1.default);
    router.use("/users", users_route_1.default);
    router.use("/places", places_route_1.default);
    return router;
}
