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
exports.CompanyEntity = exports.Company = void 0;
const typeorm_1 = require("typeorm");
const company_password_entity_1 = require("../company-password/company-password.entity");
const email_entity_1 = require("../email/email.entity");
const password_entity_1 = require("../password/password.entity");
const user_entity_1 = require("../user/user.entity");
const apps_entity_1 = require("../apps/apps.entity");
const uuid_entity_1 = require("../uuid/uuid.entity");
const company_menu_entity_1 = require("../company-menu/company-menu.entity");
const company_role_entity_1 = require("../company-role/company-role.entity");
const code_entity_1 = require("../code/entities/code.entity");
const room_entity_1 = require("../chat/rooms/entities/room.entity");
const location_entity_1 = require("../furnserve/configurator/locations/entities/location.entity");
class Company {
}
exports.Company = Company;
let CompanyEntity = class CompanyEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CompanyEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "number", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "app_id", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "code", void 0);
__decorate([
    typeorm_1.Column({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], CompanyEntity.prototype, "timeout", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "databases", void 0);
__decorate([
    typeorm_1.Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], CompanyEntity.prototype, "expire_date", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], CompanyEntity.prototype, "first_time_status", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "menu_password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], CompanyEntity.prototype, "active", void 0);
__decorate([
    typeorm_1.OneToMany(type => company_menu_entity_1.CompanyMenuEntity, menu => menu.company),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "menus", void 0);
__decorate([
    typeorm_1.OneToMany(type => company_role_entity_1.CompanyRoleEntity, role => role.company),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "roles", void 0);
__decorate([
    typeorm_1.OneToMany(type => user_entity_1.UserEntity, user => user.company),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "users", void 0);
__decorate([
    typeorm_1.OneToMany(type => uuid_entity_1.UUIDEntity, uuid => uuid.company),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "uuids", void 0);
__decorate([
    typeorm_1.OneToMany(type => email_entity_1.EmailEntity, email => email.company),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "emails", void 0);
__decorate([
    typeorm_1.OneToMany(type => company_password_entity_1.CompanyPasswordEntity, password => password.company),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "passwords", void 0);
__decorate([
    typeorm_1.ManyToMany(type => password_entity_1.PasswordEntity, password => password.id),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "enabled", void 0);
__decorate([
    typeorm_1.OneToMany(type => apps_entity_1.AppsEntity, apps => apps.companies),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "apps", void 0);
__decorate([
    typeorm_1.OneToMany(type => code_entity_1.CodeEntity, code => code.company),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "codes", void 0);
__decorate([
    typeorm_1.OneToMany(type => room_entity_1.RoomsEntity, rooms => rooms.company),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "rooms", void 0);
__decorate([
    typeorm_1.OneToMany(type => location_entity_1.LocationEntity, locations => locations.company),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "locations", void 0);
CompanyEntity = __decorate([
    typeorm_1.Entity('nest_company')
], CompanyEntity);
exports.CompanyEntity = CompanyEntity;
//# sourceMappingURL=company.entity.js.map