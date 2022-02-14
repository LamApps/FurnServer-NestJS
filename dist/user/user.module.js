"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./user.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const user_service_1 = require("./user.service");
const auth_middleware_1 = require("./auth.middleware");
const company_entity_1 = require("../company/company.entity");
const company_module_1 = require("../company/company.module");
const adminuser_service_1 = require("../adminuser/adminuser.service");
const adminuser_module_1 = require("../adminuser/adminuser.module");
const adminuser_entity_1 = require("../adminuser/adminuser.entity");
const roles_service_1 = require("../roles/roles.service");
const roles_module_1 = require("../roles/roles.module");
const roles_entity_1 = require("../roles/roles.entity");
let UserModule = class UserModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'user/:id', method: common_1.RequestMethod.GET }, { path: 'user/:id', method: common_1.RequestMethod.PUT }, { path: 'user/:id', method: common_1.RequestMethod.DELETE }, { path: 'user/permission/:id', method: common_1.RequestMethod.POST }, { path: 'user', method: common_1.RequestMethod.POST }, { path: 'uploadPhoto', method: common_1.RequestMethod.POST }, { path: 'user', method: common_1.RequestMethod.GET });
    }
};
UserModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, company_entity_1.CompanyEntity, adminuser_entity_1.AdminuserEntity, roles_entity_1.RolesEntity]), company_module_1.CompanyModule, adminuser_module_1.AdminuserModule, roles_module_1.RolesModule],
        providers: [user_service_1.UserService, adminuser_service_1.AdminuserService, roles_service_1.RolesService],
        controllers: [
            user_controller_1.UserController
        ],
        exports: [user_service_1.UserService]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map