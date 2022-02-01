"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const roles_service_1 = require("./roles.service");
const roles_controller_1 = require("./roles.controller");
const auth_middleware_1 = require("../adminuser/auth.middleware");
const typeorm_1 = require("@nestjs/typeorm");
const roles_entity_1 = require("./roles.entity");
const adminuser_service_1 = require("../adminuser/adminuser.service");
const adminuser_entity_1 = require("../adminuser/adminuser.entity");
let RolesModule = class RolesModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'roles', method: common_1.RequestMethod.GET }, { path: 'roles/:id', method: common_1.RequestMethod.PUT }, { path: 'roles', method: common_1.RequestMethod.POST }, { path: 'roles/:id', method: common_1.RequestMethod.DELETE }, { path: 'roles/:id', method: common_1.RequestMethod.GET });
    }
};
RolesModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([roles_entity_1.RolesEntity, adminuser_entity_1.AdminuserEntity])],
        controllers: [roles_controller_1.RolesController],
        providers: [roles_service_1.RolesService, adminuser_service_1.AdminuserService]
    })
], RolesModule);
exports.RolesModule = RolesModule;
//# sourceMappingURL=roles.module.js.map