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
exports.ApiController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const api_service_1 = require("./api.service");
const multer_1 = require("multer");
let ApiController = class ApiController {
    constructor(apiService) {
        this.apiService = apiService;
    }
    async getPasswords(app_id) {
        return this.apiService.getPasswords(app_id);
    }
    async checkLicense(body) {
        return this.apiService.checkLicense(body);
    }
    async addQRCode(code) {
        return this.apiService.addQRCode(code);
    }
    async getQRCode(id) {
        return this.apiService.getQRCode(id);
    }
    async sendEmail(pdf, params) {
        return this.apiService.sendEmail(params, pdf);
    }
};
__decorate([
    common_1.Post('getPasswords'),
    __param(0, common_1.Body("app_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "getPasswords", null);
__decorate([
    common_1.Post('checkLicense'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "checkLicense", null);
__decorate([
    common_1.Post('addQRCode'),
    __param(0, common_1.Body("code")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "addQRCode", null);
__decorate([
    common_1.Post('getQRCode'),
    __param(0, common_1.Body("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "getQRCode", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'Add Pdf' }),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('pdf', {
        storage: multer_1.diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                return callback(null, `${file.originalname}`);
            }
        })
    })),
    common_1.Post('sendEmail'),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "sendEmail", null);
ApiController = __decorate([
    common_1.Controller('api'),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], ApiController);
exports.ApiController = ApiController;
//# sourceMappingURL=api.controller.js.map