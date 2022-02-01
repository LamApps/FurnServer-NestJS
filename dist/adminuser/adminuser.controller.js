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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const adminuser_service_1 = require("./adminuser.service");
const dto_1 = require("./dto");
const http_exception_1 = require("@nestjs/common/exceptions/http.exception");
const validation_pipe_1 = require("../shared/pipes/validation.pipe");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const multer_1 = require("multer");
let AdminuserController = class AdminuserController {
    constructor(userService) {
        this.userService = userService;
    }
    login(loginUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const _user = yield this.userService.findOne(loginUserDto);
            if (!_user)
                return new http_exception_1.HttpException('user not found or incorrect password', common_1.HttpStatus.UNAUTHORIZED);
            if (!_user.active)
                return new http_exception_1.HttpException('Inactivated user', common_1.HttpStatus.UNAUTHORIZED);
            const token = yield this.userService.generateJWT(_user);
            const user = Object.assign({ token }, _user);
            return { status: common_1.HttpStatus.OK, user };
        });
    }
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.create(userData);
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.findAll();
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.find(+id);
        });
    }
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.create(userData);
        });
    }
    update(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.update(+id, userData);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.remove(+id);
        });
    }
    uploadPhoto(photo) {
        return __awaiter(this, void 0, void 0, function* () {
            return photo;
        });
    }
};
__decorate([
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    common_1.Post('auth/admin'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LoginAdminuserDto]),
    __metadata("design:returntype", Promise)
], AdminuserController.prototype, "login", null);
__decorate([
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    common_1.Post('auth/adminregister'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateAdminuserDto]),
    __metadata("design:returntype", Promise)
], AdminuserController.prototype, "register", null);
__decorate([
    common_1.Get('adminuser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminuserController.prototype, "getUsers", null);
__decorate([
    common_1.Get('adminuser/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminuserController.prototype, "find", null);
__decorate([
    common_1.Post('adminuser'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateAdminuserDto]),
    __metadata("design:returntype", Promise)
], AdminuserController.prototype, "create", null);
__decorate([
    common_1.Put('adminuser/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateAdminuserDto]),
    __metadata("design:returntype", Promise)
], AdminuserController.prototype, "update", null);
__decorate([
    common_1.Delete('adminuser/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminuserController.prototype, "delete", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'Add Photo' }),
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
    common_1.Post("aadminuser/uploadPhoto"),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminuserController.prototype, "uploadPhoto", null);
AdminuserController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags('adminuser'),
    common_1.Controller(),
    __metadata("design:paramtypes", [adminuser_service_1.AdminuserService])
], AdminuserController);
exports.AdminuserController = AdminuserController;
//# sourceMappingURL=adminuser.controller.js.map