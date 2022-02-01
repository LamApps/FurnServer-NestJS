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
const option_service_1 = require("./option.service");
const create_option_dto_1 = require("./dto/create-option.dto");
const update_option_dto_1 = require("./dto/update-option.dto");
let OptionController = class OptionController {
    constructor(optionService) {
        this.optionService = optionService;
    }
    create(createOptionDto) {
        return this.optionService.create(createOptionDto);
    }
    findAll() {
        return this.optionService.findAll();
    }
    findOne(id) {
        return this.optionService.findOne(+id);
    }
    update(id, updateOptionDto) {
        return this.optionService.update(+id, updateOptionDto);
    }
    remove(id) {
        return this.optionService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_option_dto_1.CreateOptionDto]),
    __metadata("design:returntype", void 0)
], OptionController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OptionController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OptionController.prototype, "findOne", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_option_dto_1.UpdateOptionDto]),
    __metadata("design:returntype", void 0)
], OptionController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OptionController.prototype, "remove", null);
OptionController = __decorate([
    common_1.Controller('option'),
    __metadata("design:paramtypes", [option_service_1.OptionService])
], OptionController);
exports.OptionController = OptionController;
//# sourceMappingURL=option.controller.js.map