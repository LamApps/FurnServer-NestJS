"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const password_service_1 = require("./password.service");
const password_controller_1 = require("./password.controller");
const auth_middleware_1 = require("../user/auth.middleware");
const typeorm_1 = require("@nestjs/typeorm");
const password_entity_1 = require("./password.entity");
const user_service_1 = require("../user/user.service");
const user_entity_1 = require("../user/user.entity");
const company_entity_1 = require("../company/company.entity");
const adminuser_entity_1 = require("../adminuser/adminuser.entity");
const adminuser_service_1 = require("../adminuser/adminuser.service");
const roles_entity_1 = require("../roles/roles.entity");
let PasswordModule = class PasswordModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'password', method: common_1.RequestMethod.GET }, { path: 'password/:id', method: common_1.RequestMethod.PUT }, { path: 'password', method: common_1.RequestMethod.POST }, { path: 'password/:id', method: common_1.RequestMethod.DELETE }, { path: 'password/:id', method: common_1.RequestMethod.GET });
    }
};
PasswordModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([password_entity_1.PasswordEntity, user_entity_1.UserEntity, company_entity_1.CompanyEntity, adminuser_entity_1.AdminuserEntity, roles_entity_1.RolesEntity])],
        controllers: [password_controller_1.PasswordController],
        providers: [password_service_1.PasswordService, user_service_1.UserService, adminuser_service_1.AdminuserService]
    })
], PasswordModule);
exports.PasswordModule = PasswordModule;
//# sourceMappingURL=password.module.js.map