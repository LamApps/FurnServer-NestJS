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
exports.CompanyPasswordEntity = void 0;
const typeorm_1 = require("typeorm");
const company_entity_1 = require("../company/company.entity");
const password_entity_1 = require("../password/password.entity");
let CompanyPasswordEntity = class CompanyPasswordEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CompanyPasswordEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CompanyPasswordEntity.prototype, "pwd", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CompanyPasswordEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], CompanyPasswordEntity.prototype, "has_threshold", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], CompanyPasswordEntity.prototype, "threshold", void 0);
__decorate([
    typeorm_1.ManyToOne(type => password_entity_1.PasswordEntity, password => password.passwords),
    __metadata("design:type", password_entity_1.PasswordEntity)
], CompanyPasswordEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.ManyToOne(type => company_entity_1.CompanyEntity, company => company.id),
    __metadata("design:type", company_entity_1.CompanyEntity)
], CompanyPasswordEntity.prototype, "company", void 0);
CompanyPasswordEntity = __decorate([
    typeorm_1.Entity('nest_company_password')
], CompanyPasswordEntity);
exports.CompanyPasswordEntity = CompanyPasswordEntity;
//# sourceMappingURL=company-password.entity.js.map