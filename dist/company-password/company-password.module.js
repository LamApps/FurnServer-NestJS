"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const company_password_service_1 = require("./company-password.service");
const company_password_controller_1 = require("./company-password.controller");
const company_password_entity_1 = require("./company-password.entity");
const company_entity_1 = require("../company/company.entity");
const password_entity_1 = require("../password/password.entity");
const user_module_1 = require("../user/user.module");
const adminuser_module_1 = require("../adminuser/adminuser.module");
const typeorm_1 = require("@nestjs/typeorm");
const auth_middleware_1 = require("../user/auth.middleware");
let CompanyPasswordModule = class CompanyPasswordModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'company_password/:id', method: common_1.RequestMethod.GET }, { path: 'company_password/:id', method: common_1.RequestMethod.PUT }, { path: 'company_password/:company/:id', method: common_1.RequestMethod.DELETE }, { path: 'company_password', method: common_1.RequestMethod.POST }, { path: 'company_password/company/:id', method: common_1.RequestMethod.GET });
    }
};
CompanyPasswordModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([company_password_entity_1.CompanyPasswordEntity, company_entity_1.CompanyEntity, password_entity_1.PasswordEntity]), user_module_1.UserModule, adminuser_module_1.AdminuserModule],
        controllers: [company_password_controller_1.CompanyPasswordController],
        providers: [company_password_service_1.CompanyPasswordService]
    })
], CompanyPasswordModule);
exports.CompanyPasswordModule = CompanyPasswordModule;
//# sourceMappingURL=company-password.module.js.map