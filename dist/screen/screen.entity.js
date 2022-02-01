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
const device_entity_1 = require("../device/device.entity");
const user_entity_1 = require("../user/user.entity");
let ScreenEntity = class ScreenEntity {
    createDateTime() {
        this.created = new Date;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ScreenEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], ScreenEntity.prototype, "photo", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], ScreenEntity.prototype, "created", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ScreenEntity.prototype, "createDateTime", null);
__decorate([
    typeorm_1.ManyToOne(type => device_entity_1.DeviceEntity, device => device.id),
    __metadata("design:type", String)
], ScreenEntity.prototype, "device", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.UserEntity, user => user.id),
    __metadata("design:type", user_entity_1.UserEntity)
], ScreenEntity.prototype, "user", void 0);
ScreenEntity = __decorate([
    typeorm_1.Entity('screen')
], ScreenEntity);
exports.ScreenEntity = ScreenEntity;
//# sourceMappingURL=screen.entity.js.map