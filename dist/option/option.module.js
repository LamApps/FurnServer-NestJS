"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionModule = void 0;
const common_1 = require("@nestjs/common");
const option_service_1 = require("./option.service");
const option_controller_1 = require("./option.controller");
let OptionModule = class OptionModule {
};
OptionModule = __decorate([
    common_1.Module({
        controllers: [option_controller_1.OptionController],
        providers: [option_service_1.OptionService]
    })
], OptionModule);
exports.OptionModule = OptionModule;
//# sourceMappingURL=option.module.js.map