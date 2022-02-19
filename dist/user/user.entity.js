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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const argon2 = require("argon2");
const company_entity_1 = require("../company/company.entity");
const user_menu_entity_1 = require("../user-menu/user-menu.entity");
const company_role_entity_1 = require("../company-role/company-role.entity");
const room_entity_1 = require("../chat/rooms/entities/room.entity");
const chat_log_entity_1 = require("../chat/private/entities/chat-log.entity");
const chat_contact_entity_1 = require("../chat/private/entities/chat-contact.entity");
let UserEntity = class UserEntity {
    async hashPassword() {
        this.password = await argon2.hash(this.password);
        this.created = new Date;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "token", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "database", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "default_database", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "ip_address", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
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
], UserEntity.prototype, "position", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "mobile", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "birthday", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "browser", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "operating_system", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "last_login_date", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "last_login_time", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "last_login_database", void 0);
__decorate([
    typeorm_1.Column({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], UserEntity.prototype, "timeout", void 0);
__decorate([
    typeorm_1.ManyToOne(type => company_role_entity_1.CompanyRoleEntity, role => role.users),
    __metadata("design:type", company_role_entity_1.CompanyRoleEntity)
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
__decorate([
    typeorm_1.OneToMany(type => user_menu_entity_1.UserMenuEntity, menu => menu.user),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], UserEntity.prototype, "menus", void 0);
__decorate([
    typeorm_1.OneToMany(type => room_entity_1.RoomsEntity, room => room.user),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], UserEntity.prototype, "rooms", void 0);
__decorate([
    typeorm_1.OneToMany(type => chat_log_entity_1.ChatLogEntity, chat_log => chat_log.sender),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], UserEntity.prototype, "chat_logs", void 0);
__decorate([
    typeorm_1.OneToMany(type => chat_log_entity_1.ChatLogEntity, chat_log => chat_log.recipient),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], UserEntity.prototype, "chat_logs_rec", void 0);
__decorate([
    typeorm_1.OneToMany(type => chat_contact_entity_1.ChatContactEntity, chat_contact => chat_contact.owner),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], UserEntity.prototype, "chat_contacts", void 0);
__decorate([
    typeorm_1.OneToMany(type => chat_contact_entity_1.ChatContactEntity, chat_contact => chat_contact.user),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], UserEntity.prototype, "contact_users", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "deleted", void 0);
UserEntity = __decorate([
    typeorm_1.Entity('nest_user')
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map