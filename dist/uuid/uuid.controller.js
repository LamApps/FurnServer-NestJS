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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const uuid_service_1 = require("./uuid.service");
const create_uuid_dto_1 = require("./dto/create-uuid.dto");
const update_uuid_dto_1 = require("./dto/update-uuid.dto");
let UuidController = class UuidController {
    constructor(uuidService) {
        this.uuidService = uuidService;
    }
    async create(createUuidDto) {
        return this.uuidService.create(createUuidDto);
    }
    async findAll(company) {
        return this.uuidService.findAll(+company);
    }
    async getLatestUniqueId() {
        return this.uuidService.getLatestUniqueId();
    }
    findOne(id) {
        return this.uuidService.findOne(+id);
    }
    update(id, updateUuidDto) {
        return this.uuidService.update(+id, updateUuidDto);
    }
    remove(id) {
        return this.uuidService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_uuid_dto_1.CreateUuidDto]),
    __metadata("design:returntype", Promise)
], UuidController.prototype, "create", null);
__decorate([
    common_1.Get('company/:company'),
    __param(0, common_1.Param('company')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UuidController.prototype, "findAll", null);
__decorate([
    common_1.Get('getUid'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UuidController.prototype, "getLatestUniqueId", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UuidController.prototype, "findOne", null);
__decorate([
    common_1.Put(':id'),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_uuid_dto_1.UpdateUuidDto]),
    __metadata("design:returntype", void 0)
], UuidController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UuidController.prototype, "remove", null);
UuidController = __decorate([
    common_1.Controller('uuid'),
    __metadata("design:paramtypes", [uuid_service_1.UuidService])
], UuidController);
exports.UuidController = UuidController;
//# sourceMappingURL=uuid.controller.js.map