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
const multer_1 = require("multer");
const swagger_1 = require("@nestjs/swagger");
const screen_service_1 = require("./screen.service");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
let ScreenController = class ScreenController {
    constructor(screenService) {
        this.screenService = screenService;
    }
    async findAll(query) {
        return await this.screenService.findAll(query);
    }
    async createScreen(params, photo) {
        return await this.screenService.addScreen(params, photo);
    }
};
__decorate([
    swagger_1.ApiOperation({ summary: 'Get all screens' }),
    swagger_1.ApiResponse({ status: 200, description: 'Return all screens.' }),
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ScreenController.prototype, "findAll", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'Add new screen' }),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('photo', {
        storage: multer_1.diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const currentDate = new Date();
                const timestamp = currentDate.getTime();
                const ext = path_1.extname(file.originalname);
                return callback(null, `${timestamp}${ext}`);
            }
        })
    })),
    common_1.Post(),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ScreenController.prototype, "createScreen", null);
ScreenController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags('screens'),
    common_1.Controller('screens'),
    __metadata("design:paramtypes", [screen_service_1.ScreenService])
], ScreenController);
exports.ScreenController = ScreenController;
//# sourceMappingURL=screen.controller.js.map