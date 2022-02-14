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
exports.QrcodeController = void 0;
const common_1 = require("@nestjs/common");
const qrcode_service_1 = require("./qrcode.service");
const create_qrcode_dto_1 = require("./dto/create-qrcode.dto");
const update_qrcode_dto_1 = require("./dto/update-qrcode.dto");
let QrcodeController = class QrcodeController {
    constructor(qrcodeService) {
        this.qrcodeService = qrcodeService;
    }
    create(createQrcodeDto) {
        return this.qrcodeService.create(createQrcodeDto);
    }
    findAll() {
        return this.qrcodeService.findAll();
    }
    findOne(id) {
        return this.qrcodeService.findOne(+id);
    }
    update(id, updateQrcodeDto) {
        return this.qrcodeService.update(+id, updateQrcodeDto);
    }
    remove(id) {
        return this.qrcodeService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_qrcode_dto_1.CreateQrcodeDto]),
    __metadata("design:returntype", void 0)
], QrcodeController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QrcodeController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QrcodeController.prototype, "findOne", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_qrcode_dto_1.UpdateQrcodeDto]),
    __metadata("design:returntype", void 0)
], QrcodeController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QrcodeController.prototype, "remove", null);
QrcodeController = __decorate([
    common_1.Controller('qrcode'),
    __metadata("design:paramtypes", [qrcode_service_1.QrcodeService])
], QrcodeController);
exports.QrcodeController = QrcodeController;
//# sourceMappingURL=qrcode.controller.js.map