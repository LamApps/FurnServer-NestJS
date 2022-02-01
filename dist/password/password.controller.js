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
const password_service_1 = require("./password.service");
const create_password_dto_1 = require("./dto/create-password.dto");
const update_password_dto_1 = require("./dto/update-password.dto");
const role_enum_1 = require("../enum/role.enum");
const roles_decorator_1 = require("../user/roles.decorator");
let PasswordController = class PasswordController {
    constructor(passwordService) {
        this.passwordService = passwordService;
    }
    create(createPasswordDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.passwordService.create(createPasswordDto);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.passwordService.findAll();
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.passwordService.findOne(+id);
        });
    }
    update(id, updatePasswordDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.passwordService.update(+id, updatePasswordDto);
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.passwordService.remove(+id);
        });
    }
};
__decorate([
    common_1.Post(),
    common_1.UsePipes(new common_1.ValidationPipe()),
    roles_decorator_1.Roles(role_enum_1.Role.Admin, role_enum_1.Role.Developer),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_password_dto_1.CreatePasswordDto]),
    __metadata("design:returntype", Promise)
], PasswordController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PasswordController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    roles_decorator_1.Roles(role_enum_1.Role.Admin, role_enum_1.Role.Developer),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PasswordController.prototype, "findOne", null);
__decorate([
    common_1.Put(':id'),
    roles_decorator_1.Roles(role_enum_1.Role.Admin, role_enum_1.Role.Developer),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_password_dto_1.UpdatePasswordDto]),
    __metadata("design:returntype", Promise)
], PasswordController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    roles_decorator_1.Roles(role_enum_1.Role.Admin, role_enum_1.Role.Developer),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PasswordController.prototype, "remove", null);
PasswordController = __decorate([
    common_1.Controller('password'),
    __metadata("design:paramtypes", [password_service_1.PasswordService])
], PasswordController);
exports.PasswordController = PasswordController;
//# sourceMappingURL=password.controller.js.map