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
exports.UsersService = void 0;
const users_model_1 = __importDefault(require("./users.model"));
class UsersService {
    constructor(users) {
        this.users = users;
        this.get = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.users.find();
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.users.findById(id);
        });
        this.getByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            return yield this.users.findOne({
                email
            });
        });
        this.create = (createUserDto) => __awaiter(this, void 0, void 0, function* () {
            const user = new users_model_1.default(Object.assign({}, createUserDto));
            return yield user.save();
        });
        this.update = (id, updateUserDto) => __awaiter(this, void 0, void 0, function* () {
            return yield this.users.findByIdAndUpdate(id, updateUserDto, {
                new: true
            });
        });
        this.remove = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.users.findByIdAndDelete(id);
        });
    }
}
exports.UsersService = UsersService;
const usersService = new UsersService(users_model_1.default);
exports.default = usersService;
