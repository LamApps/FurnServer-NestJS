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
exports.AdminuserEntity = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const argon2 = require("argon2");
const roles_entity_1 = require("../roles/roles.entity");
const room_entity_1 = require("../chat/rooms/entities/room.entity");
const chat_log_entity_1 = require("../chat/private/entities/chat-log.entity");
const chat_contact_entity_1 = require("../chat/private/entities/chat-contact.entity");
const room_banned_users_1 = require("../chat/rooms/entities/room_banned_users");
let AdminuserEntity = class AdminuserEntity {
    async hashPassword() {
        this.password = await argon2.hash(this.password);
        this.created = new Date;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AdminuserEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], AdminuserEntity.prototype, "token", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], AdminuserEntity.prototype, "ip_address", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AdminuserEntity.prototype, "username", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], AdminuserEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], AdminuserEntity.prototype, "photo", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], AdminuserEntity.prototype, "firstname", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], AdminuserEntity.prototype, "lastname", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], AdminuserEntity.prototype, "position", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], AdminuserEntity.prototype, "mobile", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], AdminuserEntity.prototype, "birthday", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AdminuserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], AdminuserEntity.prototype, "role", void 0);
__decorate([
    typeorm_1.Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], AdminuserEntity.prototype, "created", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], AdminuserEntity.prototype, "active", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], AdminuserEntity.prototype, "chat_alert", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], AdminuserEntity.prototype, "sound", void 0);
__decorate([
    typeorm_1.Column({ default: 5 }),
    __metadata("design:type", Number)
], AdminuserEntity.prototype, "alert_fadetime", void 0);
__decorate([
    typeorm_1.ManyToOne(type => roles_entity_1.RolesEntity, roles => roles.adminusers),
    __metadata("design:type", roles_entity_1.RolesEntity)
], AdminuserEntity.prototype, "roles", void 0);
__decorate([
    typeorm_1.OneToMany(type => room_entity_1.RoomsEntity, room => room.adminuser),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], AdminuserEntity.prototype, "rooms", void 0);
__decorate([
    typeorm_1.OneToMany(type => chat_log_entity_1.ChatLogEntity, chat_log => chat_log.sender_admin),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], AdminuserEntity.prototype, "chat_logs", void 0);
__decorate([
    typeorm_1.OneToMany(type => chat_log_entity_1.ChatLogEntity, chat_log => chat_log.recipient_admin),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], AdminuserEntity.prototype, "chat_logs_rec", void 0);
__decorate([
    typeorm_1.OneToMany(type => chat_contact_entity_1.ChatContactEntity, chat_contact => chat_contact.owner_admin),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], AdminuserEntity.prototype, "chat_contacts", void 0);
__decorate([
    typeorm_1.OneToMany(type => chat_contact_entity_1.ChatContactEntity, chat_contact => chat_contact.admin_user),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], AdminuserEntity.prototype, "contact_users", void 0);
__decorate([
    typeorm_1.OneToMany(type => room_banned_users_1.RoomBannedUsersEntity, room_banned => room_banned.adminuser),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], AdminuserEntity.prototype, "banned_users", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminuserEntity.prototype, "hashPassword", null);
AdminuserEntity = __decorate([
    typeorm_1.Entity('admin_user')
], AdminuserEntity);
exports.AdminuserEntity = AdminuserEntity;
//# sourceMappingURL=adminuser.entity.js.map