"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const adminuser_controller_1 = require("./adminuser.controller");
const typeorm_1 = require("@nestjs/typeorm");
const adminuser_entity_1 = require("./adminuser.entity");
const adminuser_service_1 = require("./adminuser.service");
const auth_middleware_1 = require("./auth.middleware");
const roles_entity_1 = require("../roles/roles.entity");
const roles_module_1 = require("../roles/roles.module");
let AdminuserModule = class AdminuserModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'adminuser/:id', method: common_1.RequestMethod.GET }, { path: 'adminuser/:id', method: common_1.RequestMethod.PUT }, { path: 'adminuser/:id', method: common_1.RequestMethod.DELETE }, { path: 'adminuser', method: common_1.RequestMethod.POST }, { path: 'uploadPhoto', method: common_1.RequestMethod.POST }, { path: 'adminuser', method: common_1.RequestMethod.GET });
    }
};
AdminuserModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([adminuser_entity_1.AdminuserEntity, roles_entity_1.RolesEntity]), roles_module_1.RolesModule],
        providers: [adminuser_service_1.AdminuserService],
        controllers: [
            adminuser_controller_1.AdminuserController
        ],
        exports: [adminuser_service_1.AdminuserService]
    })
], AdminuserModule);
exports.AdminuserModule = AdminuserModule;
//# sourceMappingURL=adminuser.module.js.map