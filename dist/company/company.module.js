"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const company_service_1 = require("./company.service");
const company_controller_1 = require("./company.controller");
const typeorm_1 = require("@nestjs/typeorm");
const company_entity_1 = require("./company.entity");
const auth_middleware_1 = require("../user/auth.middleware");
const user_entity_1 = require("../user/user.entity");
const user_service_1 = require("../user/user.service");
const adminuser_entity_1 = require("../adminuser/adminuser.entity");
const adminuser_service_1 = require("../adminuser/adminuser.service");
const password_entity_1 = require("../password/password.entity");
const email_entity_1 = require("../email/email.entity");
const roles_entity_1 = require("../roles/roles.entity");
let CompanyModule = class CompanyModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'company', method: common_1.RequestMethod.GET }, { path: 'company/:id', method: common_1.RequestMethod.PUT }, { path: 'company', method: common_1.RequestMethod.POST }, { path: 'company/enable/:id', method: common_1.RequestMethod.POST }, { path: 'company/permission/:id', method: common_1.RequestMethod.POST }, { path: 'company/:id', method: common_1.RequestMethod.DELETE }, { path: 'company/:id', method: common_1.RequestMethod.GET });
    }
};
CompanyModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([company_entity_1.CompanyEntity, user_entity_1.UserEntity, password_entity_1.PasswordEntity, email_entity_1.EmailEntity, adminuser_entity_1.AdminuserEntity, roles_entity_1.RolesEntity])],
        controllers: [company_controller_1.CompanyController],
        providers: [company_service_1.CompanyService, user_service_1.UserService, adminuser_service_1.AdminuserService]
    })
], CompanyModule);
exports.CompanyModule = CompanyModule;
//# sourceMappingURL=company.module.js.map