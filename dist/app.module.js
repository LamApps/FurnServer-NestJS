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
exports.ApplicationModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const user_module_1 = require("./user/user.module");
const roles_module_1 = require("./roles/roles.module");
const adminuser_module_1 = require("./adminuser/adminuser.module");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const profile_module_1 = require("./profile/profile.module");
const tag_module_1 = require("./tag/tag.module");
const screen_module_1 = require("./screen/screen.module");
const company_module_1 = require("./company/company.module");
const device_module_1 = require("./device/device.module");
const core_1 = require("@nestjs/core");
const roles_guard_1 = require("./user/roles.guard");
const uuid_module_1 = require("./uuid/uuid.module");
const apps_module_1 = require("./apps/apps.module");
const password_module_1 = require("./password/password.module");
const category_module_1 = require("./category/category.module");
const option_module_1 = require("./option/option.module");
const company_password_module_1 = require("./company-password/company-password.module");
const email_module_1 = require("./email/email.module");
const api_module_1 = require("./api/api.module");
const qrcode_module_1 = require("./qrcode/qrcode.module");
const menu_module_1 = require("./menu/menu.module");
const typeorm_3 = require("typeorm");
const mailer_1 = require("@nestjs-modules/mailer");
const company_menu_module_1 = require("./company-menu/company-menu.module");
const company_role_module_1 = require("./company-role/company-role.module");
const utils_module_1 = require("./utils/utils.module");
const code_module_1 = require("./code/code.module");
const chat_module_1 = require("./chat/chat.module");
let ApplicationModule = class ApplicationModule {
    constructor(connection) {
        this.connection = connection;
    }
};
ApplicationModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "root",
                password: "Spurlock26!",
                database: "invoice",
                entities: typeorm_3.getMetadataArgsStorage().tables.map(tbl => tbl.target),
                synchronize: true
            }),
            user_module_1.UserModule,
            adminuser_module_1.AdminuserModule,
            roles_module_1.RolesModule,
            profile_module_1.ProfileModule,
            tag_module_1.TagModule,
            screen_module_1.ScreenModule,
            company_module_1.CompanyModule,
            device_module_1.DeviceModule,
            uuid_module_1.UuidModule,
            password_module_1.PasswordModule,
            category_module_1.CategoryModule,
            option_module_1.OptionModule,
            apps_module_1.AppsModule,
            company_password_module_1.CompanyPasswordModule,
            email_module_1.EmailModule,
            api_module_1.ApiModule,
            qrcode_module_1.QrcodeModule,
            menu_module_1.MenuModule,
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: "furnserve.email",
                    port: 465,
                    secure: true,
                    auth: {
                        user: "invoice@furnserve.email",
                        pass: "Spurlock26!"
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                }
            }),
            company_menu_module_1.CompanyMenuModule,
            company_role_module_1.CompanyRoleModule,
            utils_module_1.UtilsModule,
            code_module_1.CodeModule,
            chat_module_1.ChatModule,
        ],
        controllers: [
            app_controller_1.AppController
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard
            }
        ]
    }),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], ApplicationModule);
exports.ApplicationModule = ApplicationModule;
//# sourceMappingURL=app.module.js.map