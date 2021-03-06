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
exports.CompanyPasswordController = void 0;
const common_1 = require("@nestjs/common");
const company_password_service_1 = require("./company-password.service");
const create_company_password_dto_1 = require("./dto/create-company-password.dto");
const update_company_password_dto_1 = require("./dto/update-company-password.dto");
let CompanyPasswordController = class CompanyPasswordController {
    constructor(companyPasswordService) {
        this.companyPasswordService = companyPasswordService;
    }
    async create(createCompanyPasswordDto) {
        return this.companyPasswordService.create(createCompanyPasswordDto);
    }
    async findAll(company) {
        return this.companyPasswordService.findAll(+company);
    }
    async findOne(id) {
        return this.companyPasswordService.findOne(+id);
    }
    async update(id, updateCompanyPasswordDto) {
        return this.companyPasswordService.update(+id, updateCompanyPasswordDto);
    }
    remove(id) {
        return this.companyPasswordService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_company_password_dto_1.CreateCompanyPasswordDto]),
    __metadata("design:returntype", Promise)
], CompanyPasswordController.prototype, "create", null);
__decorate([
    common_1.Get('company/:company'),
    __param(0, common_1.Param('company')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CompanyPasswordController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompanyPasswordController.prototype, "findOne", null);
__decorate([
    common_1.Put(':id'),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_company_password_dto_1.UpdateCompanyPasswordDto]),
    __metadata("design:returntype", Promise)
], CompanyPasswordController.prototype, "update", null);
__decorate([
    common_1.Delete('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompanyPasswordController.prototype, "remove", null);
CompanyPasswordController = __decorate([
    common_1.Controller('company-password'),
    __metadata("design:paramtypes", [company_password_service_1.CompanyPasswordService])
], CompanyPasswordController);
exports.CompanyPasswordController = CompanyPasswordController;
//# sourceMappingURL=company-password.controller.js.map