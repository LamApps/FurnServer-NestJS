"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UuidModule = void 0;
const common_1 = require("@nestjs/common");
const uuid_service_1 = require("./uuid.service");
const uuid_controller_1 = require("./uuid.controller");
const typeorm_1 = require("@nestjs/typeorm");
const company_entity_1 = require("../company/company.entity");
const uuid_entity_1 = require("./uuid.entity");
const auth_middleware_1 = require("../user/auth.middleware");
const user_module_1 = require("../user/user.module");
const adminuser_module_1 = require("../adminuser/adminuser.module");
let UuidModule = class UuidModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'uuid/:id', method: common_1.RequestMethod.GET }, { path: 'uuid/:id', method: common_1.RequestMethod.PUT }, { path: 'uuid/:id', method: common_1.RequestMethod.DELETE }, { path: 'uuid', method: common_1.RequestMethod.POST }, { path: 'uuid/company/:id', method: common_1.RequestMethod.GET });
    }
};
UuidModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([uuid_entity_1.UUIDEntity, company_entity_1.CompanyEntity]), user_module_1.UserModule, adminuser_module_1.AdminuserModule],
        controllers: [uuid_controller_1.UuidController],
        providers: [uuid_service_1.UuidService]
    })
], UuidModule);
exports.UuidModule = UuidModule;
//# sourceMappingURL=uuid.module.js.map