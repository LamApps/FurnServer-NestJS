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
const typeorm_1 = require("typeorm");
const company_password_entity_1 = require("../company-password/company-password.entity");
let PasswordEntity = class PasswordEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PasswordEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PasswordEntity.prototype, "code", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PasswordEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PasswordEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.OneToMany(type => company_password_entity_1.CompanyPasswordEntity, password => password.password),
    __metadata("design:type", Array)
], PasswordEntity.prototype, "passwords", void 0);
PasswordEntity = __decorate([
    typeorm_1.Entity('nest_password')
], PasswordEntity);
exports.PasswordEntity = PasswordEntity;
//# sourceMappingURL=password.entity.js.map