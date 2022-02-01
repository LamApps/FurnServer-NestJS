"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const company_entity_1 = require("../company/company.entity");
const typeorm_1 = require("@nestjs/typeorm");
const auth_middleware_1 = require("../user/auth.middleware");
const email_service_1 = require("./email.service");
const email_controller_1 = require("./email.controller");
const email_entity_1 = require("./email.entity");
const user_module_1 = require("../user/user.module");
const adminuser_module_1 = require("../adminuser/adminuser.module");
let EmailModule = class EmailModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'email/:id', method: common_1.RequestMethod.GET }, { path: 'email/:id', method: common_1.RequestMethod.PUT }, { path: 'email/:id', method: common_1.RequestMethod.DELETE }, { path: 'email', method: common_1.RequestMethod.POST }, { path: 'email/company/:id', method: common_1.RequestMethod.GET });
    }
};
EmailModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([company_entity_1.CompanyEntity, email_entity_1.EmailEntity]), user_module_1.UserModule, adminuser_module_1.AdminuserModule],
        controllers: [email_controller_1.EmailController],
        providers: [email_service_1.EmailService]
    })
], EmailModule);
exports.EmailModule = EmailModule;
//# sourceMappingURL=email.module.js.map