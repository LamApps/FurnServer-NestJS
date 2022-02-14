"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiModule = void 0;
const common_1 = require("@nestjs/common");
const api_service_1 = require("./api.service");
const api_controller_1 = require("./api.controller");
const typeorm_1 = require("@nestjs/typeorm");
const password_entity_1 = require("../password/password.entity");
const company_entity_1 = require("../company/company.entity");
const company_password_entity_1 = require("../company-password/company-password.entity");
const uuid_entity_1 = require("../uuid/uuid.entity");
const qrcode_entity_1 = require("../qrcode/qrcode.entity");
const roles_entity_1 = require("../roles/roles.entity");
const adminuser_entity_1 = require("../adminuser/adminuser.entity");
let ApiModule = class ApiModule {
};
ApiModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([password_entity_1.PasswordEntity, company_password_entity_1.CompanyPasswordEntity, company_entity_1.CompanyEntity, uuid_entity_1.UUIDEntity, qrcode_entity_1.QrcodeEntity, adminuser_entity_1.AdminuserEntity, roles_entity_1.RolesEntity])],
        controllers: [api_controller_1.ApiController],
        providers: [api_service_1.ApiService]
    })
], ApiModule);
exports.ApiModule = ApiModule;
//# sourceMappingURL=api.module.js.map