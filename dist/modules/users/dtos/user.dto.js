"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = transformUser;
exports.transformUsers = transformUsers;
function transformUser(user) {
    return {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        createdAt: user.createdAt
    };
}
function transformUsers(users) {
    return users.map(user => transformUser(user));
}
