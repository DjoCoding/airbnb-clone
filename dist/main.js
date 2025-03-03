"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const app_1 = __importDefault(require("./app"));
const connect_1 = __importDefault(require("./db/connect"));
(0, dotenv_1.config)();
const PORT = (process.env.PORT || "3000");
function main() {
    (0, connect_1.default)()
        .then(() => {
        console.log(`Database connected`);
        app_1.default.listen(PORT, () => {
            console.log(`Application running on PORT ${PORT}`);
        });
    })
        .catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
main();
