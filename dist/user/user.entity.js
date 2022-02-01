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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const argon2 = require("argon2");
const role_enum_1 = require("../enum/role.enum");
const company_entity_1 = require("../company/company.entity");
let UserEntity = class UserEntity {
    hashPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            this.password = yield argon2.hash(this.password);
            this.created = new Date;
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "ip_address", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "photo", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "firstname", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "lastname", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "login", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "position", void 0);
__decorate([
    typeorm_1.Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], UserEntity.prototype, "birthday", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: role_enum_1.Role,
        default: role_enum_1.Role.User,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    typeorm_1.Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], UserEntity.prototype, "created", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "active", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserEntity.prototype, "hashPassword", null);
__decorate([
    typeorm_1.ManyToOne(type => company_entity_1.CompanyEntity, company => company.users),
    __metadata("design:type", company_entity_1.CompanyEntity)
], UserEntity.prototype, "company", void 0);
UserEntity = __decorate([
    typeorm_1.Entity('nest_user')
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map