"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const http_exception_1 = require("@nestjs/common/exceptions/http.exception");
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const config_1 = require("../config");
const user_service_1 = require("./user.service");
const adminuser_service_1 = require("../adminuser/adminuser.service");
let AuthMiddleware = class AuthMiddleware {
    constructor(userService, adminuserService) {
        this.userService = userService;
        this.adminuserService = adminuserService;
    }
    async use(req, res, next) {
        const authHeaders = req.headers.authorization;
        if (authHeaders && authHeaders.split(' ')[1]) {
            const token = authHeaders.split(' ')[1];
            const decoded = jwt.verify(token, config_1.SECRET);
            let handled = false;
            if (decoded.isAdmin) {
                const user = await this.adminuserService.find(decoded.id);
                if (user && user.item.token == token) {
                    handled = true;
                    req.user = user.item;
                    next();
                }
                else {
                    if (!user) {
                        throw new http_exception_1.HttpException('User not found.', common_1.HttpStatus.UNAUTHORIZED);
                    }
                    else {
                        throw new http_exception_1.HttpException('Session expired', 905);
                    }
                }
            }
            else {
                const user = await this.userService.find(decoded.id);
                if (user && user.item.token) {
                    handled = true;
                    req.user = user.item;
                    next();
                }
                else {
                    if (!user) {
                        throw new http_exception_1.HttpException('User not found.', common_1.HttpStatus.UNAUTHORIZED);
                    }
                    else {
                        throw new http_exception_1.HttpException('Session expired', 905);
                    }
                }
            }
            if (!handled) {
                throw new http_exception_1.HttpException('User not found.', common_1.HttpStatus.UNAUTHORIZED);
            }
        }
        else {
            throw new http_exception_1.HttpException('Not authorized.', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
AuthMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        adminuser_service_1.AdminuserService])
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map