/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var __resourceQuery = "?100";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if (true) {
	var hotPollInterval = +__resourceQuery.substr(1) || 0;
	var log = __webpack_require__(1);

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if (module.hot.status() === "idle") {
			module.hot
				.check(true)
				.then(function (updatedModules) {
					if (!updatedModules) {
						if (fromUpdate) log("info", "[HMR] Update applied.");
						return;
					}
					__webpack_require__(2)(updatedModules, updatedModules);
					checkForUpdate(true);
				})
				.catch(function (err) {
					var status = module.hot.status();
					if (["abort", "fail"].indexOf(status) >= 0) {
						log("warning", "[HMR] Cannot apply update.");
						log("warning", "[HMR] " + log.formatError(err));
						log("warning", "[HMR] You need to restart the application!");
					} else {
						log("warning", "[HMR] Update failed: " + log.formatError(err));
					}
				});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {}


/***/ }),
/* 1 */
/***/ ((module) => {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function (level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function (level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function (level) {
	logLevel = level;
};

module.exports.formatError = function (err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function (updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function (moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(1);

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function (moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function (moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function (moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				'[HMR] Consider using the optimization.moduleIds: "named" for module names.'
			);
	}
};


/***/ }),
/* 3 */
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(4);
const app_module_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(38);
const path_1 = __webpack_require__(40);
async function bootstrap() {
    const appOptions = { cors: true };
    const app = await core_1.NestFactory.create(app_module_1.ApplicationModule, appOptions);
    app.enableCors();
    app.setGlobalPrefix('api');
    app.useStaticAssets(path_1.join(__dirname, '..', 'uploads'));
    app.setViewEngine('hbs');
    const options = new swagger_1.DocumentBuilder()
        .setTitle('NestJS Realworld Example App')
        .setDescription('The Realworld API description')
        .setVersion('1.0')
        .setBasePath('api')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('/docs', app, document);
    await app.listen(4201);
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/core");

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const app_controller_1 = __webpack_require__(7);
const user_module_1 = __webpack_require__(8);
const roles_module_1 = __webpack_require__(60);
const adminuser_module_1 = __webpack_require__(53);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(12);
const profile_module_1 = __webpack_require__(66);
const tag_module_1 = __webpack_require__(71);
const screen_module_1 = __webpack_require__(75);
const company_module_1 = __webpack_require__(46);
const device_module_1 = __webpack_require__(82);
const core_1 = __webpack_require__(4);
const roles_guard_1 = __webpack_require__(88);
const uuid_module_1 = __webpack_require__(89);
const apps_module_1 = __webpack_require__(94);
const password_module_1 = __webpack_require__(99);
const category_module_1 = __webpack_require__(104);
const option_module_1 = __webpack_require__(109);
const company_password_module_1 = __webpack_require__(114);
const email_module_1 = __webpack_require__(119);
const api_module_1 = __webpack_require__(124);
const qrcode_module_1 = __webpack_require__(129);
const menu_module_1 = __webpack_require__(134);
const typeorm_3 = __webpack_require__(12);
const mailer_1 = __webpack_require__(127);
const company_menu_module_1 = __webpack_require__(139);
const user_menu_module_1 = __webpack_require__(142);
const company_role_module_1 = __webpack_require__(147);
const utils_module_1 = __webpack_require__(152);
const code_module_1 = __webpack_require__(157);
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
                password: "",
                database: "furnserve",
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
            user_menu_module_1.UserMenuModule,
            company_role_module_1.CompanyRoleModule,
            utils_module_1.UtilsModule,
            code_module_1.CodeModule
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
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Connection !== "undefined" && typeorm_2.Connection) === "function" ? _a : Object])
], ApplicationModule);
exports.ApplicationModule = ApplicationModule;


/***/ }),
/* 6 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/common");

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
let AppController = class AppController {
    root() {
        return 'Hello World!';
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "root", null);
AppController = __decorate([
    common_1.Controller()
], AppController);
exports.AppController = AppController;


/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const user_controller_1 = __webpack_require__(9);
const typeorm_1 = __webpack_require__(11);
const user_entity_1 = __webpack_require__(13);
const user_service_1 = __webpack_require__(10);
const auth_middleware_1 = __webpack_require__(42);
const company_entity_1 = __webpack_require__(15);
const company_module_1 = __webpack_require__(46);
const adminuser_service_1 = __webpack_require__(43);
const adminuser_module_1 = __webpack_require__(53);
const adminuser_entity_1 = __webpack_require__(44);
const roles_service_1 = __webpack_require__(61);
const roles_module_1 = __webpack_require__(60);
const roles_entity_1 = __webpack_require__(45);
let UserModule = class UserModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'user/:id', method: common_1.RequestMethod.GET }, { path: 'user/:id', method: common_1.RequestMethod.PUT }, { path: 'user/:id', method: common_1.RequestMethod.DELETE }, { path: 'user/permission/:id', method: common_1.RequestMethod.POST }, { path: 'user', method: common_1.RequestMethod.POST }, { path: 'uploadPhoto', method: common_1.RequestMethod.POST }, { path: 'user', method: common_1.RequestMethod.GET });
    }
};
UserModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, company_entity_1.CompanyEntity, adminuser_entity_1.AdminuserEntity, roles_entity_1.RolesEntity]), company_module_1.CompanyModule, adminuser_module_1.AdminuserModule, roles_module_1.RolesModule],
        providers: [user_service_1.UserService, adminuser_service_1.AdminuserService, roles_service_1.RolesService],
        controllers: [
            user_controller_1.UserController
        ],
        exports: [user_service_1.UserService]
    })
], UserModule);
exports.UserModule = UserModule;


/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const user_service_1 = __webpack_require__(10);
const dto_1 = __webpack_require__(32);
const http_exception_1 = __webpack_require__(31);
const validation_pipe_1 = __webpack_require__(36);
const swagger_1 = __webpack_require__(38);
const platform_express_1 = __webpack_require__(39);
const path_1 = __webpack_require__(40);
const multer_1 = __webpack_require__(41);
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async login(loginUserDto) {
        let _user = await this.userService.findOne(loginUserDto);
        if (!_user)
            return new http_exception_1.HttpException('User not found or incorrect password.', common_1.HttpStatus.UNAUTHORIZED);
        if (!_user.active)
            return new http_exception_1.HttpException('Inactivated user.', common_1.HttpStatus.UNAUTHORIZED);
        if (!_user.company.active)
            return new http_exception_1.HttpException('Sorry this company is inactive.  Please contact Support.', common_1.HttpStatus.UNAUTHORIZED);
        const token = await this.userService.generateJWT(_user);
        _user = await this.userService.update_login(_user.id, loginUserDto, token);
        const user = Object.assign({ token }, _user);
        return { status: common_1.HttpStatus.OK, user };
    }
    async register(userData) {
        return await this.userService.create(userData);
    }
    async find(id) {
        return await this.userService.find(+id);
    }
    async getLimitedUsers(id) {
        return await this.userService.findAllLimited(+id);
    }
    async getUsers() {
        return await this.userService.findAll();
    }
    async getDatabase(params) {
        return await this.userService.getDatabase(params.username, params.company);
    }
    async create(userData) {
        return this.userService.create(userData);
    }
    async update(id, userData) {
        return await this.userService.update(+id, userData);
    }
    async delete(id) {
        return await this.userService.remove(+id);
    }
    async permission(id, dto) {
        return await this.userService.updatePermission(+id, +dto.role, dto.list);
    }
    async uploadPhoto(photo) {
        return photo;
    }
};
__decorate([
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    common_1.Post('auth/login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof dto_1.LoginUserDto !== "undefined" && dto_1.LoginUserDto) === "function" ? _a : Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UserController.prototype, "login", null);
__decorate([
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    common_1.Post('auth/register'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof dto_1.CreateUserDto !== "undefined" && dto_1.CreateUserDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    common_1.Get('user/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "find", null);
__decorate([
    common_1.Get('user/company/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getLimitedUsers", null);
__decorate([
    common_1.Get('user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    common_1.Get('auth/database'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getDatabase", null);
__decorate([
    common_1.Post('user'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateUserDto !== "undefined" && dto_1.CreateUserDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    common_1.Put('user/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof dto_1.UpdateUserDto !== "undefined" && dto_1.UpdateUserDto) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    common_1.Delete('user/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    common_1.Post('user/permission/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "permission", null);
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
    common_1.Post("user/uploadPhoto"),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadPhoto", null);
UserController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags('user'),
    common_1.Controller(),
    __metadata("design:paramtypes", [typeof (_f = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _f : Object])
], UserController);
exports.UserController = UserController;


/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(12);
const user_entity_1 = __webpack_require__(13);
const jwt = __webpack_require__(28);
const config_1 = __webpack_require__(29);
const class_validator_1 = __webpack_require__(30);
const http_exception_1 = __webpack_require__(31);
const common_2 = __webpack_require__(6);
const argon2 = __webpack_require__(14);
const company_entity_1 = __webpack_require__(15);
const menu_entity_1 = __webpack_require__(25);
const user_menu_entity_1 = __webpack_require__(26);
const company_role_entity_1 = __webpack_require__(24);
const role_menu_entity_1 = __webpack_require__(22);
let UserService = class UserService {
    constructor(userRepository, companyRepository) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
    }
    async findAll() {
        const qb = await typeorm_2.getRepository(user_entity_1.UserEntity)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.company', 'company')
            .leftJoinAndSelect('user.menus', 'menus')
            .leftJoinAndSelect('user.role', 'role')
            .leftJoinAndSelect('menus.menu', 'menu')
            .where('deleted = false');
        const users = await qb.getMany();
        return { items: users, totalCount: users.length };
    }
    async find(id) {
        const qb = await typeorm_2.getRepository(user_entity_1.UserEntity)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.company', 'company')
            .leftJoinAndSelect('user.menus', 'menus')
            .leftJoinAndSelect('user.role', 'role')
            .leftJoinAndSelect('menus.menu', 'menu')
            .where('deleted = false');
        const user = await qb.where({ id: id }).getOne();
        if (!user) {
            return {
                status: common_2.HttpStatus.BAD_REQUEST,
                message: 'There is not user.'
            };
        }
        return { item: user };
    }
    async findAllLimited(company) {
        const qb = await typeorm_2.getRepository(user_entity_1.UserEntity)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.company', 'company')
            .leftJoinAndSelect('user.menus', 'menus')
            .leftJoinAndSelect('menus.menu', 'menu')
            .leftJoinAndSelect('user.role', 'role')
            .where('deleted = false')
            .andWhere('user.company = :company', { company });
        const users = await qb.getMany();
        return { items: users, totalCount: users.length };
    }
    async findOne({ username, password, company }) {
        const qb = await typeorm_2.getRepository(user_entity_1.UserEntity)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.company', 'company')
            .leftJoinAndSelect('user.menus', 'menus')
            .leftJoinAndSelect('menus.menu', 'menu')
            .leftJoinAndSelect('user.role', 'role')
            .where('deleted = false');
        const user = await qb.where({ username: username }).andWhere('LOWER(company.code) = :company', { company: company.toLowerCase() }).getOne();
        if (!user) {
            return null;
        }
        if (await argon2.verify(user.password, password)) {
            return user;
        }
        return null;
    }
    async getDatabase(username, company) {
        const qb = await typeorm_2.getRepository(user_entity_1.UserEntity)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.company', 'company');
        const user = await qb.where({ username: username }).andWhere('LOWER(company.code) = :company', { company: company.toLowerCase() }).getOne();
        if (!user) {
            return {
                status: common_2.HttpStatus.BAD_REQUEST,
                message: 'There is not user.'
            };
        }
        else {
            let database = user.database;
            if (database == undefined || database == "")
                database = "1";
            let default_database = user.default_database;
            if (default_database == undefined || default_database == "")
                default_database = "1";
            return {
                status: common_2.HttpStatus.OK,
                result: {
                    database: database,
                    default_database: default_database
                }
            };
        }
    }
    async create(dto) {
        const { username, email, password, position, firstname, lastname, role, birthday, active, mobile, timeout } = dto;
        const qb = await typeorm_2.getRepository(user_entity_1.UserEntity)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.company', 'company')
            .where('user.username = :username', { username });
        const user = await qb.andWhere('company.id = :company', { company: dto.company }).getOne();
        if (user) {
            return {
                status: common_2.HttpStatus.BAD_REQUEST,
                message: 'Username must be unique.'
            };
        }
        let newUser = new user_entity_1.UserEntity();
        newUser.username = username;
        newUser.email = email;
        newUser.password = password;
        newUser.active = active;
        newUser.firstname = firstname;
        newUser.lastname = lastname;
        newUser.position = position;
        newUser.birthday = birthday;
        newUser.mobile = mobile;
        newUser.database = dto.database;
        newUser.default_database = dto.default_database;
        if (timeout) {
            newUser.timeout = timeout;
        }
        const errors = await class_validator_1.validate(newUser);
        if (errors.length > 0) {
            return {
                status: common_2.HttpStatus.BAD_REQUEST,
                message: 'Userinput is not valid.'
            };
        }
        else {
            const savedUser = await this.userRepository.save(newUser);
            const company = await this.companyRepository.findOne({ where: { id: dto.company }, relations: ['users'] });
            company.users.push(savedUser);
            await this.companyRepository.save(company);
            if (role != -1) {
                const company_role = await typeorm_2.getRepository(company_role_entity_1.CompanyRoleEntity)
                    .createQueryBuilder('company_role')
                    .leftJoinAndSelect('company_role.users', 'users')
                    .leftJoinAndSelect('company_role.menus', 'menus')
                    .leftJoinAndSelect('menus.menu', 'menu')
                    .where('company_role.id = :id', { id: role })
                    .getOne();
                if (company_role) {
                    company_role.users.push(newUser);
                    await typeorm_2.getRepository(company_role_entity_1.CompanyRoleEntity).save(company_role);
                    const dto = company_role.menus.map(menu => {
                        return Object.assign(Object.assign({}, menu), { id: menu.menu.id });
                    });
                    await this.updatePermission(savedUser.id, -2, dto);
                }
            }
            return { status: common_2.HttpStatus.OK, user: savedUser };
        }
    }
    async update_login(id, dto, token) {
        let user = await this.userRepository.findOne(id);
        user.ip_address = dto.ip_address;
        user.last_login_database = dto.last_login_database;
        user.last_login_date = dto.last_login_date;
        user.last_login_time = dto.last_login_time;
        user.operating_system = dto.operating_system;
        user.browser = dto.browser;
        user.token = token;
        await this.userRepository.update(id, user);
        const qb = await typeorm_2.getRepository(user_entity_1.UserEntity)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.company', 'company')
            .leftJoinAndSelect('user.menus', 'menus')
            .leftJoinAndSelect('menus.menu', 'menu')
            .leftJoinAndSelect('user.role', 'role')
            .where({ id: id });
        const updated = await qb.getOne();
        return updated;
    }
    async update(id, dto) {
        const user = await typeorm_2.getRepository(user_entity_1.UserEntity)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.company', 'company')
            .leftJoinAndSelect('user.role', 'role')
            .leftJoinAndSelect('user.menus', 'menus')
            .leftJoinAndSelect('menus.menu', 'menu')
            .where('user.id = :id', { id: id })
            .getOne();
        if (!user) {
            return {
                status: common_2.HttpStatus.BAD_REQUEST,
                message: 'There is not user.'
            };
        }
        user.birthday = dto.birthday;
        user.firstname = dto.firstname;
        user.lastname = dto.lastname;
        user.position = dto.position;
        user.email = dto.email;
        user.photo = dto.photo;
        user.active = dto.active;
        user.mobile = dto.mobile;
        if (dto.timeout) {
            user.timeout = dto.timeout;
        }
        if (dto.database) {
            user.database = dto.database;
        }
        if (dto.default_database) {
            user.default_database = dto.default_database;
        }
        if (dto.password && dto.password !== "") {
            user.password = await argon2.hash(dto.password);
        }
        let saved = await this.userRepository.save(user);
        if (user.role) {
            const company_role = await typeorm_2.getRepository(company_role_entity_1.CompanyRoleEntity)
                .createQueryBuilder('company_role')
                .leftJoinAndSelect('company_role.users', 'users')
                .where('company_role.id = :id', { id: user.role.id })
                .getOne();
            if (company_role) {
                company_role.users = company_role.users.filter(role => {
                    return role.id !== user.role.id;
                });
                await typeorm_2.getRepository(company_role_entity_1.CompanyRoleEntity).save(company_role);
            }
        }
        if (dto.role != -1) {
            const company_role = await typeorm_2.getRepository(company_role_entity_1.CompanyRoleEntity)
                .createQueryBuilder('company_role')
                .leftJoinAndSelect('company_role.users', 'users')
                .leftJoinAndSelect('company_role.menus', 'menus')
                .leftJoinAndSelect('menus.menu', 'menu')
                .where('company_role.id = :id', { id: dto.role })
                .getOne();
            if (company_role) {
                company_role.users.push(user);
                await typeorm_2.getRepository(company_role_entity_1.CompanyRoleEntity).save(company_role);
                const dto = company_role.menus.map(menu => {
                    return Object.assign(Object.assign({}, menu), { id: menu.menu.id });
                });
                await this.updatePermission(user.id, -2, dto);
            }
        }
        return { item: saved };
    }
    async remove(id) {
        const user = await this.userRepository.findOne({ id: id });
        if (!user) {
            return {
                status: common_2.HttpStatus.BAD_REQUEST,
                message: 'There is not user.'
            };
        }
        return await this.userRepository.update(id, { deleted: true });
    }
    async findById(id) {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            const errors = { User: ' not found' };
            throw new http_exception_1.HttpException({ errors }, 401);
        }
        return this.buildUserRO(user);
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOne({ email: email });
        return this.buildUserRO(user);
    }
    async updatePermission(id, role, dto) {
        var user = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.menus', 'menus')
            .leftJoinAndSelect('user.role', 'role')
            .where('user.id=:id', { id: id })
            .getOne();
        if (!user) {
            return {
                status: common_2.HttpStatus.BAD_REQUEST,
                message: 'There is not company.'
            };
        }
        for (let i = 0; i < dto.length; i++) {
            const one = dto[i];
            const permission = one.permission;
            const menu_entity = await typeorm_2.getRepository(menu_entity_1.MenuEntity)
                .createQueryBuilder('menu')
                .leftJoinAndSelect('menu.user_menus', 'user_menus')
                .where('menu.id=:id', { id: one.id })
                .getOne();
            if (!menu_entity)
                return;
            var user_menu_entity = await typeorm_2.getRepository(user_menu_entity_1.UserMenuEntity)
                .createQueryBuilder('user_menu')
                .leftJoinAndSelect('user_menu.user', 'user')
                .leftJoinAndSelect('user_menu.menu', 'menu')
                .where('user.id=:id', { id: id })
                .andWhere('menu.id=:mid', { mid: one.id })
                .getOne();
            if (user_menu_entity) {
                user_menu_entity.permission = permission;
                await typeorm_2.getRepository(user_menu_entity_1.UserMenuEntity).save(user_menu_entity);
            }
            else {
                user_menu_entity = new user_menu_entity_1.UserMenuEntity();
                user_menu_entity.permission = permission;
                const saved = await typeorm_2.getRepository(user_menu_entity_1.UserMenuEntity).save(user_menu_entity);
                menu_entity.user_menus.push(saved);
                await typeorm_2.getRepository(menu_entity_1.MenuEntity).save(menu_entity);
                user.menus.push(saved);
                user = await typeorm_2.getRepository(user_entity_1.UserEntity).save(user);
            }
            if (role > -1) {
                await typeorm_2.getRepository(role_menu_entity_1.RoleMenuEntity).createQueryBuilder('role_menu')
                    .update(role_menu_entity_1.RoleMenuEntity)
                    .set({ permission: permission })
                    .where("nest_role_menu.menuId = :menu_id", { menu_id: one.id })
                    .andWhere("nest_role_menu.roleId = :role_id", { role_id: role })
                    .execute();
            }
        }
        if (user.role && role != -2) {
            const company_role = await typeorm_2.getRepository(company_role_entity_1.CompanyRoleEntity)
                .createQueryBuilder('company_role')
                .leftJoinAndSelect('company_role.users', 'users')
                .where('company_role.id = :id', { id: user.role.id })
                .getOne();
            if (company_role) {
                company_role.users = company_role.users.filter(role => {
                    return role.id !== user.role.id;
                });
                await typeorm_2.getRepository(company_role_entity_1.CompanyRoleEntity).save(company_role);
            }
        }
        if (role >= 0) {
            const company_role = await typeorm_2.getRepository(company_role_entity_1.CompanyRoleEntity)
                .createQueryBuilder('company_role')
                .leftJoinAndSelect('company_role.users', 'users')
                .where('company_role.id = :id', { id: role })
                .getOne();
            if (company_role) {
                company_role.users.push(user);
                await typeorm_2.getRepository(company_role_entity_1.CompanyRoleEntity).save(company_role);
            }
        }
        const updated = await this.find(id);
        return { user: updated };
    }
    generateJWT(user) {
        return jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            exp: new Date().getTime() / 1000 + 12 * 3600,
        }, config_1.SECRET);
    }
    ;
    buildUserRO(user) {
        const userRO = {
            id: user.id,
            username: user.username,
            email: user.email,
            token: this.generateJWT(user),
            role: user.role,
            company: user.company,
            active: user.active,
        };
        return { user: userRO };
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __param(1, typeorm_1.InjectRepository(company_entity_1.CompanyEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], UserService);
exports.UserService = UserService;


/***/ }),
/* 11 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/typeorm");

/***/ }),
/* 12 */
/***/ ((module) => {

"use strict";
module.exports = require("typeorm");

/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const typeorm_1 = __webpack_require__(12);
const argon2 = __webpack_require__(14);
const company_entity_1 = __webpack_require__(15);
const user_menu_entity_1 = __webpack_require__(26);
const company_role_entity_1 = __webpack_require__(24);
let UserEntity = class UserEntity {
    async hashPassword() {
        this.password = await argon2.hash(this.password);
        this.created = new Date;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "token", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "database", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "default_database", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "ip_address", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "photo", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "firstname", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "lastname", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "position", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "mobile", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "birthday", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "browser", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "operating_system", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "last_login_date", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "last_login_time", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "last_login_database", void 0);
__decorate([
    typeorm_1.Column({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], UserEntity.prototype, "timeout", void 0);
__decorate([
    typeorm_1.ManyToOne(type => company_role_entity_1.CompanyRoleEntity, role => role.users),
    __metadata("design:type", typeof (_a = typeof company_role_entity_1.CompanyRoleEntity !== "undefined" && company_role_entity_1.CompanyRoleEntity) === "function" ? _a : Object)
], UserEntity.prototype, "role", void 0);
__decorate([
    typeorm_1.Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UserEntity.prototype, "created", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "active", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserEntity.prototype, "hashPassword", null);
__decorate([
    typeorm_1.ManyToOne(type => company_entity_1.CompanyEntity, company => company.users),
    __metadata("design:type", typeof (_c = typeof company_entity_1.CompanyEntity !== "undefined" && company_entity_1.CompanyEntity) === "function" ? _c : Object)
], UserEntity.prototype, "company", void 0);
__decorate([
    typeorm_1.OneToMany(type => user_menu_entity_1.UserMenuEntity, menu => menu.user),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], UserEntity.prototype, "menus", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "deleted", void 0);
UserEntity = __decorate([
    typeorm_1.Entity('nest_user')
], UserEntity);
exports.UserEntity = UserEntity;


/***/ }),
/* 14 */
/***/ ((module) => {

"use strict";
module.exports = require("argon2");

/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const typeorm_1 = __webpack_require__(12);
const company_password_entity_1 = __webpack_require__(16);
const email_entity_1 = __webpack_require__(18);
const password_entity_1 = __webpack_require__(17);
const user_entity_1 = __webpack_require__(13);
const apps_entity_1 = __webpack_require__(19);
const uuid_entity_1 = __webpack_require__(20);
const company_menu_entity_1 = __webpack_require__(21);
const company_role_entity_1 = __webpack_require__(24);
const code_entity_1 = __webpack_require__(27);
class Company {
}
exports.Company = Company;
let CompanyEntity = class CompanyEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CompanyEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "number", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "app_id", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "code", void 0);
__decorate([
    typeorm_1.Column({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], CompanyEntity.prototype, "timeout", void 0);
__decorate([
    typeorm_1.Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CompanyEntity.prototype, "expire_date", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], CompanyEntity.prototype, "first_time_status", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "menu_password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], CompanyEntity.prototype, "active", void 0);
__decorate([
    typeorm_1.OneToMany(type => company_menu_entity_1.CompanyMenuEntity, menu => menu.company),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "menus", void 0);
__decorate([
    typeorm_1.OneToMany(type => company_role_entity_1.CompanyRoleEntity, role => role.company),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "roles", void 0);
__decorate([
    typeorm_1.OneToMany(type => user_entity_1.UserEntity, user => user.company),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "users", void 0);
__decorate([
    typeorm_1.OneToMany(type => uuid_entity_1.UUIDEntity, uuid => uuid.company),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "uuids", void 0);
__decorate([
    typeorm_1.OneToMany(type => email_entity_1.EmailEntity, email => email.company),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "emails", void 0);
__decorate([
    typeorm_1.OneToMany(type => company_password_entity_1.CompanyPasswordEntity, password => password.company),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "passwords", void 0);
__decorate([
    typeorm_1.ManyToMany(type => password_entity_1.PasswordEntity, password => password.id),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "enabled", void 0);
__decorate([
    typeorm_1.OneToMany(type => apps_entity_1.AppsEntity, apps => apps.companies),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "apps", void 0);
__decorate([
    typeorm_1.OneToMany(type => code_entity_1.CodeEntity, code => code.company),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "codes", void 0);
CompanyEntity = __decorate([
    typeorm_1.Entity('nest_company')
], CompanyEntity);
exports.CompanyEntity = CompanyEntity;


/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const typeorm_1 = __webpack_require__(12);
const company_entity_1 = __webpack_require__(15);
const password_entity_1 = __webpack_require__(17);
let CompanyPasswordEntity = class CompanyPasswordEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CompanyPasswordEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CompanyPasswordEntity.prototype, "pwd", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CompanyPasswordEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], CompanyPasswordEntity.prototype, "has_threshold", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], CompanyPasswordEntity.prototype, "threshold", void 0);
__decorate([
    typeorm_1.ManyToOne(type => password_entity_1.PasswordEntity, password => password.passwords),
    __metadata("design:type", typeof (_a = typeof password_entity_1.PasswordEntity !== "undefined" && password_entity_1.PasswordEntity) === "function" ? _a : Object)
], CompanyPasswordEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.ManyToOne(type => company_entity_1.CompanyEntity, company => company.id),
    __metadata("design:type", typeof (_b = typeof company_entity_1.CompanyEntity !== "undefined" && company_entity_1.CompanyEntity) === "function" ? _b : Object)
], CompanyPasswordEntity.prototype, "company", void 0);
CompanyPasswordEntity = __decorate([
    typeorm_1.Entity('nest_company_password')
], CompanyPasswordEntity);
exports.CompanyPasswordEntity = CompanyPasswordEntity;


/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const typeorm_1 = __webpack_require__(12);
const company_password_entity_1 = __webpack_require__(16);
let PasswordEntity = class PasswordEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PasswordEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PasswordEntity.prototype, "code", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PasswordEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PasswordEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.OneToMany(type => company_password_entity_1.CompanyPasswordEntity, password => password.password),
    __metadata("design:type", Array)
], PasswordEntity.prototype, "passwords", void 0);
PasswordEntity = __decorate([
    typeorm_1.Entity('nest_password')
], PasswordEntity);
exports.PasswordEntity = PasswordEntity;


/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const typeorm_1 = __webpack_require__(12);
const company_entity_1 = __webpack_require__(15);
let EmailEntity = class EmailEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], EmailEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], EmailEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], EmailEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], EmailEntity.prototype, "store_location", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], EmailEntity.prototype, "subject_line", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], EmailEntity.prototype, "name_format", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], EmailEntity.prototype, "body", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], EmailEntity.prototype, "active", void 0);
__decorate([
    typeorm_1.ManyToOne(type => company_entity_1.CompanyEntity, company => company.id),
    __metadata("design:type", typeof (_a = typeof company_entity_1.CompanyEntity !== "undefined" && company_entity_1.CompanyEntity) === "function" ? _a : Object)
], EmailEntity.prototype, "company", void 0);
EmailEntity = __decorate([
    typeorm_1.Entity('nest_email')
], EmailEntity);
exports.EmailEntity = EmailEntity;


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const typeorm_1 = __webpack_require__(12);
const company_entity_1 = __webpack_require__(15);
let AppsEntity = class AppsEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AppsEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AppsEntity.prototype, "type", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AppsEntity.prototype, "app_id", void 0);
__decorate([
    typeorm_1.Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], AppsEntity.prototype, "expire_date", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], AppsEntity.prototype, "first_time_status", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AppsEntity.prototype, "menu_password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], AppsEntity.prototype, "active", void 0);
__decorate([
    typeorm_1.ManyToOne(type => company_entity_1.CompanyEntity, company => company.apps),
    __metadata("design:type", typeof (_b = typeof company_entity_1.CompanyEntity !== "undefined" && company_entity_1.CompanyEntity) === "function" ? _b : Object)
], AppsEntity.prototype, "companies", void 0);
AppsEntity = __decorate([
    typeorm_1.Entity('apps')
], AppsEntity);
exports.AppsEntity = AppsEntity;


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const typeorm_1 = __webpack_require__(12);
const company_entity_1 = __webpack_require__(15);
class Company {
}
exports.Company = Company;
let UUIDEntity = class UUIDEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UUIDEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], UUIDEntity.prototype, "unique_id", void 0);
__decorate([
    typeorm_1.Column({ default: "" }),
    __metadata("design:type", String)
], UUIDEntity.prototype, "uuid", void 0);
__decorate([
    typeorm_1.Column({ default: "" }),
    __metadata("design:type", String)
], UUIDEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ default: "" }),
    __metadata("design:type", String)
], UUIDEntity.prototype, "last_date_verified", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], UUIDEntity.prototype, "verified", void 0);
__decorate([
    typeorm_1.Column({ default: "" }),
    __metadata("design:type", String)
], UUIDEntity.prototype, "version", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], UUIDEntity.prototype, "active", void 0);
__decorate([
    typeorm_1.ManyToOne(type => company_entity_1.CompanyEntity, company => company.id),
    __metadata("design:type", typeof (_a = typeof company_entity_1.CompanyEntity !== "undefined" && company_entity_1.CompanyEntity) === "function" ? _a : Object)
], UUIDEntity.prototype, "company", void 0);
UUIDEntity = __decorate([
    typeorm_1.Entity('nest_uuid')
], UUIDEntity);
exports.UUIDEntity = UUIDEntity;


/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const typeorm_1 = __webpack_require__(12);
const role_menu_entity_1 = __webpack_require__(22);
const company_entity_1 = __webpack_require__(15);
const permission_enum_1 = __webpack_require__(23);
const menu_entity_1 = __webpack_require__(25);
let CompanyMenuEntity = class CompanyMenuEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CompanyMenuEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: permission_enum_1.Permission,
        default: permission_enum_1.Permission.None,
    }),
    __metadata("design:type", typeof (_a = typeof permission_enum_1.Permission !== "undefined" && permission_enum_1.Permission) === "function" ? _a : Object)
], CompanyMenuEntity.prototype, "permission", void 0);
__decorate([
    typeorm_1.ManyToOne(type => menu_entity_1.MenuEntity, menu => menu.id),
    __metadata("design:type", typeof (_b = typeof menu_entity_1.MenuEntity !== "undefined" && menu_entity_1.MenuEntity) === "function" ? _b : Object)
], CompanyMenuEntity.prototype, "menu", void 0);
__decorate([
    typeorm_1.ManyToOne(type => company_entity_1.CompanyEntity, company => company.id),
    __metadata("design:type", typeof (_c = typeof company_entity_1.CompanyEntity !== "undefined" && company_entity_1.CompanyEntity) === "function" ? _c : Object)
], CompanyMenuEntity.prototype, "company", void 0);
__decorate([
    typeorm_1.OneToMany(type => role_menu_entity_1.RoleMenuEntity, role => role.menu),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], CompanyMenuEntity.prototype, "roles", void 0);
CompanyMenuEntity = __decorate([
    typeorm_1.Entity('nest_company_menu_1')
], CompanyMenuEntity);
exports.CompanyMenuEntity = CompanyMenuEntity;


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const typeorm_1 = __webpack_require__(12);
const company_menu_entity_1 = __webpack_require__(21);
const permission_enum_1 = __webpack_require__(23);
const company_role_entity_1 = __webpack_require__(24);
let RoleMenuEntity = class RoleMenuEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], RoleMenuEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => company_role_entity_1.CompanyRoleEntity, role => role.menus),
    __metadata("design:type", typeof (_a = typeof company_role_entity_1.CompanyRoleEntity !== "undefined" && company_role_entity_1.CompanyRoleEntity) === "function" ? _a : Object)
], RoleMenuEntity.prototype, "role", void 0);
__decorate([
    typeorm_1.ManyToOne(type => company_menu_entity_1.CompanyMenuEntity, menu => menu.roles),
    __metadata("design:type", typeof (_b = typeof company_menu_entity_1.CompanyMenuEntity !== "undefined" && company_menu_entity_1.CompanyMenuEntity) === "function" ? _b : Object)
], RoleMenuEntity.prototype, "menu", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: permission_enum_1.Permission,
        default: permission_enum_1.Permission.None,
    }),
    __metadata("design:type", typeof (_c = typeof permission_enum_1.Permission !== "undefined" && permission_enum_1.Permission) === "function" ? _c : Object)
], RoleMenuEntity.prototype, "permission", void 0);
RoleMenuEntity = __decorate([
    typeorm_1.Entity('nest_role_menu')
], RoleMenuEntity);
exports.RoleMenuEntity = RoleMenuEntity;


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var Permission;
(function (Permission) {
    Permission["None"] = "none";
    Permission["View"] = "view";
    Permission["Read"] = "read";
    Permission["Write"] = "write";
})(Permission = exports.Permission || (exports.Permission = {}));


/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const typeorm_1 = __webpack_require__(12);
const company_entity_1 = __webpack_require__(15);
const user_entity_1 = __webpack_require__(13);
const role_menu_entity_1 = __webpack_require__(22);
let CompanyRoleEntity = class CompanyRoleEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CompanyRoleEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => company_entity_1.CompanyEntity, company => company.id),
    __metadata("design:type", typeof (_a = typeof company_entity_1.CompanyEntity !== "undefined" && company_entity_1.CompanyEntity) === "function" ? _a : Object)
], CompanyRoleEntity.prototype, "company", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], CompanyRoleEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], CompanyRoleEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], CompanyRoleEntity.prototype, "active", void 0);
__decorate([
    typeorm_1.OneToMany(type => role_menu_entity_1.RoleMenuEntity, menu => menu.role),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], CompanyRoleEntity.prototype, "menus", void 0);
__decorate([
    typeorm_1.OneToMany(type => user_entity_1.UserEntity, user => user.role),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], CompanyRoleEntity.prototype, "users", void 0);
CompanyRoleEntity = __decorate([
    typeorm_1.Entity('nest_company_role')
], CompanyRoleEntity);
exports.CompanyRoleEntity = CompanyRoleEntity;


/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const typeorm_1 = __webpack_require__(12);
const company_menu_entity_1 = __webpack_require__(21);
const user_menu_entity_1 = __webpack_require__(26);
let MenuEntity = class MenuEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], MenuEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], MenuEntity.prototype, "link", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], MenuEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.OneToMany(type => company_menu_entity_1.CompanyMenuEntity, menu => menu.menu),
    __metadata("design:type", Array)
], MenuEntity.prototype, "company_menus", void 0);
__decorate([
    typeorm_1.OneToMany(type => user_menu_entity_1.UserMenuEntity, menu => menu.menu),
    __metadata("design:type", Array)
], MenuEntity.prototype, "user_menus", void 0);
MenuEntity = __decorate([
    typeorm_1.Entity('nest_menu')
], MenuEntity);
exports.MenuEntity = MenuEntity;


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const typeorm_1 = __webpack_require__(12);
const permission_enum_1 = __webpack_require__(23);
const menu_entity_1 = __webpack_require__(25);
const user_entity_1 = __webpack_require__(13);
let UserMenuEntity = class UserMenuEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserMenuEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: permission_enum_1.Permission,
        default: permission_enum_1.Permission.None,
    }),
    __metadata("design:type", typeof (_a = typeof permission_enum_1.Permission !== "undefined" && permission_enum_1.Permission) === "function" ? _a : Object)
], UserMenuEntity.prototype, "permission", void 0);
__decorate([
    typeorm_1.ManyToOne(type => menu_entity_1.MenuEntity, menu => menu.id),
    __metadata("design:type", typeof (_b = typeof menu_entity_1.MenuEntity !== "undefined" && menu_entity_1.MenuEntity) === "function" ? _b : Object)
], UserMenuEntity.prototype, "menu", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.UserEntity, user => user.id),
    __metadata("design:type", typeof (_c = typeof user_entity_1.UserEntity !== "undefined" && user_entity_1.UserEntity) === "function" ? _c : Object)
], UserMenuEntity.prototype, "user", void 0);
UserMenuEntity = __decorate([
    typeorm_1.Entity('nest_user_menu')
], UserMenuEntity);
exports.UserMenuEntity = UserMenuEntity;


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const typeorm_1 = __webpack_require__(12);
const company_entity_1 = __webpack_require__(15);
class Code {
}
exports.Code = Code;
let CodeEntity = class CodeEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CodeEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], CodeEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], CodeEntity.prototype, "content", void 0);
__decorate([
    typeorm_1.Column({ default: 'All' }),
    __metadata("design:type", String)
], CodeEntity.prototype, "page", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], CodeEntity.prototype, "active", void 0);
__decorate([
    typeorm_1.ManyToOne(type => company_entity_1.CompanyEntity, company => company.id),
    typeorm_1.JoinColumn(),
    __metadata("design:type", typeof (_a = typeof company_entity_1.CompanyEntity !== "undefined" && company_entity_1.CompanyEntity) === "function" ? _a : Object)
], CodeEntity.prototype, "company", void 0);
CodeEntity = __decorate([
    typeorm_1.Entity('nest_code')
], CodeEntity);
exports.CodeEntity = CodeEntity;


/***/ }),
/* 28 */
/***/ ((module) => {

"use strict";
module.exports = require("jsonwebtoken");

/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SECRET = 'secret-key';


/***/ }),
/* 30 */
/***/ ((module) => {

"use strict";
module.exports = require("class-validator");

/***/ }),
/* 31 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/common/exceptions/http.exception");

/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var create_user_dto_1 = __webpack_require__(33);
exports.CreateUserDto = create_user_dto_1.CreateUserDto;
var login_user_dto_1 = __webpack_require__(34);
exports.LoginUserDto = login_user_dto_1.LoginUserDto;
var update_user_dto_1 = __webpack_require__(35);
exports.UpdateUserDto = update_user_dto_1.UpdateUserDto;


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const class_validator_1 = __webpack_require__(30);
class CreateUserDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "company", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "active", void 0);
exports.CreateUserDto = CreateUserDto;


/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const class_validator_1 = __webpack_require__(30);
class LoginUserDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "company", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "username", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);
exports.LoginUserDto = LoginUserDto;


/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const class_validator_1 = __webpack_require__(30);
class UpdateUserDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Boolean)
], UpdateUserDto.prototype, "active", void 0);
exports.UpdateUserDto = UpdateUserDto;


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const class_validator_1 = __webpack_require__(30);
const class_transformer_1 = __webpack_require__(37);
const http_exception_1 = __webpack_require__(31);
let ValidationPipe = class ValidationPipe {
    async transform(value, metadata) {
        if (!value) {
            throw new common_1.BadRequestException('No data submitted');
        }
        const { metatype } = metadata;
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = class_transformer_1.plainToClass(metatype, value);
        const errors = await class_validator_1.validate(object);
        if (errors.length > 0) {
            throw new http_exception_1.HttpException({ message: 'Input data validation failed', errors: this.buildError(errors) }, common_1.HttpStatus.BAD_REQUEST);
        }
        return value;
    }
    buildError(errors) {
        const result = {};
        errors.forEach(el => {
            let prop = el.property;
            Object.entries(el.constraints).forEach(constraint => {
                result[prop + constraint[0]] = `${constraint[1]}`;
            });
        });
        return result;
    }
    toValidate(metatype) {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find((type) => metatype === type);
    }
};
ValidationPipe = __decorate([
    common_1.Injectable()
], ValidationPipe);
exports.ValidationPipe = ValidationPipe;


/***/ }),
/* 37 */
/***/ ((module) => {

"use strict";
module.exports = require("class-transformer");

/***/ }),
/* 38 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/swagger");

/***/ }),
/* 39 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/platform-express");

/***/ }),
/* 40 */
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),
/* 41 */
/***/ ((module) => {

"use strict";
module.exports = require("multer");

/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const http_exception_1 = __webpack_require__(31);
const common_1 = __webpack_require__(6);
const jwt = __webpack_require__(28);
const config_1 = __webpack_require__(29);
const user_service_1 = __webpack_require__(10);
const adminuser_service_1 = __webpack_require__(43);
let AuthMiddleware = class AuthMiddleware {
    constructor(userService, adminuserService) {
        this.userService = userService;
        this.adminuserService = adminuserService;
    }
    async use(req, res, next) {
        const authHeaders = req.headers.authorization;
        if (authHeaders && authHeaders.split(' ')[1]) {
            const token = authHeaders.split(' ')[1];
            const decoded = jwt.verify(token, config_1.SECRET);
            let handled = false;
            if (decoded.isAdmin) {
                const user = await this.adminuserService.find(decoded.id);
                if (user && user.item.token == token) {
                    handled = true;
                    req.user = user.item;
                    next();
                }
                else {
                    if (!user) {
                        throw new http_exception_1.HttpException('User not found.', common_1.HttpStatus.UNAUTHORIZED);
                    }
                    else {
                        throw new http_exception_1.HttpException('Session expired', 905);
                    }
                }
            }
            else {
                const user = await this.userService.find(decoded.id);
                if (user && user.item.token) {
                    handled = true;
                    req.user = user.item;
                    next();
                }
                else {
                    if (!user) {
                        throw new http_exception_1.HttpException('User not found.', common_1.HttpStatus.UNAUTHORIZED);
                    }
                    else {
                        throw new http_exception_1.HttpException('Session expired', 905);
                    }
                }
            }
            if (!handled) {
                throw new http_exception_1.HttpException('User not found.', common_1.HttpStatus.UNAUTHORIZED);
            }
        }
        else {
            throw new http_exception_1.HttpException('Not authorized.', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
AuthMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof adminuser_service_1.AdminuserService !== "undefined" && adminuser_service_1.AdminuserService) === "function" ? _b : Object])
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;


/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(12);
const adminuser_entity_1 = __webpack_require__(44);
const jwt = __webpack_require__(28);
const config_1 = __webpack_require__(29);
const class_validator_1 = __webpack_require__(30);
const http_exception_1 = __webpack_require__(31);
const common_2 = __webpack_require__(6);
const argon2 = __webpack_require__(14);
const roles_entity_1 = __webpack_require__(45);
let AdminuserService = class AdminuserService {
    constructor(userRepository, rolesRepository) {
        this.userRepository = userRepository;
        this.rolesRepository = rolesRepository;
    }
    async findAll() {
        const qb = await typeorm_2.getRepository(adminuser_entity_1.AdminuserEntity)
            .createQueryBuilder('adminuser')
            .leftJoinAndSelect('adminuser.roles', 'roles');
        const users = await qb.getMany();
        return { items: users, totalCount: users.length };
    }
    async find(id) {
        const qb = await typeorm_2.getRepository(adminuser_entity_1.AdminuserEntity)
            .createQueryBuilder('adminuser')
            .leftJoinAndSelect('adminuser.roles', 'roles');
        const user = await qb.where({ id: id }).getOne();
        user.role = user.roles.name.toLowerCase();
        user.email = user.email;
        if (!user) {
            return {
                status: common_2.HttpStatus.BAD_REQUEST,
                message: 'There is not user.'
            };
        }
        return { item: user };
    }
    async findOne({ username, password }) {
        const qb = await typeorm_2.getRepository(adminuser_entity_1.AdminuserEntity)
            .createQueryBuilder('adminuser')
            .leftJoinAndSelect('adminuser.roles', 'roles');
        const user = await qb.where({ username: username }).getOne();
        if (!user) {
            return null;
        }
        user.role = user.roles.name.toLowerCase();
        user.email = user.email;
        if (await argon2.verify(user.password, password)) {
            return user;
        }
        return null;
    }
    async create(dto) {
        const { username, email, password, position, firstname, lastname, role, birthday, active, mobile } = dto;
        const qb = await typeorm_2.getRepository(adminuser_entity_1.AdminuserEntity)
            .createQueryBuilder('adminuser')
            .where('adminuser.username = :username', { username })
            .orWhere('adminuser.email = :email', { email });
        const user = await qb.getOne();
        if (user) {
            return {
                status: common_2.HttpStatus.BAD_REQUEST,
                message: 'Username and email must be unique.'
            };
        }
        let newUser = new adminuser_entity_1.AdminuserEntity();
        newUser.username = username;
        newUser.email = email;
        newUser.password = password;
        newUser.active = active;
        newUser.role = role;
        newUser.firstname = firstname;
        newUser.lastname = lastname;
        newUser.position = position;
        newUser.birthday = birthday;
        newUser.mobile = mobile;
        const errors = await class_validator_1.validate(newUser);
        if (errors.length > 0) {
            return {
                status: common_2.HttpStatus.BAD_REQUEST,
                message: 'Userinput is not valid.'
            };
        }
        else {
            const savedUser = await this.userRepository.save(newUser);
            const roles = await this.rolesRepository.findOne({ where: { id: dto.roles }, relations: ['adminusers'] });
            roles.adminusers.push(newUser);
            await this.rolesRepository.save(roles);
            return { user: savedUser };
        }
    }
    async update(id, dto) {
        let user = await this.userRepository.findOne(id);
        if (!user) {
            return {
                status: common_2.HttpStatus.BAD_REQUEST,
                message: 'There is not user.'
            };
        }
        user.role = dto.role;
        user.birthday = dto.birthday;
        user.firstname = dto.firstname;
        user.lastname = dto.lastname;
        user.position = dto.position;
        user.email = dto.email;
        user.active = dto.active;
        if (dto.mobile && dto.mobile != "") {
            user.mobile = dto.mobile;
        }
        if (dto.photo && dto.photo != "") {
            user.photo = dto.photo;
        }
        if (dto.password && dto.password !== "") {
            user.password = await argon2.hash(dto.password);
        }
        await this.userRepository.update(id, user);
        const updated = await this.userRepository.findOne(id);
        return { item: updated };
    }
    async remove(id) {
        const user = await this.userRepository.findOne({ id: id });
        if (!user) {
            return {
                status: common_2.HttpStatus.BAD_REQUEST,
                message: 'There is not user.'
            };
        }
        return await this.userRepository.delete({ id: id });
    }
    async findById(id) {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            const errors = { User: 'admin user not found' };
            throw new http_exception_1.HttpException({ errors }, 401);
        }
        return this.buildUserRO(user);
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOne({ email: email });
        return this.buildUserRO(user);
    }
    async update_login(id, token) {
        let user = await this.userRepository.findOne(id);
        user.token = token;
        await this.userRepository.update(id, user);
        return await this.find(id);
    }
    generateJWT(user) {
        return jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            exp: new Date().getTime() / 1000 + 12 * 3600,
            isAdmin: true,
        }, config_1.SECRET);
    }
    ;
    buildUserRO(user) {
        const userRO = {
            id: user.id,
            username: user.username,
            email: user.email,
            token: this.generateJWT(user),
            role: user.role,
            active: user.active,
        };
        return { user: userRO };
    }
};
AdminuserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(adminuser_entity_1.AdminuserEntity)),
    __param(1, typeorm_1.InjectRepository(roles_entity_1.RolesEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], AdminuserService);
exports.AdminuserService = AdminuserService;


/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const typeorm_1 = __webpack_require__(12);
const class_validator_1 = __webpack_require__(30);
const argon2 = __webpack_require__(14);
const roles_entity_1 = __webpack_require__(45);
let AdminuserEntity = class AdminuserEntity {
    async hashPassword() {
        this.password = await argon2.hash(this.password);
        this.created = new Date;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AdminuserEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], AdminuserEntity.prototype, "token", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], AdminuserEntity.prototype, "ip_address", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AdminuserEntity.prototype, "username", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], AdminuserEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], AdminuserEntity.prototype, "photo", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], AdminuserEntity.prototype, "firstname", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], AdminuserEntity.prototype, "lastname", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], AdminuserEntity.prototype, "position", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], AdminuserEntity.prototype, "mobile", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], AdminuserEntity.prototype, "birthday", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AdminuserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], AdminuserEntity.prototype, "role", void 0);
__decorate([
    typeorm_1.Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], AdminuserEntity.prototype, "created", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], AdminuserEntity.prototype, "active", void 0);
__decorate([
    typeorm_1.ManyToOne(type => roles_entity_1.RolesEntity, roles => roles.adminusers),
    __metadata("design:type", typeof (_b = typeof roles_entity_1.RolesEntity !== "undefined" && roles_entity_1.RolesEntity) === "function" ? _b : Object)
], AdminuserEntity.prototype, "roles", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminuserEntity.prototype, "hashPassword", null);
AdminuserEntity = __decorate([
    typeorm_1.Entity('admin_user')
], AdminuserEntity);
exports.AdminuserEntity = AdminuserEntity;


/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const typeorm_1 = __webpack_require__(12);
const adminuser_entity_1 = __webpack_require__(44);
let RolesEntity = class RolesEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], RolesEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], RolesEntity.prototype, "code", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], RolesEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], RolesEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.OneToMany(type => adminuser_entity_1.AdminuserEntity, adminuser => adminuser.roles),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], RolesEntity.prototype, "adminusers", void 0);
RolesEntity = __decorate([
    typeorm_1.Entity('admin_roles')
], RolesEntity);
exports.RolesEntity = RolesEntity;


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const company_service_1 = __webpack_require__(47);
const company_controller_1 = __webpack_require__(48);
const typeorm_1 = __webpack_require__(11);
const company_entity_1 = __webpack_require__(15);
const auth_middleware_1 = __webpack_require__(42);
const user_entity_1 = __webpack_require__(13);
const user_service_1 = __webpack_require__(10);
const adminuser_entity_1 = __webpack_require__(44);
const adminuser_service_1 = __webpack_require__(43);
const password_entity_1 = __webpack_require__(17);
const email_entity_1 = __webpack_require__(18);
const roles_entity_1 = __webpack_require__(45);
let CompanyModule = class CompanyModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'company', method: common_1.RequestMethod.GET }, { path: 'company/:id', method: common_1.RequestMethod.PUT }, { path: 'company', method: common_1.RequestMethod.POST }, { path: 'company/enable/:id', method: common_1.RequestMethod.POST }, { path: 'company/permission/:id', method: common_1.RequestMethod.POST }, { path: 'company/:id', method: common_1.RequestMethod.DELETE }, { path: 'company/:id', method: common_1.RequestMethod.GET });
    }
};
CompanyModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([company_entity_1.CompanyEntity, user_entity_1.UserEntity, password_entity_1.PasswordEntity, email_entity_1.EmailEntity, adminuser_entity_1.AdminuserEntity, roles_entity_1.RolesEntity])],
        controllers: [company_controller_1.CompanyController],
        providers: [company_service_1.CompanyService, user_service_1.UserService, adminuser_service_1.AdminuserService]
    })
], CompanyModule);
exports.CompanyModule = CompanyModule;


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(11);
const class_validator_1 = __webpack_require__(30);
const typeorm_2 = __webpack_require__(12);
const company_menu_entity_1 = __webpack_require__(21);
const menu_entity_1 = __webpack_require__(25);
const password_entity_1 = __webpack_require__(17);
const company_entity_1 = __webpack_require__(15);
let CompanyService = class CompanyService {
    constructor(companyRepository) {
        this.companyRepository = companyRepository;
    }
    async create(createCompanyDto) {
        const { name, app_id, number, code } = createCompanyDto;
        let qb = await typeorm_2.getRepository(company_entity_1.CompanyEntity)
            .createQueryBuilder('company')
            .where('company.name = :name', { name })
            .orWhere('company.app_id = :app_id', { app_id });
        let company = await qb.getOne();
        if (company) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Name must be unique.'
            };
        }
        qb = await typeorm_2.getRepository(company_entity_1.CompanyEntity)
            .createQueryBuilder('company')
            .where('company.number = :number', { number });
        company = await qb.getOne();
        if (company) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Company # must be unique.'
            };
        }
        let newCompany = new company_entity_1.CompanyEntity();
        newCompany.number = number;
        newCompany.app_id = app_id;
        newCompany.name = name;
        newCompany.expire_date = createCompanyDto.expire_date;
        newCompany.first_time_status = createCompanyDto.first_time_status;
        newCompany.menu_password = createCompanyDto.menu_password;
        newCompany.active = createCompanyDto.active;
        newCompany.code = code;
        newCompany.timeout = createCompanyDto.timeout;
        const errors = await class_validator_1.validate(newCompany);
        if (errors.length > 0) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: errors
            };
        }
        else {
            const savedCompany = await this.companyRepository.save(newCompany);
            return { company: savedCompany };
        }
    }
    async findAll() {
        const items = await this.companyRepository
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.menus', 'menus')
            .leftJoinAndSelect('menus.menu', 'menu')
            .getMany();
        return { items: items, totalCount: items.length };
    }
    async findOne(id) {
        const company = await this.companyRepository
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.enabled', 'enabled')
            .leftJoinAndSelect('company.menus', 'menus')
            .leftJoinAndSelect('menus.menu', 'menu')
            .where('company.id=:id', { id: id })
            .getOne();
        if (!company) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not company.'
            };
        }
        return { item: company };
    }
    async update(id, updateCompanyDto) {
        const company = await this.companyRepository.findOne({ id: id });
        if (!company) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not company.'
            };
        }
        await this.companyRepository.update(id, updateCompanyDto);
        const updated = await this.companyRepository.findOne({ id: id });
        return { company: updated };
    }
    async remove(id) {
        const company = await this.companyRepository.findOne({ id: id });
        if (!company) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not company.'
            };
        }
        return await this.companyRepository.delete({ id: id });
    }
    async updatePermission(id, dto) {
        var company = await this.companyRepository
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.menus', 'menus')
            .where('company.id=:id', { id: id })
            .getOne();
        if (!company) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not company.'
            };
        }
        for (let i = 0; i < dto.length; i++) {
            const one = dto[i];
            const permission = one.permission;
            const menu_entity = await typeorm_2.getRepository(menu_entity_1.MenuEntity)
                .createQueryBuilder('menu')
                .leftJoinAndSelect('menu.company_menus', 'company_menus')
                .where('menu.id=:id', { id: one.id })
                .getOne();
            if (!menu_entity)
                return;
            var company_menu_entity = await typeorm_2.getRepository(company_menu_entity_1.CompanyMenuEntity)
                .createQueryBuilder('company_menu')
                .leftJoinAndSelect('company_menu.company', 'company')
                .leftJoinAndSelect('company_menu.menu', 'menu')
                .where('company.id=:id', { id: id })
                .andWhere('menu.id=:mid', { mid: one.id })
                .getOne();
            if (company_menu_entity) {
                company_menu_entity.permission = permission;
                await typeorm_2.getRepository(company_menu_entity_1.CompanyMenuEntity).save(company_menu_entity);
            }
            else {
                company_menu_entity = new company_menu_entity_1.CompanyMenuEntity();
                company_menu_entity.permission = permission;
                const saved = await typeorm_2.getRepository(company_menu_entity_1.CompanyMenuEntity).save(company_menu_entity);
                menu_entity.company_menus.push(saved);
                await typeorm_2.getRepository(menu_entity_1.MenuEntity).save(menu_entity);
                company.menus.push(saved);
                company = await typeorm_2.getRepository(company_entity_1.CompanyEntity).save(company);
            }
        }
        const updated = await this.findOne(id);
        return { company: updated };
    }
    async enable(id, dto) {
        const company = await this.companyRepository
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.enabled', 'enabled')
            .where('company.id=:id', { id: id })
            .getOne();
        if (!company) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not company.'
            };
        }
        company.enabled = [];
        dto.forEach(one => {
            const password = new password_entity_1.PasswordEntity();
            password.id = one.id;
            password.code = one.code;
            password.description = one.description;
            password.name = one.name;
            company.enabled.push(password);
        });
        await this.companyRepository.save(company);
        const updated = await this.companyRepository
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.enabled', 'enabled')
            .where('company.id=:id', { id: id })
            .getOne();
        return { enabled: updated.enabled };
    }
};
CompanyService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(company_entity_1.CompanyEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], CompanyService);
exports.CompanyService = CompanyService;


/***/ }),
/* 48 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const role_enum_1 = __webpack_require__(49);
const roles_decorator_1 = __webpack_require__(50);
const company_service_1 = __webpack_require__(47);
const create_company_dto_1 = __webpack_require__(51);
const update_company_dto_1 = __webpack_require__(52);
let CompanyController = class CompanyController {
    constructor(companyService) {
        this.companyService = companyService;
    }
    async create(createCompanyDto) {
        return await this.companyService.create(createCompanyDto);
    }
    async permission(id, dto) {
        return await this.companyService.updatePermission(+id, dto);
    }
    async enable(id, dto) {
        return await this.companyService.enable(+id, dto);
    }
    async findAll() {
        return await this.companyService.findAll();
    }
    findOne(id) {
        return this.companyService.findOne(+id);
    }
    update(id, updateCompanyDto) {
        return this.companyService.update(+id, updateCompanyDto);
    }
    remove(id) {
        return this.companyService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    common_1.UsePipes(new common_1.ValidationPipe()),
    roles_decorator_1.Roles(role_enum_1.Role.Admin, role_enum_1.Role.Developer),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_company_dto_1.CreateCompanyDto !== "undefined" && create_company_dto_1.CreateCompanyDto) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "create", null);
__decorate([
    common_1.Post('permission/:id'),
    roles_decorator_1.Roles(role_enum_1.Role.Admin, role_enum_1.Role.Developer),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "permission", null);
__decorate([
    common_1.Post('enable/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "enable", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "findOne", null);
__decorate([
    common_1.Put(':id'),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof update_company_dto_1.UpdateCompanyDto !== "undefined" && update_company_dto_1.UpdateCompanyDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "remove", null);
CompanyController = __decorate([
    common_1.Controller('company'),
    __metadata("design:paramtypes", [typeof (_c = typeof company_service_1.CompanyService !== "undefined" && company_service_1.CompanyService) === "function" ? _c : Object])
], CompanyController);
exports.CompanyController = CompanyController;


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var Role;
(function (Role) {
    Role["Developer"] = "developer";
    Role["Admin"] = "admin";
    Role["Company"] = "company";
    Role["User"] = "user";
    Role["Sales"] = "sales";
    Role["Support"] = "support";
})(Role = exports.Role || (exports.Role = {}));


/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
exports.ROLES_KEY = 'roles';
exports.Roles = (...roles) => common_1.SetMetadata(exports.ROLES_KEY, roles);


/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class CreateCompanyDto {
}
exports.CreateCompanyDto = CreateCompanyDto;


/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class UpdateCompanyDto {
}
exports.UpdateCompanyDto = UpdateCompanyDto;


/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const adminuser_controller_1 = __webpack_require__(54);
const typeorm_1 = __webpack_require__(11);
const adminuser_entity_1 = __webpack_require__(44);
const adminuser_service_1 = __webpack_require__(43);
const auth_middleware_1 = __webpack_require__(59);
const roles_entity_1 = __webpack_require__(45);
const roles_module_1 = __webpack_require__(60);
let AdminuserModule = class AdminuserModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'adminuser/:id', method: common_1.RequestMethod.GET }, { path: 'adminuser/:id', method: common_1.RequestMethod.PUT }, { path: 'adminuser/:id', method: common_1.RequestMethod.DELETE }, { path: 'adminuser', method: common_1.RequestMethod.POST }, { path: 'uploadPhoto', method: common_1.RequestMethod.POST }, { path: 'adminuser', method: common_1.RequestMethod.GET });
    }
};
AdminuserModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([adminuser_entity_1.AdminuserEntity, roles_entity_1.RolesEntity]), roles_module_1.RolesModule],
        providers: [adminuser_service_1.AdminuserService],
        controllers: [
            adminuser_controller_1.AdminuserController
        ],
        exports: [adminuser_service_1.AdminuserService]
    })
], AdminuserModule);
exports.AdminuserModule = AdminuserModule;


/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const adminuser_service_1 = __webpack_require__(43);
const dto_1 = __webpack_require__(55);
const http_exception_1 = __webpack_require__(31);
const validation_pipe_1 = __webpack_require__(36);
const swagger_1 = __webpack_require__(38);
const platform_express_1 = __webpack_require__(39);
const path_1 = __webpack_require__(40);
const multer_1 = __webpack_require__(41);
let AdminuserController = class AdminuserController {
    constructor(userService) {
        this.userService = userService;
    }
    async login(loginUserDto) {
        const _user = await this.userService.findOne(loginUserDto);
        if (!_user)
            return new http_exception_1.HttpException('User not found or incorrect password.', common_1.HttpStatus.UNAUTHORIZED);
        if (!_user.active)
            return new http_exception_1.HttpException('Inactivated user.', common_1.HttpStatus.UNAUTHORIZED);
        const token = await this.userService.generateJWT(_user);
        const updated = await this.userService.update_login(_user.id, token);
        const user = Object.assign({ token }, updated.item);
        return { status: common_1.HttpStatus.OK, user };
    }
    async register(userData) {
        return this.userService.create(userData);
    }
    async getUsers() {
        return await this.userService.findAll();
    }
    async find(id) {
        return await this.userService.find(+id);
    }
    async create(userData) {
        return this.userService.create(userData);
    }
    async update(id, userData) {
        return await this.userService.update(+id, userData);
    }
    async delete(id) {
        return await this.userService.remove(+id);
    }
    async uploadPhoto(photo) {
        return photo;
    }
};
__decorate([
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    common_1.Post('auth/admin'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof dto_1.LoginAdminuserDto !== "undefined" && dto_1.LoginAdminuserDto) === "function" ? _a : Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], AdminuserController.prototype, "login", null);
__decorate([
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    common_1.Post('auth/adminregister'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof dto_1.CreateAdminuserDto !== "undefined" && dto_1.CreateAdminuserDto) === "function" ? _c : Object]),
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
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateAdminuserDto !== "undefined" && dto_1.CreateAdminuserDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AdminuserController.prototype, "create", null);
__decorate([
    common_1.Put('adminuser/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof dto_1.UpdateAdminuserDto !== "undefined" && dto_1.UpdateAdminuserDto) === "function" ? _e : Object]),
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
    common_1.Post("adminuser/uploadPhoto"),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminuserController.prototype, "uploadPhoto", null);
AdminuserController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags('adminuser'),
    common_1.Controller(),
    __metadata("design:paramtypes", [typeof (_f = typeof adminuser_service_1.AdminuserService !== "undefined" && adminuser_service_1.AdminuserService) === "function" ? _f : Object])
], AdminuserController);
exports.AdminuserController = AdminuserController;


/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var create_adminuser_dto_1 = __webpack_require__(56);
exports.CreateAdminuserDto = create_adminuser_dto_1.CreateAdminuserDto;
var login_adminuser_dto_1 = __webpack_require__(57);
exports.LoginAdminuserDto = login_adminuser_dto_1.LoginAdminuserDto;
var update_adminuser_dto_1 = __webpack_require__(58);
exports.UpdateAdminuserDto = update_adminuser_dto_1.UpdateAdminuserDto;


/***/ }),
/* 56 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const class_validator_1 = __webpack_require__(30);
class CreateAdminuserDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateAdminuserDto.prototype, "username", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateAdminuserDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateAdminuserDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Boolean)
], CreateAdminuserDto.prototype, "active", void 0);
exports.CreateAdminuserDto = CreateAdminuserDto;


/***/ }),
/* 57 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const class_validator_1 = __webpack_require__(30);
class LoginAdminuserDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], LoginAdminuserDto.prototype, "username", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], LoginAdminuserDto.prototype, "password", void 0);
exports.LoginAdminuserDto = LoginAdminuserDto;


/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const class_validator_1 = __webpack_require__(30);
class UpdateAdminuserDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Boolean)
], UpdateAdminuserDto.prototype, "active", void 0);
exports.UpdateAdminuserDto = UpdateAdminuserDto;


/***/ }),
/* 59 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const adminuser_service_1 = __webpack_require__(43);
let AuthMiddleware = class AuthMiddleware {
    constructor(userService) {
        this.userService = userService;
    }
    async use(req, res, next) {
        const authHeaders = req.headers.authorization;
        next();
    }
};
AuthMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof adminuser_service_1.AdminuserService !== "undefined" && adminuser_service_1.AdminuserService) === "function" ? _a : Object])
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;


/***/ }),
/* 60 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const roles_service_1 = __webpack_require__(61);
const roles_controller_1 = __webpack_require__(62);
const auth_middleware_1 = __webpack_require__(59);
const typeorm_1 = __webpack_require__(11);
const roles_entity_1 = __webpack_require__(45);
const adminuser_service_1 = __webpack_require__(43);
const adminuser_entity_1 = __webpack_require__(44);
let RolesModule = class RolesModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'roles', method: common_1.RequestMethod.GET }, { path: 'roles/:id', method: common_1.RequestMethod.PUT }, { path: 'roles', method: common_1.RequestMethod.POST }, { path: 'roles/:id', method: common_1.RequestMethod.DELETE }, { path: 'roles/:id', method: common_1.RequestMethod.GET });
    }
};
RolesModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([roles_entity_1.RolesEntity, adminuser_entity_1.AdminuserEntity])],
        controllers: [roles_controller_1.RolesController],
        providers: [roles_service_1.RolesService, adminuser_service_1.AdminuserService]
    })
], RolesModule);
exports.RolesModule = RolesModule;


/***/ }),
/* 61 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(11);
const class_validator_1 = __webpack_require__(30);
const typeorm_2 = __webpack_require__(12);
const adminuser_entity_1 = __webpack_require__(44);
const roles_entity_1 = __webpack_require__(45);
let RolesService = class RolesService {
    constructor(rolesRepository, userRepository) {
        this.rolesRepository = rolesRepository;
        this.userRepository = userRepository;
    }
    async create(createRolesDto) {
        const { name } = createRolesDto;
        const qb = await typeorm_2.getRepository(roles_entity_1.RolesEntity)
            .createQueryBuilder('roles')
            .where('roles.name = :name', { name });
        const role = await qb.getOne();
        if (role) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Role must be unique.'
            };
        }
        let newRole = new roles_entity_1.RolesEntity();
        newRole.code = '';
        newRole.name = createRolesDto.name;
        newRole.description = '';
        const errors = await class_validator_1.validate(newRole);
        if (errors.length > 0) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: errors
            };
        }
        else {
            const savedRole = await this.rolesRepository.save(newRole);
            return { item: savedRole };
        }
    }
    async findAll() {
        const roles = await this.rolesRepository.find();
        return { items: roles, totalCount: roles.length };
    }
    async findOne(id) {
        const role = await this.rolesRepository.findOne({ id: id });
        if (!role) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not Role.'
            };
        }
        return { item: role };
    }
    async update(id, updateRolesDto) {
        const role = await this.rolesRepository.findOne({ id: id });
        if (!role) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not Role.'
            };
        }
        await this.rolesRepository.update(id, updateRolesDto);
        const updated = await this.rolesRepository.findOne({ id: id });
        return { item: updated };
    }
    async remove(id) {
        const role = await this.rolesRepository.findOne({ id: id });
        if (!role) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not Role.'
            };
        }
        return await this.rolesRepository.delete({ id: id });
    }
};
RolesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(roles_entity_1.RolesEntity)),
    __param(1, typeorm_1.InjectRepository(adminuser_entity_1.AdminuserEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], RolesService);
exports.RolesService = RolesService;


/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const roles_service_1 = __webpack_require__(61);
const create_roles_dto_1 = __webpack_require__(63);
const update_roles_dto_1 = __webpack_require__(64);
let RolesController = class RolesController {
    constructor(rolesService) {
        this.rolesService = rolesService;
    }
    async create(createRolesDto) {
        return this.rolesService.create(createRolesDto);
    }
    async findAll() {
        return this.rolesService.findAll();
    }
    async findOne(id) {
        return this.rolesService.findOne(+id);
    }
    async update(id, updateRolesDto) {
        return this.rolesService.update(+id, updateRolesDto);
    }
    async remove(id) {
        return this.rolesService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_roles_dto_1.CreateRolesDto !== "undefined" && create_roles_dto_1.CreateRolesDto) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "findOne", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof update_roles_dto_1.UpdateRolesDto !== "undefined" && update_roles_dto_1.UpdateRolesDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "remove", null);
RolesController = __decorate([
    common_1.Controller('roles'),
    __metadata("design:paramtypes", [typeof (_c = typeof roles_service_1.RolesService !== "undefined" && roles_service_1.RolesService) === "function" ? _c : Object])
], RolesController);
exports.RolesController = RolesController;


/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const class_validator_1 = __webpack_require__(30);
class CreateRolesDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateRolesDto.prototype, "name", void 0);
exports.CreateRolesDto = CreateRolesDto;


/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const mapped_types_1 = __webpack_require__(65);
const create_roles_dto_1 = __webpack_require__(63);
class UpdateRolesDto extends mapped_types_1.PartialType(create_roles_dto_1.CreateRolesDto) {
}
exports.UpdateRolesDto = UpdateRolesDto;


/***/ }),
/* 65 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/mapped-types");

/***/ }),
/* 66 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const profile_controller_1 = __webpack_require__(67);
const typeorm_1 = __webpack_require__(11);
const profile_service_1 = __webpack_require__(68);
const user_module_1 = __webpack_require__(8);
const user_entity_1 = __webpack_require__(13);
const follows_entity_1 = __webpack_require__(69);
const auth_middleware_1 = __webpack_require__(42);
const adminuser_entity_1 = __webpack_require__(44);
const adminuser_module_1 = __webpack_require__(53);
let ProfileModule = class ProfileModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'profiles/:username/follow', method: common_1.RequestMethod.ALL });
    }
};
ProfileModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, follows_entity_1.FollowsEntity, adminuser_entity_1.AdminuserEntity]), user_module_1.UserModule, adminuser_module_1.AdminuserModule],
        providers: [profile_service_1.ProfileService],
        controllers: [
            profile_controller_1.ProfileController
        ],
        exports: []
    })
], ProfileModule);
exports.ProfileModule = ProfileModule;


/***/ }),
/* 67 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const profile_service_1 = __webpack_require__(68);
const user_decorator_1 = __webpack_require__(70);
const swagger_1 = __webpack_require__(38);
let ProfileController = class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
    async getProfile(userId, username) {
        return await this.profileService.findProfile(userId, username);
    }
    async follow(email, username) {
        return await this.profileService.follow(email, username);
    }
    async unFollow(userId, username) {
        return await this.profileService.unFollow(userId, username);
    }
};
__decorate([
    common_1.Get(':username'),
    __param(0, user_decorator_1.User('id')), __param(1, common_1.Param('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], ProfileController.prototype, "getProfile", null);
__decorate([
    common_1.Post(':username/follow'),
    __param(0, user_decorator_1.User('email')), __param(1, common_1.Param('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ProfileController.prototype, "follow", null);
__decorate([
    common_1.Delete(':username/follow'),
    __param(0, user_decorator_1.User('id')), __param(1, common_1.Param('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ProfileController.prototype, "unFollow", null);
ProfileController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags('profiles'),
    common_1.Controller('profiles'),
    __metadata("design:paramtypes", [typeof (_d = typeof profile_service_1.ProfileService !== "undefined" && profile_service_1.ProfileService) === "function" ? _d : Object])
], ProfileController);
exports.ProfileController = ProfileController;


/***/ }),
/* 68 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(12);
const user_entity_1 = __webpack_require__(13);
const follows_entity_1 = __webpack_require__(69);
const http_exception_1 = __webpack_require__(31);
let ProfileService = class ProfileService {
    constructor(userRepository, followsRepository) {
        this.userRepository = userRepository;
        this.followsRepository = followsRepository;
    }
    async findAll() {
        return await this.userRepository.find();
    }
    async findOne(options) {
        const user = await this.userRepository.findOne(options);
        delete user.id;
        if (user)
            delete user.password;
        return { profile: user };
    }
    async findProfile(id, followingUsername) {
        const _profile = await this.userRepository.findOne({ username: followingUsername });
        if (!_profile)
            return;
        let profile = {
            username: _profile.username,
        };
        const follows = await this.followsRepository.findOne({ followerId: id, followingId: _profile.id });
        if (id) {
            profile.following = !!follows;
        }
        return { profile };
    }
    async follow(followerEmail, username) {
        if (!followerEmail || !username) {
            throw new http_exception_1.HttpException('Follower email and username not provided.', common_1.HttpStatus.BAD_REQUEST);
        }
        const followingUser = await this.userRepository.findOne({ username });
        const followerUser = await this.userRepository.findOne({ email: followerEmail });
        if (followingUser.email === followerEmail) {
            throw new http_exception_1.HttpException('FollowerEmail and FollowingId cannot be equal.', common_1.HttpStatus.BAD_REQUEST);
        }
        const _follows = await this.followsRepository.findOne({ followerId: followerUser.id, followingId: followingUser.id });
        if (!_follows) {
            const follows = new follows_entity_1.FollowsEntity();
            follows.followerId = followerUser.id;
            follows.followingId = followingUser.id;
            await this.followsRepository.save(follows);
        }
        let profile = {
            username: followingUser.username,
            following: true
        };
        return { profile };
    }
    async unFollow(followerId, username) {
        if (!followerId || !username) {
            throw new http_exception_1.HttpException('FollowerId and username not provided.', common_1.HttpStatus.BAD_REQUEST);
        }
        const followingUser = await this.userRepository.findOne({ username });
        if (followingUser.id === followerId) {
            throw new http_exception_1.HttpException('FollowerId and FollowingId cannot be equal.', common_1.HttpStatus.BAD_REQUEST);
        }
        const followingId = followingUser.id;
        await this.followsRepository.delete({ followerId, followingId });
        let profile = {
            username: followingUser.username,
            following: false
        };
        return { profile };
    }
};
ProfileService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __param(1, typeorm_1.InjectRepository(follows_entity_1.FollowsEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], ProfileService);
exports.ProfileService = ProfileService;


/***/ }),
/* 69 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const typeorm_1 = __webpack_require__(12);
let FollowsEntity = class FollowsEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], FollowsEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], FollowsEntity.prototype, "followerId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], FollowsEntity.prototype, "followingId", void 0);
FollowsEntity = __decorate([
    typeorm_1.Entity('follows')
], FollowsEntity);
exports.FollowsEntity = FollowsEntity;


/***/ }),
/* 70 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(29);
const jwt = __webpack_require__(28);
exports.User = common_1.createParamDecorator((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    if (!!req.user) {
        return !!data ? req.user[data] : req.user;
    }
    const token = req.headers.authorization ? req.headers.authorization.split(' ') : null;
    if (token && token[1]) {
        const decoded = jwt.verify(token[1], config_1.SECRET);
        return !!data ? decoded[data] : decoded.user;
    }
});


/***/ }),
/* 71 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(11);
const user_module_1 = __webpack_require__(8);
const tag_service_1 = __webpack_require__(72);
const tag_entity_1 = __webpack_require__(73);
const tag_controller_1 = __webpack_require__(74);
let TagModule = class TagModule {
    configure(consumer) {
    }
};
TagModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([tag_entity_1.TagEntity]), user_module_1.UserModule],
        providers: [tag_service_1.TagService],
        controllers: [
            tag_controller_1.TagController
        ],
        exports: []
    })
], TagModule);
exports.TagModule = TagModule;


/***/ }),
/* 72 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(12);
const tag_entity_1 = __webpack_require__(73);
let TagService = class TagService {
    constructor(tagRepository) {
        this.tagRepository = tagRepository;
    }
    async findAll() {
        return await this.tagRepository.find();
    }
};
TagService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(tag_entity_1.TagEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], TagService);
exports.TagService = TagService;


/***/ }),
/* 73 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const typeorm_1 = __webpack_require__(12);
let TagEntity = class TagEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], TagEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TagEntity.prototype, "tag", void 0);
TagEntity = __decorate([
    typeorm_1.Entity('tag')
], TagEntity);
exports.TagEntity = TagEntity;


/***/ }),
/* 74 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const tag_service_1 = __webpack_require__(72);
const swagger_1 = __webpack_require__(38);
let TagController = class TagController {
    constructor(tagService) {
        this.tagService = tagService;
    }
    async findAll() {
        return await this.tagService.findAll();
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], TagController.prototype, "findAll", null);
TagController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags('tags'),
    common_1.Controller('tags'),
    __metadata("design:paramtypes", [typeof (_b = typeof tag_service_1.TagService !== "undefined" && tag_service_1.TagService) === "function" ? _b : Object])
], TagController);
exports.TagController = TagController;


/***/ }),
/* 75 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const screen_service_1 = __webpack_require__(76);
const screen_controller_1 = __webpack_require__(79);
const typeorm_1 = __webpack_require__(11);
const user_entity_1 = __webpack_require__(13);
const user_module_1 = __webpack_require__(8);
const screen_entity_1 = __webpack_require__(77);
const platform_express_1 = __webpack_require__(39);
const file_middleware_1 = __webpack_require__(80);
const file_util_1 = __webpack_require__(81);
let ScreenModule = class ScreenModule {
    configure(consumer) {
        consumer
            .apply(file_middleware_1.FileMiddleware)
            .forRoutes({ path: 'screens/upload', method: common_1.RequestMethod.POST });
    }
};
ScreenModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, screen_entity_1.ScreenEntity]),
            platform_express_1.MulterModule.register({
                dest: './uploads',
                fileFilter: file_util_1.imageFileFilter
            }),
            user_module_1.UserModule
        ],
        providers: [screen_service_1.ScreenService],
        controllers: [screen_controller_1.ScreenController]
    })
], ScreenModule);
exports.ScreenModule = ScreenModule;


/***/ }),
/* 76 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(12);
const user_entity_1 = __webpack_require__(13);
const screen_entity_1 = __webpack_require__(77);
let ScreenService = class ScreenService {
    constructor(screenRepository, userRepository) {
        this.screenRepository = screenRepository;
        this.userRepository = userRepository;
    }
    async findAll(query) {
        const qb = await typeorm_2.getRepository(screen_entity_1.ScreenEntity)
            .createQueryBuilder('screen')
            .leftJoinAndSelect('screen.user', 'user');
        qb.where("1 = 1");
        if ('user' in query) {
            const user = await this.userRepository.findOne({ id: query.user });
            qb.andWhere("screen.user = :id", { id: user.id });
        }
        if ('startTime' in query) {
            qb.andWhere("created >= :startTime", { startTime: query.startTime });
        }
        if ('endTime' in query) {
            qb.andWhere("created < :endTime", { endTime: query.endTime });
        }
        qb.orderBy('screen.created', 'ASC');
        if ('limit' in query) {
            qb.limit(query.limit);
        }
        if ('offset' in query) {
            qb.offset(query.offset);
        }
        const screens = await qb.getMany();
        const count = await screens.length;
        return { screens, count };
    }
    async findOne(where) {
        const screen = await this.screenRepository.findOne(where);
        return { screen };
    }
    async addScreen(params, photo) {
        let user = await this.userRepository.findOne(params.user, { select: ['id', 'username'] });
        const screen = new screen_entity_1.ScreenEntity();
        screen.device = params.device;
        screen.photo = photo.filename;
        screen.user = user;
        await this.screenRepository.save(screen);
        return { screen };
    }
};
ScreenService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(screen_entity_1.ScreenEntity)),
    __param(1, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], ScreenService);
exports.ScreenService = ScreenService;


/***/ }),
/* 77 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const typeorm_1 = __webpack_require__(12);
const device_entity_1 = __webpack_require__(78);
const user_entity_1 = __webpack_require__(13);
let ScreenEntity = class ScreenEntity {
    createDateTime() {
        this.created = new Date;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ScreenEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], ScreenEntity.prototype, "photo", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ScreenEntity.prototype, "created", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ScreenEntity.prototype, "createDateTime", null);
__decorate([
    typeorm_1.ManyToOne(type => device_entity_1.DeviceEntity, device => device.id),
    __metadata("design:type", String)
], ScreenEntity.prototype, "device", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.UserEntity, user => user.id),
    __metadata("design:type", typeof (_b = typeof user_entity_1.UserEntity !== "undefined" && user_entity_1.UserEntity) === "function" ? _b : Object)
], ScreenEntity.prototype, "user", void 0);
ScreenEntity = __decorate([
    typeorm_1.Entity('screen')
], ScreenEntity);
exports.ScreenEntity = ScreenEntity;


/***/ }),
/* 78 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const typeorm_1 = __webpack_require__(12);
const user_entity_1 = __webpack_require__(13);
let DeviceEntity = class DeviceEntity {
    createDateTime() {
        this.created = new Date;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], DeviceEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], DeviceEntity.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], DeviceEntity.prototype, "created", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DeviceEntity.prototype, "createDateTime", null);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.UserEntity, user => user.id),
    __metadata("design:type", typeof (_b = typeof user_entity_1.UserEntity !== "undefined" && user_entity_1.UserEntity) === "function" ? _b : Object)
], DeviceEntity.prototype, "user", void 0);
DeviceEntity = __decorate([
    typeorm_1.Entity('device')
], DeviceEntity);
exports.DeviceEntity = DeviceEntity;


/***/ }),
/* 79 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const multer_1 = __webpack_require__(41);
const swagger_1 = __webpack_require__(38);
const screen_service_1 = __webpack_require__(76);
const platform_express_1 = __webpack_require__(39);
const path_1 = __webpack_require__(40);
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
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
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
    __metadata("design:paramtypes", [typeof (_b = typeof screen_service_1.ScreenService !== "undefined" && screen_service_1.ScreenService) === "function" ? _b : Object])
], ScreenController);
exports.ScreenController = ScreenController;


/***/ }),
/* 80 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
let FileMiddleware = class FileMiddleware {
    use(req, res, next) {
        res = req.Body;
        next();
    }
};
FileMiddleware = __decorate([
    common_1.Injectable()
], FileMiddleware);
exports.FileMiddleware = FileMiddleware;


/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const path_1 = __webpack_require__(40);
exports.imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};
exports.editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = path_1.extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};


/***/ }),
/* 82 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const device_service_1 = __webpack_require__(83);
const device_controller_1 = __webpack_require__(84);
let DeviceModule = class DeviceModule {
};
DeviceModule = __decorate([
    common_1.Module({
        controllers: [device_controller_1.DeviceController],
        providers: [device_service_1.DeviceService]
    })
], DeviceModule);
exports.DeviceModule = DeviceModule;


/***/ }),
/* 83 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
let DeviceService = class DeviceService {
    create(createDeviceDto) {
        return 'This action adds a new device';
    }
    findAll() {
        return `This action returns all device`;
    }
    findOne(id) {
        return `This action returns a #${id} device`;
    }
    update(id, updateDeviceDto) {
        return `This action updates a #${id} device`;
    }
    remove(id) {
        return `This action removes a #${id} device`;
    }
};
DeviceService = __decorate([
    common_1.Injectable()
], DeviceService);
exports.DeviceService = DeviceService;


/***/ }),
/* 84 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const device_service_1 = __webpack_require__(83);
const create_device_dto_1 = __webpack_require__(85);
const update_device_dto_1 = __webpack_require__(87);
let DeviceController = class DeviceController {
    constructor(deviceService) {
        this.deviceService = deviceService;
    }
    create(createDeviceDto) {
        return this.deviceService.create(createDeviceDto);
    }
    findAll() {
        return this.deviceService.findAll();
    }
    findOne(id) {
        return this.deviceService.findOne(+id);
    }
    update(id, updateDeviceDto) {
        return this.deviceService.update(+id, updateDeviceDto);
    }
    remove(id) {
        return this.deviceService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_device_dto_1.CreateDeviceDto !== "undefined" && create_device_dto_1.CreateDeviceDto) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "findOne", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof update_device_dto_1.UpdateDeviceDto !== "undefined" && update_device_dto_1.UpdateDeviceDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "remove", null);
DeviceController = __decorate([
    common_1.Controller('device'),
    __metadata("design:paramtypes", [typeof (_c = typeof device_service_1.DeviceService !== "undefined" && device_service_1.DeviceService) === "function" ? _c : Object])
], DeviceController);
exports.DeviceController = DeviceController;


/***/ }),
/* 85 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const decorators_1 = __webpack_require__(86);
class CreateDeviceDto {
}
__decorate([
    decorators_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateDeviceDto.prototype, "type", void 0);
__decorate([
    decorators_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateDeviceDto.prototype, "userId", void 0);
exports.CreateDeviceDto = CreateDeviceDto;


/***/ }),
/* 86 */
/***/ ((module) => {

"use strict";
module.exports = require("class-validator/decorator/decorators");

/***/ }),
/* 87 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const mapped_types_1 = __webpack_require__(65);
const decorators_1 = __webpack_require__(86);
const create_device_dto_1 = __webpack_require__(85);
class UpdateDeviceDto extends mapped_types_1.PartialType(create_device_dto_1.CreateDeviceDto) {
}
__decorate([
    decorators_1.IsNotEmpty(),
    __metadata("design:type", Number)
], UpdateDeviceDto.prototype, "id", void 0);
exports.UpdateDeviceDto = UpdateDeviceDto;


/***/ }),
/* 88 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const core_1 = __webpack_require__(4);
const roles_decorator_1 = __webpack_require__(50);
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        if (user == undefined) {
            return false;
        }
        return requiredRoles.some((role) => user.role == role);
    }
};
RolesGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);
exports.RolesGuard = RolesGuard;


/***/ }),
/* 89 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const uuid_service_1 = __webpack_require__(90);
const uuid_controller_1 = __webpack_require__(91);
const typeorm_1 = __webpack_require__(11);
const company_entity_1 = __webpack_require__(15);
const uuid_entity_1 = __webpack_require__(20);
const auth_middleware_1 = __webpack_require__(42);
const user_module_1 = __webpack_require__(8);
const adminuser_module_1 = __webpack_require__(53);
let UuidModule = class UuidModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'uuid/:id', method: common_1.RequestMethod.GET }, { path: 'uuid/:id', method: common_1.RequestMethod.PUT }, { path: 'uuid/:id', method: common_1.RequestMethod.DELETE }, { path: 'uuid', method: common_1.RequestMethod.POST }, { path: 'uuid/company/:id', method: common_1.RequestMethod.GET });
    }
};
UuidModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([uuid_entity_1.UUIDEntity, company_entity_1.CompanyEntity]), user_module_1.UserModule, adminuser_module_1.AdminuserModule],
        controllers: [uuid_controller_1.UuidController],
        providers: [uuid_service_1.UuidService]
    })
], UuidModule);
exports.UuidModule = UuidModule;


/***/ }),
/* 90 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(11);
const class_validator_1 = __webpack_require__(30);
const typeorm_2 = __webpack_require__(12);
const company_entity_1 = __webpack_require__(15);
const uuid_entity_1 = __webpack_require__(20);
let UuidService = class UuidService {
    constructor(uuidRepository, companyRepository) {
        this.uuidRepository = uuidRepository;
        this.companyRepository = companyRepository;
    }
    async create(createUuidDto) {
        const qb = await typeorm_2.getRepository(uuid_entity_1.UUIDEntity)
            .createQueryBuilder('uuid')
            .where('uuid.uuid = :uuid', { uuid: createUuidDto.uuid });
        const uuid = await qb.getOne();
        if (uuid) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'UUID must be unique.'
            };
        }
        let newUuid = new uuid_entity_1.UUIDEntity();
        newUuid.uuid = createUuidDto.uuid;
        newUuid.description = createUuidDto.description;
        newUuid.last_date_verified = createUuidDto.last_date_verified;
        newUuid.version = createUuidDto.version;
        newUuid.active = createUuidDto.active;
        const errors = await class_validator_1.validate(newUuid);
        if (errors.length > 0) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Input is not valid.'
            };
        }
        else {
            const savedUuid = await this.uuidRepository.save(newUuid);
            const company = await this.companyRepository.findOne({ where: { id: createUuidDto.company }, relations: ['uuids'] });
            company.uuids.push(savedUuid);
            await this.companyRepository.save(company);
            return { status: common_1.HttpStatus.OK, item: savedUuid };
        }
    }
    async findAll(company) {
        const qb = await typeorm_2.getRepository(uuid_entity_1.UUIDEntity)
            .createQueryBuilder('uuid')
            .leftJoinAndSelect('uuid.company', 'company')
            .where('company.id = :id', { id: company });
        const uuids = await qb.getMany();
        return { items: uuids, totalCount: uuids.length };
    }
    async findOne(id) {
        const uuid = await this.uuidRepository.findOne({ id: id });
        if (!uuid) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not uuid.'
            };
        }
        return { item: uuid };
    }
    async update(id, updateUuidDto) {
        let uuid = await this.uuidRepository.findOne(id);
        if (!uuid) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not uuid.'
            };
        }
        uuid.last_date_verified = updateUuidDto.last_date_verified;
        uuid.description = updateUuidDto.description;
        uuid.version = updateUuidDto.version;
        uuid.active = updateUuidDto.active;
        await this.uuidRepository.update(id, uuid);
        const updated = await this.uuidRepository.findOne({ id: id });
        return { item: updated };
    }
    async remove(id) {
        const uuid = await this.uuidRepository.findOne({ id: id });
        if (!uuid) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not uuid.'
            };
        }
        return await this.uuidRepository.delete({ id: id });
    }
};
UuidService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(uuid_entity_1.UUIDEntity)),
    __param(1, typeorm_1.InjectRepository(company_entity_1.CompanyEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], UuidService);
exports.UuidService = UuidService;


/***/ }),
/* 91 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const uuid_service_1 = __webpack_require__(90);
const create_uuid_dto_1 = __webpack_require__(92);
const update_uuid_dto_1 = __webpack_require__(93);
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
    __metadata("design:paramtypes", [typeof (_a = typeof create_uuid_dto_1.CreateUuidDto !== "undefined" && create_uuid_dto_1.CreateUuidDto) === "function" ? _a : Object]),
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
    __metadata("design:paramtypes", [String, typeof (_b = typeof update_uuid_dto_1.UpdateUuidDto !== "undefined" && update_uuid_dto_1.UpdateUuidDto) === "function" ? _b : Object]),
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
    __metadata("design:paramtypes", [typeof (_c = typeof uuid_service_1.UuidService !== "undefined" && uuid_service_1.UuidService) === "function" ? _c : Object])
], UuidController);
exports.UuidController = UuidController;


/***/ }),
/* 92 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const class_validator_1 = __webpack_require__(30);
class CreateUuidDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateUuidDto.prototype, "uuid", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateUuidDto.prototype, "last_date_verified", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateUuidDto.prototype, "company", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Boolean)
], CreateUuidDto.prototype, "active", void 0);
exports.CreateUuidDto = CreateUuidDto;


/***/ }),
/* 93 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const mapped_types_1 = __webpack_require__(65);
const create_uuid_dto_1 = __webpack_require__(92);
class UpdateUuidDto extends mapped_types_1.PartialType(create_uuid_dto_1.CreateUuidDto) {
}
exports.UpdateUuidDto = UpdateUuidDto;


/***/ }),
/* 94 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const user_service_1 = __webpack_require__(10);
const user_entity_1 = __webpack_require__(13);
const adminuser_entity_1 = __webpack_require__(44);
const adminuser_service_1 = __webpack_require__(43);
const roles_entity_1 = __webpack_require__(45);
const company_entity_1 = __webpack_require__(15);
const apps_service_1 = __webpack_require__(95);
const apps_entity_1 = __webpack_require__(19);
const apps_controller_1 = __webpack_require__(96);
const auth_middleware_1 = __webpack_require__(42);
const typeorm_1 = __webpack_require__(11);
let AppsModule = class AppsModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'apps', method: common_1.RequestMethod.GET }, { path: 'apps/:id', method: common_1.RequestMethod.PUT }, { path: 'apps', method: common_1.RequestMethod.POST }, { path: 'apps/:id', method: common_1.RequestMethod.DELETE }, { path: 'apps/:id', method: common_1.RequestMethod.GET });
    }
};
AppsModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([apps_entity_1.AppsEntity, user_entity_1.UserEntity, company_entity_1.CompanyEntity, adminuser_entity_1.AdminuserEntity, roles_entity_1.RolesEntity])],
        controllers: [apps_controller_1.AppsController],
        providers: [apps_service_1.AppsService, user_service_1.UserService, adminuser_service_1.AdminuserService]
    })
], AppsModule);
exports.AppsModule = AppsModule;


/***/ }),
/* 95 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(12);
const apps_entity_1 = __webpack_require__(19);
const class_validator_1 = __webpack_require__(30);
let AppsService = class AppsService {
    constructor(appsRepository) {
        this.appsRepository = appsRepository;
    }
    async create(createAppsDto) {
        const { type } = createAppsDto;
        const qb = await typeorm_2.getRepository(apps_entity_1.AppsEntity)
            .createQueryBuilder('apps')
            .leftJoinAndSelect('apps.companies', 'companies')
            .where('apps.type = :type', { type });
        const apps = await qb.getOne();
        if (apps) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'App Type must be unique.'
            };
        }
        let newApps = new apps_entity_1.AppsEntity();
        newApps.type = createAppsDto.type;
        newApps.app_id = createAppsDto.app_id;
        newApps.expire_date = createAppsDto.expire_date;
        newApps.first_time_status = createAppsDto.first_time_status;
        newApps.menu_password = createAppsDto.menu_password;
        newApps.active = createAppsDto.active;
        const errors = await class_validator_1.validate(newApps);
        if (errors.length > 0) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Input is not valid.'
            };
        }
        else {
            const savedApps = await this.appsRepository.save(newApps);
            return { status: common_1.HttpStatus.OK, item: savedApps };
        }
    }
    async findAll() {
        const qb = await typeorm_2.getRepository(apps_entity_1.AppsEntity)
            .createQueryBuilder('apps')
            .leftJoinAndSelect('apps.companies', 'companies');
        const apps = await qb.getMany();
        return { items: apps, totalCount: apps.length };
    }
    async findOne(id) {
        const qb = await typeorm_2.getRepository(apps_entity_1.AppsEntity)
            .createQueryBuilder('apps')
            .leftJoinAndSelect('apps.companies', 'companies');
        const apps = await qb.where({ id: id }).getOne();
        if (!apps) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not app.'
            };
        }
        return { item: apps };
    }
    async update(id, updateAppsDto) {
        let apps = await this.appsRepository.findOne(id);
        if (!apps) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not apps.'
            };
        }
        apps.type = updateAppsDto.type;
        apps.app_id = updateAppsDto.app_id;
        apps.expire_date = updateAppsDto.expire_date;
        apps.first_time_status = updateAppsDto.first_time_status;
        apps.menu_password = updateAppsDto.menu_password;
        apps.active = updateAppsDto.active;
        await this.appsRepository.update(id, apps);
        const updated = await this.appsRepository.findOne({ id: id });
        return { item: updated };
    }
    async remove(id) {
        const apps = await this.appsRepository.findOne({ id: id });
        if (!apps) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not app.'
            };
        }
        return await this.appsRepository.delete({ id: id });
    }
};
AppsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(apps_entity_1.AppsEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], AppsService);
exports.AppsService = AppsService;


/***/ }),
/* 96 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const apps_service_1 = __webpack_require__(95);
const create_apps_dto_1 = __webpack_require__(97);
const update_apps_dto_1 = __webpack_require__(98);
let AppsController = class AppsController {
    constructor(appsService) {
        this.appsService = appsService;
    }
    async create(createAppsDto) {
        return this.appsService.create(createAppsDto);
    }
    async findAll() {
        return this.appsService.findAll();
    }
    async findOne(id) {
        return this.appsService.findOne(+id);
    }
    async update(id, updateAppsDto) {
        return this.appsService.update(+id, updateAppsDto);
    }
    async remove(id) {
        return this.appsService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_apps_dto_1.CreateAppsDto !== "undefined" && create_apps_dto_1.CreateAppsDto) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], AppsController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppsController.prototype, "findOne", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof update_apps_dto_1.UpdateAppsDto !== "undefined" && update_apps_dto_1.UpdateAppsDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AppsController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppsController.prototype, "remove", null);
AppsController = __decorate([
    common_1.Controller('apps'),
    __metadata("design:paramtypes", [typeof (_c = typeof apps_service_1.AppsService !== "undefined" && apps_service_1.AppsService) === "function" ? _c : Object])
], AppsController);
exports.AppsController = AppsController;


/***/ }),
/* 97 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const decorators_1 = __webpack_require__(86);
class CreateAppsDto {
}
__decorate([
    decorators_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateAppsDto.prototype, "type", void 0);
__decorate([
    decorators_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateAppsDto.prototype, "app_id", void 0);
__decorate([
    decorators_1.IsNotEmpty(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CreateAppsDto.prototype, "expire_date", void 0);
__decorate([
    decorators_1.IsNotEmpty(),
    __metadata("design:type", Boolean)
], CreateAppsDto.prototype, "first_time_status", void 0);
__decorate([
    decorators_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateAppsDto.prototype, "menu_password", void 0);
__decorate([
    decorators_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateAppsDto.prototype, "companies", void 0);
__decorate([
    decorators_1.IsNotEmpty(),
    __metadata("design:type", Boolean)
], CreateAppsDto.prototype, "active", void 0);
exports.CreateAppsDto = CreateAppsDto;


/***/ }),
/* 98 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const mapped_types_1 = __webpack_require__(65);
const decorators_1 = __webpack_require__(86);
const create_apps_dto_1 = __webpack_require__(97);
class UpdateAppsDto extends mapped_types_1.PartialType(create_apps_dto_1.CreateAppsDto) {
}
__decorate([
    decorators_1.IsNotEmpty(),
    __metadata("design:type", Number)
], UpdateAppsDto.prototype, "id", void 0);
exports.UpdateAppsDto = UpdateAppsDto;


/***/ }),
/* 99 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const password_service_1 = __webpack_require__(100);
const password_controller_1 = __webpack_require__(101);
const auth_middleware_1 = __webpack_require__(42);
const typeorm_1 = __webpack_require__(11);
const password_entity_1 = __webpack_require__(17);
const user_service_1 = __webpack_require__(10);
const user_entity_1 = __webpack_require__(13);
const company_entity_1 = __webpack_require__(15);
const adminuser_entity_1 = __webpack_require__(44);
const adminuser_service_1 = __webpack_require__(43);
const roles_entity_1 = __webpack_require__(45);
let PasswordModule = class PasswordModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'password', method: common_1.RequestMethod.GET }, { path: 'password/:id', method: common_1.RequestMethod.PUT }, { path: 'password', method: common_1.RequestMethod.POST }, { path: 'password/:id', method: common_1.RequestMethod.DELETE }, { path: 'password/:id', method: common_1.RequestMethod.GET });
    }
};
PasswordModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([password_entity_1.PasswordEntity, user_entity_1.UserEntity, company_entity_1.CompanyEntity, adminuser_entity_1.AdminuserEntity, roles_entity_1.RolesEntity])],
        controllers: [password_controller_1.PasswordController],
        providers: [password_service_1.PasswordService, user_service_1.UserService, adminuser_service_1.AdminuserService]
    })
], PasswordModule);
exports.PasswordModule = PasswordModule;


/***/ }),
/* 100 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(11);
const class_validator_1 = __webpack_require__(30);
const typeorm_2 = __webpack_require__(12);
const user_entity_1 = __webpack_require__(13);
const password_entity_1 = __webpack_require__(17);
let PasswordService = class PasswordService {
    constructor(passwordRepository, userRepository) {
        this.passwordRepository = passwordRepository;
        this.userRepository = userRepository;
    }
    async create(createPasswordDto) {
        const { code } = createPasswordDto;
        const qb = await typeorm_2.getRepository(password_entity_1.PasswordEntity)
            .createQueryBuilder('password')
            .where('password.code = :code', { code });
        const company = await qb.getOne();
        if (company) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Code must be unique.'
            };
        }
        let newPassword = new password_entity_1.PasswordEntity();
        newPassword.code = createPasswordDto.code;
        newPassword.name = createPasswordDto.name;
        newPassword.description = createPasswordDto.description;
        const errors = await class_validator_1.validate(newPassword);
        if (errors.length > 0) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: errors
            };
        }
        else {
            const savedPassword = await this.passwordRepository.save(newPassword);
            return { item: savedPassword };
        }
    }
    async findAll() {
        const passwords = await this.passwordRepository.find();
        return { items: passwords, totalCount: passwords.length };
    }
    async findOne(id) {
        const password = await this.passwordRepository.findOne({ id: id });
        if (!password) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not password.'
            };
        }
        return { item: password };
    }
    async update(id, updatePasswordDto) {
        const password = await this.passwordRepository.findOne({ id: id });
        if (!password) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not password.'
            };
        }
        await this.passwordRepository.update(id, updatePasswordDto);
        const updated = await this.passwordRepository.findOne({ id: id });
        return { item: updated };
    }
    async remove(id) {
        const password = await this.passwordRepository.findOne({ id: id });
        if (!password) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not password.'
            };
        }
        return await this.passwordRepository.delete({ id: id });
    }
};
PasswordService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(password_entity_1.PasswordEntity)),
    __param(1, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], PasswordService);
exports.PasswordService = PasswordService;


/***/ }),
/* 101 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const password_service_1 = __webpack_require__(100);
const create_password_dto_1 = __webpack_require__(102);
const update_password_dto_1 = __webpack_require__(103);
const role_enum_1 = __webpack_require__(49);
const roles_decorator_1 = __webpack_require__(50);
let PasswordController = class PasswordController {
    constructor(passwordService) {
        this.passwordService = passwordService;
    }
    async create(createPasswordDto) {
        return this.passwordService.create(createPasswordDto);
    }
    async findAll() {
        return this.passwordService.findAll();
    }
    async findOne(id) {
        return this.passwordService.findOne(+id);
    }
    async update(id, updatePasswordDto) {
        return this.passwordService.update(+id, updatePasswordDto);
    }
    async remove(id) {
        return this.passwordService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    common_1.UsePipes(new common_1.ValidationPipe()),
    roles_decorator_1.Roles(role_enum_1.Role.Admin, role_enum_1.Role.Developer),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_password_dto_1.CreatePasswordDto !== "undefined" && create_password_dto_1.CreatePasswordDto) === "function" ? _a : Object]),
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
    __metadata("design:paramtypes", [String, typeof (_b = typeof update_password_dto_1.UpdatePasswordDto !== "undefined" && update_password_dto_1.UpdatePasswordDto) === "function" ? _b : Object]),
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
    __metadata("design:paramtypes", [typeof (_c = typeof password_service_1.PasswordService !== "undefined" && password_service_1.PasswordService) === "function" ? _c : Object])
], PasswordController);
exports.PasswordController = PasswordController;


/***/ }),
/* 102 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const class_validator_1 = __webpack_require__(30);
class CreatePasswordDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreatePasswordDto.prototype, "code", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreatePasswordDto.prototype, "name", void 0);
exports.CreatePasswordDto = CreatePasswordDto;


/***/ }),
/* 103 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const mapped_types_1 = __webpack_require__(65);
const create_password_dto_1 = __webpack_require__(102);
class UpdatePasswordDto extends mapped_types_1.PartialType(create_password_dto_1.CreatePasswordDto) {
}
exports.UpdatePasswordDto = UpdatePasswordDto;


/***/ }),
/* 104 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const category_service_1 = __webpack_require__(105);
const category_controller_1 = __webpack_require__(106);
let CategoryModule = class CategoryModule {
};
CategoryModule = __decorate([
    common_1.Module({
        controllers: [category_controller_1.CategoryController],
        providers: [category_service_1.CategoryService]
    })
], CategoryModule);
exports.CategoryModule = CategoryModule;


/***/ }),
/* 105 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
let CategoryService = class CategoryService {
    create(createCategoryDto) {
        return 'This action adds a new category';
    }
    findAll() {
        return `This action returns all category`;
    }
    findOne(id) {
        return `This action returns a #${id} category`;
    }
    update(id, updateCategoryDto) {
        return `This action updates a #${id} category`;
    }
    remove(id) {
        return `This action removes a #${id} category`;
    }
};
CategoryService = __decorate([
    common_1.Injectable()
], CategoryService);
exports.CategoryService = CategoryService;


/***/ }),
/* 106 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const category_service_1 = __webpack_require__(105);
const create_category_dto_1 = __webpack_require__(107);
const update_category_dto_1 = __webpack_require__(108);
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    create(createCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    }
    findAll() {
        return this.categoryService.findAll();
    }
    findOne(id) {
        return this.categoryService.findOne(+id);
    }
    update(id, updateCategoryDto) {
        return this.categoryService.update(+id, updateCategoryDto);
    }
    remove(id) {
        return this.categoryService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_category_dto_1.CreateCategoryDto !== "undefined" && create_category_dto_1.CreateCategoryDto) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "findOne", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof update_category_dto_1.UpdateCategoryDto !== "undefined" && update_category_dto_1.UpdateCategoryDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "remove", null);
CategoryController = __decorate([
    common_1.Controller('category'),
    __metadata("design:paramtypes", [typeof (_c = typeof category_service_1.CategoryService !== "undefined" && category_service_1.CategoryService) === "function" ? _c : Object])
], CategoryController);
exports.CategoryController = CategoryController;


/***/ }),
/* 107 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class CreateCategoryDto {
}
exports.CreateCategoryDto = CreateCategoryDto;


/***/ }),
/* 108 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const mapped_types_1 = __webpack_require__(65);
const create_category_dto_1 = __webpack_require__(107);
class UpdateCategoryDto extends mapped_types_1.PartialType(create_category_dto_1.CreateCategoryDto) {
}
exports.UpdateCategoryDto = UpdateCategoryDto;


/***/ }),
/* 109 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const option_service_1 = __webpack_require__(110);
const option_controller_1 = __webpack_require__(111);
let OptionModule = class OptionModule {
};
OptionModule = __decorate([
    common_1.Module({
        controllers: [option_controller_1.OptionController],
        providers: [option_service_1.OptionService]
    })
], OptionModule);
exports.OptionModule = OptionModule;


/***/ }),
/* 110 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
let OptionService = class OptionService {
    create(createOptionDto) {
        return 'This action adds a new option';
    }
    findAll() {
        return `This action returns all option`;
    }
    findOne(id) {
        return `This action returns a #${id} option`;
    }
    update(id, updateOptionDto) {
        return `This action updates a #${id} option`;
    }
    remove(id) {
        return `This action removes a #${id} option`;
    }
};
OptionService = __decorate([
    common_1.Injectable()
], OptionService);
exports.OptionService = OptionService;


/***/ }),
/* 111 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const option_service_1 = __webpack_require__(110);
const create_option_dto_1 = __webpack_require__(112);
const update_option_dto_1 = __webpack_require__(113);
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
    __metadata("design:paramtypes", [typeof (_a = typeof create_option_dto_1.CreateOptionDto !== "undefined" && create_option_dto_1.CreateOptionDto) === "function" ? _a : Object]),
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
    __metadata("design:paramtypes", [String, typeof (_b = typeof update_option_dto_1.UpdateOptionDto !== "undefined" && update_option_dto_1.UpdateOptionDto) === "function" ? _b : Object]),
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
    __metadata("design:paramtypes", [typeof (_c = typeof option_service_1.OptionService !== "undefined" && option_service_1.OptionService) === "function" ? _c : Object])
], OptionController);
exports.OptionController = OptionController;


/***/ }),
/* 112 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class CreateOptionDto {
}
exports.CreateOptionDto = CreateOptionDto;


/***/ }),
/* 113 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const mapped_types_1 = __webpack_require__(65);
const create_option_dto_1 = __webpack_require__(112);
class UpdateOptionDto extends mapped_types_1.PartialType(create_option_dto_1.CreateOptionDto) {
}
exports.UpdateOptionDto = UpdateOptionDto;


/***/ }),
/* 114 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const company_password_service_1 = __webpack_require__(115);
const company_password_controller_1 = __webpack_require__(116);
const company_password_entity_1 = __webpack_require__(16);
const company_entity_1 = __webpack_require__(15);
const password_entity_1 = __webpack_require__(17);
const user_module_1 = __webpack_require__(8);
const adminuser_module_1 = __webpack_require__(53);
const typeorm_1 = __webpack_require__(11);
const auth_middleware_1 = __webpack_require__(42);
let CompanyPasswordModule = class CompanyPasswordModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'company_password/:id', method: common_1.RequestMethod.GET }, { path: 'company_password/:id', method: common_1.RequestMethod.PUT }, { path: 'company_password/:company/:id', method: common_1.RequestMethod.DELETE }, { path: 'company_password', method: common_1.RequestMethod.POST }, { path: 'company_password/company/:id', method: common_1.RequestMethod.GET });
    }
};
CompanyPasswordModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([company_password_entity_1.CompanyPasswordEntity, company_entity_1.CompanyEntity, password_entity_1.PasswordEntity]), user_module_1.UserModule, adminuser_module_1.AdminuserModule],
        controllers: [company_password_controller_1.CompanyPasswordController],
        providers: [company_password_service_1.CompanyPasswordService]
    })
], CompanyPasswordModule);
exports.CompanyPasswordModule = CompanyPasswordModule;


/***/ }),
/* 115 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(11);
const class_validator_1 = __webpack_require__(30);
const typeorm_2 = __webpack_require__(12);
const company_entity_1 = __webpack_require__(15);
const password_entity_1 = __webpack_require__(17);
const company_password_entity_1 = __webpack_require__(16);
let CompanyPasswordService = class CompanyPasswordService {
    constructor(companyPasswordRepository, passwordRepository, companyRepository) {
        this.companyPasswordRepository = companyPasswordRepository;
        this.passwordRepository = passwordRepository;
        this.companyRepository = companyRepository;
    }
    async create(createCompanyPasswordDto) {
        let newCompanyPassword = new company_password_entity_1.CompanyPasswordEntity();
        newCompanyPassword.pwd = createCompanyPasswordDto.pwd;
        newCompanyPassword.description = createCompanyPasswordDto.description;
        newCompanyPassword.has_threshold = createCompanyPasswordDto.has_threshold;
        newCompanyPassword.threshold = createCompanyPasswordDto.threshold;
        const errors = await class_validator_1.validate(newCompanyPassword);
        if (errors.length > 0) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Input is not valid.'
            };
        }
        else {
            const savedCompanyPassword = await this.companyPasswordRepository.save(newCompanyPassword);
            const company = await this.companyRepository.findOne({ where: { id: createCompanyPasswordDto.company }, relations: ['passwords'] });
            company.passwords.push(savedCompanyPassword);
            await this.companyRepository.save(company);
            const password = await this.passwordRepository.findOne({ where: { id: createCompanyPasswordDto.password }, relations: ['passwords'] });
            password.passwords.push(savedCompanyPassword);
            await this.passwordRepository.save(password);
            return { item: savedCompanyPassword };
        }
    }
    async findAll(company) {
        const qb = await typeorm_2.getRepository(company_password_entity_1.CompanyPasswordEntity)
            .createQueryBuilder('company_password')
            .leftJoinAndSelect('company_password.company', 'company')
            .leftJoinAndSelect('company_password.password', 'password')
            .where('company.id = :id', { id: company });
        const passwords = await qb.getMany();
        return { items: passwords, totalCount: passwords.length };
    }
    async findOne(id) {
        const qb = await typeorm_2.getRepository(company_password_entity_1.CompanyPasswordEntity)
            .createQueryBuilder('company_password')
            .leftJoinAndSelect('company_password.company', 'company')
            .leftJoinAndSelect('company_password.password', 'password');
        const password = await qb.where({ id: id }).getOne();
        if (!password) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not password.'
            };
        }
        return { item: password };
    }
    async update(id, updateCompanyPasswordDto) {
        let password = await this.companyPasswordRepository.findOne(id);
        if (!password) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not password.'
            };
        }
        password.pwd = updateCompanyPasswordDto.pwd;
        password.description = updateCompanyPasswordDto.description;
        password.has_threshold = updateCompanyPasswordDto.has_threshold;
        password.threshold = updateCompanyPasswordDto.threshold;
        await this.companyPasswordRepository.update(id, password);
        const updated = await this.companyPasswordRepository.findOne({ id: id });
        return { item: updated };
    }
    async remove(id) {
        const password = await this.companyPasswordRepository.findOne({ id: id });
        if (!password) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not password.'
            };
        }
        return await this.companyPasswordRepository.delete({ id: id });
    }
};
CompanyPasswordService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(company_password_entity_1.CompanyPasswordEntity)),
    __param(1, typeorm_1.InjectRepository(password_entity_1.PasswordEntity)),
    __param(2, typeorm_1.InjectRepository(company_entity_1.CompanyEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
], CompanyPasswordService);
exports.CompanyPasswordService = CompanyPasswordService;


/***/ }),
/* 116 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const company_password_service_1 = __webpack_require__(115);
const create_company_password_dto_1 = __webpack_require__(117);
const update_company_password_dto_1 = __webpack_require__(118);
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
    __metadata("design:paramtypes", [typeof (_a = typeof create_company_password_dto_1.CreateCompanyPasswordDto !== "undefined" && create_company_password_dto_1.CreateCompanyPasswordDto) === "function" ? _a : Object]),
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
    __metadata("design:paramtypes", [String, typeof (_b = typeof update_company_password_dto_1.UpdateCompanyPasswordDto !== "undefined" && update_company_password_dto_1.UpdateCompanyPasswordDto) === "function" ? _b : Object]),
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
    __metadata("design:paramtypes", [typeof (_c = typeof company_password_service_1.CompanyPasswordService !== "undefined" && company_password_service_1.CompanyPasswordService) === "function" ? _c : Object])
], CompanyPasswordController);
exports.CompanyPasswordController = CompanyPasswordController;


/***/ }),
/* 117 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const class_validator_1 = __webpack_require__(30);
class CreateCompanyPasswordDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateCompanyPasswordDto.prototype, "pwd", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Boolean)
], CreateCompanyPasswordDto.prototype, "has_threshold", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateCompanyPasswordDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateCompanyPasswordDto.prototype, "company", void 0);
exports.CreateCompanyPasswordDto = CreateCompanyPasswordDto;


/***/ }),
/* 118 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const mapped_types_1 = __webpack_require__(65);
const create_company_password_dto_1 = __webpack_require__(117);
class UpdateCompanyPasswordDto extends mapped_types_1.PartialType(create_company_password_dto_1.CreateCompanyPasswordDto) {
}
exports.UpdateCompanyPasswordDto = UpdateCompanyPasswordDto;


/***/ }),
/* 119 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const company_entity_1 = __webpack_require__(15);
const typeorm_1 = __webpack_require__(11);
const auth_middleware_1 = __webpack_require__(42);
const email_service_1 = __webpack_require__(120);
const email_controller_1 = __webpack_require__(121);
const email_entity_1 = __webpack_require__(18);
const user_module_1 = __webpack_require__(8);
const adminuser_module_1 = __webpack_require__(53);
let EmailModule = class EmailModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'email/:id', method: common_1.RequestMethod.GET }, { path: 'email/:id', method: common_1.RequestMethod.PUT }, { path: 'email/:id', method: common_1.RequestMethod.DELETE }, { path: 'email', method: common_1.RequestMethod.POST }, { path: 'email/company/:id', method: common_1.RequestMethod.GET });
    }
};
EmailModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([company_entity_1.CompanyEntity, email_entity_1.EmailEntity]), user_module_1.UserModule, adminuser_module_1.AdminuserModule],
        controllers: [email_controller_1.EmailController],
        providers: [email_service_1.EmailService]
    })
], EmailModule);
exports.EmailModule = EmailModule;


/***/ }),
/* 120 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(11);
const class_validator_1 = __webpack_require__(30);
const typeorm_2 = __webpack_require__(12);
const company_entity_1 = __webpack_require__(15);
const email_entity_1 = __webpack_require__(18);
let EmailService = class EmailService {
    constructor(emailRepository, companyRepository) {
        this.emailRepository = emailRepository;
        this.companyRepository = companyRepository;
    }
    async create(createEmailDto) {
        let email = new email_entity_1.EmailEntity();
        email.email = createEmailDto.email;
        email.description = createEmailDto.description;
        email.store_location = createEmailDto.store_location;
        email.subject_line = createEmailDto.subject_line;
        email.body = createEmailDto.body;
        email.name_format = createEmailDto.name_format;
        email.active = createEmailDto.active;
        const errors = await class_validator_1.validate(email);
        if (errors.length > 0) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Input is not valid.'
            };
        }
        else {
            const savedEmail = await this.emailRepository.save(email);
            const company = await this.companyRepository.findOne({ where: { id: createEmailDto.company }, relations: ['emails'] });
            company.emails.push(savedEmail);
            await this.companyRepository.save(company);
            return { status: common_1.HttpStatus.OK, item: savedEmail };
        }
    }
    async findAll(company) {
        const qb = await typeorm_2.getRepository(email_entity_1.EmailEntity)
            .createQueryBuilder('email')
            .leftJoinAndSelect('email.company', 'company')
            .where('company.id = :id', { id: company });
        const emails = await qb.getMany();
        return { items: emails, totalCount: emails.length };
    }
    async findOne(id) {
        const email = await this.emailRepository.findOne({ id: id });
        if (!email) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not email.'
            };
        }
        return { item: email };
    }
    async update(id, updateEmailDto) {
        let email = await this.emailRepository.findOne(id);
        if (!email) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not email.'
            };
        }
        const { description, store_location, name_format, subject_line, body, active } = updateEmailDto;
        email.email = updateEmailDto.email;
        email.description = description;
        email.store_location = store_location;
        email.subject_line = subject_line;
        email.name_format = name_format;
        email.body = body;
        email.active = active;
        await this.emailRepository.update(id, email);
        const updated = await this.emailRepository.findOne({ id: id });
        return { item: updated };
    }
    async remove(id) {
        const email = await this.emailRepository.findOne({ id: id });
        if (!email) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not email.'
            };
        }
        return await this.emailRepository.delete({ id: id });
    }
};
EmailService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(email_entity_1.EmailEntity)),
    __param(1, typeorm_1.InjectRepository(company_entity_1.CompanyEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], EmailService);
exports.EmailService = EmailService;


/***/ }),
/* 121 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const email_service_1 = __webpack_require__(120);
const create_email_dto_1 = __webpack_require__(122);
const update_email_dto_1 = __webpack_require__(123);
let EmailController = class EmailController {
    constructor(emailService) {
        this.emailService = emailService;
    }
    async create(createEmailDto) {
        return this.emailService.create(createEmailDto);
    }
    async findAll(company) {
        return this.emailService.findAll(company);
    }
    findOne(id) {
        return this.emailService.findOne(+id);
    }
    update(id, updateEmailDto) {
        return this.emailService.update(+id, updateEmailDto);
    }
    remove(id) {
        return this.emailService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_email_dto_1.CreateEmailDto !== "undefined" && create_email_dto_1.CreateEmailDto) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "create", null);
__decorate([
    common_1.Get('company/:company'),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, common_1.Param('company')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "findOne", null);
__decorate([
    common_1.Put(':id'),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof update_email_dto_1.UpdateEmailDto !== "undefined" && update_email_dto_1.UpdateEmailDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "remove", null);
EmailController = __decorate([
    common_1.Controller('email'),
    __metadata("design:paramtypes", [typeof (_c = typeof email_service_1.EmailService !== "undefined" && email_service_1.EmailService) === "function" ? _c : Object])
], EmailController);
exports.EmailController = EmailController;


/***/ }),
/* 122 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const class_validator_1 = __webpack_require__(30);
class CreateEmailDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateEmailDto.prototype, "company", void 0);
exports.CreateEmailDto = CreateEmailDto;


/***/ }),
/* 123 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const mapped_types_1 = __webpack_require__(65);
const create_email_dto_1 = __webpack_require__(122);
class UpdateEmailDto extends mapped_types_1.PartialType(create_email_dto_1.CreateEmailDto) {
}
exports.UpdateEmailDto = UpdateEmailDto;


/***/ }),
/* 124 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const api_service_1 = __webpack_require__(125);
const api_controller_1 = __webpack_require__(128);
const typeorm_1 = __webpack_require__(11);
const password_entity_1 = __webpack_require__(17);
const company_entity_1 = __webpack_require__(15);
const company_password_entity_1 = __webpack_require__(16);
const uuid_entity_1 = __webpack_require__(20);
const qrcode_entity_1 = __webpack_require__(126);
const roles_entity_1 = __webpack_require__(45);
const adminuser_entity_1 = __webpack_require__(44);
let ApiModule = class ApiModule {
};
ApiModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([password_entity_1.PasswordEntity, company_password_entity_1.CompanyPasswordEntity, company_entity_1.CompanyEntity, uuid_entity_1.UUIDEntity, qrcode_entity_1.QrcodeEntity, adminuser_entity_1.AdminuserEntity, roles_entity_1.RolesEntity])],
        controllers: [api_controller_1.ApiController],
        providers: [api_service_1.ApiService]
    })
], ApiModule);
exports.ApiModule = ApiModule;


/***/ }),
/* 125 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(12);
const company_password_entity_1 = __webpack_require__(16);
const company_entity_1 = __webpack_require__(15);
const qrcode_entity_1 = __webpack_require__(126);
const uuid_entity_1 = __webpack_require__(20);
const mailer_1 = __webpack_require__(127);
let ApiService = class ApiService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async getPasswords(app_id) {
        const qb = await typeorm_1.getRepository(company_password_entity_1.CompanyPasswordEntity)
            .createQueryBuilder('company_password')
            .leftJoinAndSelect('company_password.company', 'company')
            .leftJoinAndSelect('company_password.password', 'password')
            .where('company.app_id = :app_id', { app_id: app_id });
        const items = await qb.getMany();
        const passwords = [];
        items.forEach(password => {
            passwords.push(Object.assign(Object.assign({}, password), { code: password.password.code, password: password.pwd, company: null, pwd: null }));
        });
        const company = await typeorm_1.getRepository(company_entity_1.CompanyEntity)
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.enabled', 'enabled')
            .where('company.app_id=:app_id', { app_id: app_id })
            .getOne();
        const enabled = [];
        company.enabled.forEach(item => {
            enabled.push(item.code);
        });
        passwords.push({
            id: 1000,
            code: "OPB",
            password: company.menu_password,
            description: "OPTION BUTTON",
            has_threshold: false,
            threshold: 0
        });
        enabled.push('OPB');
        const result = {
            "status": true,
            "result": {
                "password": passwords,
                "enabled": enabled
            }
        };
        return result;
    }
    async checkLicense(body) {
        const { app_id, uuid, version } = body;
        const company = await typeorm_1.getRepository(company_entity_1.CompanyEntity)
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.enabled', 'enabled')
            .where('company.app_id=:app_id', { app_id: app_id })
            .getOne();
        if (!company) {
            return {
                status: false,
                error: "Invalid App ID"
            };
        }
        if (!company.active) {
            return {
                status: false,
                error: "Company is not activated"
            };
        }
        const now = new Date();
        if (company.expire_date < now) {
            return {
                status: false,
                error: "License is expired"
            };
        }
        const _uuid = await typeorm_1.getRepository(uuid_entity_1.UUIDEntity)
            .createQueryBuilder('uuid')
            .leftJoinAndSelect('uuid.company', 'company')
            .where('company.app_id=:app_id', { app_id: app_id })
            .andWhere('uuid=:uuid', { uuid: uuid })
            .getOne();
        if (_uuid) {
            if (!_uuid.active) {
                return {
                    status: false,
                    error: "Device is inactive"
                };
            }
            _uuid.last_date_verified = new Date().toLocaleDateString();
            _uuid.version = version;
            await typeorm_1.getRepository(uuid_entity_1.UUIDEntity).update(_uuid.id, _uuid);
            const updated = await typeorm_1.getRepository(uuid_entity_1.UUIDEntity).findOne(_uuid.id);
            return {
                status: true,
                unique_id: updated.unique_id
            };
        }
        else {
            const uuids = await typeorm_1.getRepository(uuid_entity_1.UUIDEntity)
                .createQueryBuilder('uuid')
                .leftJoinAndSelect('uuid.company', 'company')
                .where('company.id = :id', { id: company.id }).getMany();
            for (let unique_id = 1; unique_id < 1000; unique_id++) {
                let exist = false;
                uuids.forEach(item => {
                    if (item.unique_id == unique_id) {
                        exist = true;
                    }
                });
                if (!exist) {
                    let _uuid = new uuid_entity_1.UUIDEntity();
                    _uuid.uuid = uuid;
                    _uuid.last_date_verified = new Date().toLocaleDateString();
                    _uuid.version = version;
                    _uuid.active = company.first_time_status;
                    _uuid.unique_id = unique_id;
                    const saved = await typeorm_1.getRepository(uuid_entity_1.UUIDEntity).save(_uuid);
                    const _company = await typeorm_1.getRepository(company_entity_1.CompanyEntity).findOne({ where: { id: company.id }, relations: ['uuids'] });
                    _company.uuids.push(saved);
                    await typeorm_1.getRepository(company_entity_1.CompanyEntity).save(_company);
                    if (saved.active) {
                        return {
                            status: true,
                            unique_id: saved.unique_id
                        };
                    }
                    else {
                        return {
                            status: false,
                            error: "Device is inactive"
                        };
                    }
                }
            }
            return uuids;
        }
    }
    async addQRCode(code) {
        let qrcode = new qrcode_entity_1.QrcodeEntity();
        qrcode.code = code;
        const saved = await typeorm_1.getRepository(qrcode_entity_1.QrcodeEntity).save(qrcode);
        return { status: true, id: saved.id };
    }
    async getQRCode(id) {
        const qrcode = await typeorm_1.getRepository(qrcode_entity_1.QrcodeEntity).findOne(id);
        if (!qrcode) {
            return { status: false };
        }
        else {
            return { status: true, code: qrcode.code };
        }
    }
    async sendEmail(params, pdf) {
        const { app_id, store, firstname, lastname, timestamp, email } = params;
        const company = await typeorm_1.getRepository(company_entity_1.CompanyEntity)
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.emails', 'emails')
            .where('company.app_id=:app_id', { app_id: app_id })
            .getOne();
        if (!company) {
            return { status: false, message: 'Can not send email' };
        }
        for (const email_entity of company.emails) {
            const store_location = email_entity.store_location;
            const stores = store_location.split(',');
            for (const one of stores) {
                if (one == store) {
                    const subject_line = email_entity.subject_line;
                    let name_format = email_entity.name_format.replace('\"Billing_First_Name\"', firstname);
                    name_format = name_format.replace('\"Billing_Last_Name\"', lastname);
                    name_format = name_format.replace('\"Timestamp\"', timestamp);
                    let body = email_entity.body.replace('\"Billing_First_Name\"', firstname);
                    body = body.replace('\"Billing_Last_Name\"', lastname);
                    body = body.replace('\"Company_Name\"', company.name);
                    return await this.mailerService
                        .sendMail({
                        to: email,
                        from: `${email_entity.email}<invoice@furnserve.email>`,
                        subject: subject_line,
                        text: body,
                        attachments: [
                            {
                                filename: name_format,
                                path: pdf.path
                            },
                        ]
                    })
                        .then((success) => {
                        return { status: true };
                    })
                        .catch((error) => {
                        return { status: false, message: error.message };
                    });
                }
            }
        }
        return { status: false, message: 'Can not send email' };
    }
};
ApiService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof mailer_1.MailerService !== "undefined" && mailer_1.MailerService) === "function" ? _a : Object])
], ApiService);
exports.ApiService = ApiService;


/***/ }),
/* 126 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const typeorm_1 = __webpack_require__(12);
let QrcodeEntity = class QrcodeEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], QrcodeEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "longtext" }),
    __metadata("design:type", String)
], QrcodeEntity.prototype, "code", void 0);
QrcodeEntity = __decorate([
    typeorm_1.Entity('nest_qrcode')
], QrcodeEntity);
exports.QrcodeEntity = QrcodeEntity;


/***/ }),
/* 127 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs-modules/mailer");

/***/ }),
/* 128 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const platform_express_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(38);
const api_service_1 = __webpack_require__(125);
const multer_1 = __webpack_require__(41);
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
    __metadata("design:paramtypes", [typeof (_a = typeof api_service_1.ApiService !== "undefined" && api_service_1.ApiService) === "function" ? _a : Object])
], ApiController);
exports.ApiController = ApiController;


/***/ }),
/* 129 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const qrcode_service_1 = __webpack_require__(130);
const qrcode_controller_1 = __webpack_require__(131);
let QrcodeModule = class QrcodeModule {
};
QrcodeModule = __decorate([
    common_1.Module({
        controllers: [qrcode_controller_1.QrcodeController],
        providers: [qrcode_service_1.QrcodeService]
    })
], QrcodeModule);
exports.QrcodeModule = QrcodeModule;


/***/ }),
/* 130 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
let QrcodeService = class QrcodeService {
    create(createQrcodeDto) {
        return 'This action adds a new qrcode';
    }
    findAll() {
        return `This action returns all qrcode`;
    }
    findOne(id) {
        return `This action returns a #${id} qrcode`;
    }
    update(id, updateQrcodeDto) {
        return `This action updates a #${id} qrcode`;
    }
    remove(id) {
        return `This action removes a #${id} qrcode`;
    }
};
QrcodeService = __decorate([
    common_1.Injectable()
], QrcodeService);
exports.QrcodeService = QrcodeService;


/***/ }),
/* 131 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const qrcode_service_1 = __webpack_require__(130);
const create_qrcode_dto_1 = __webpack_require__(132);
const update_qrcode_dto_1 = __webpack_require__(133);
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
    __metadata("design:paramtypes", [typeof (_a = typeof create_qrcode_dto_1.CreateQrcodeDto !== "undefined" && create_qrcode_dto_1.CreateQrcodeDto) === "function" ? _a : Object]),
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
    __metadata("design:paramtypes", [String, typeof (_b = typeof update_qrcode_dto_1.UpdateQrcodeDto !== "undefined" && update_qrcode_dto_1.UpdateQrcodeDto) === "function" ? _b : Object]),
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
    __metadata("design:paramtypes", [typeof (_c = typeof qrcode_service_1.QrcodeService !== "undefined" && qrcode_service_1.QrcodeService) === "function" ? _c : Object])
], QrcodeController);
exports.QrcodeController = QrcodeController;


/***/ }),
/* 132 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class CreateQrcodeDto {
}
exports.CreateQrcodeDto = CreateQrcodeDto;


/***/ }),
/* 133 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const mapped_types_1 = __webpack_require__(65);
const create_qrcode_dto_1 = __webpack_require__(132);
class UpdateQrcodeDto extends mapped_types_1.PartialType(create_qrcode_dto_1.CreateQrcodeDto) {
}
exports.UpdateQrcodeDto = UpdateQrcodeDto;


/***/ }),
/* 134 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const menu_service_1 = __webpack_require__(135);
const menu_controller_1 = __webpack_require__(136);
const typeorm_1 = __webpack_require__(11);
const menu_entity_1 = __webpack_require__(25);
const company_entity_1 = __webpack_require__(15);
const auth_middleware_1 = __webpack_require__(42);
const user_module_1 = __webpack_require__(8);
const adminuser_module_1 = __webpack_require__(53);
let MenuModule = class MenuModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'menu/:id', method: common_1.RequestMethod.GET }, { path: 'menu/:id', method: common_1.RequestMethod.PUT }, { path: 'menu/:id', method: common_1.RequestMethod.DELETE }, { path: 'menu', method: common_1.RequestMethod.POST });
    }
};
MenuModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([menu_entity_1.MenuEntity, company_entity_1.CompanyEntity]), user_module_1.UserModule, adminuser_module_1.AdminuserModule],
        controllers: [menu_controller_1.MenuController],
        providers: [menu_service_1.MenuService]
    })
], MenuModule);
exports.MenuModule = MenuModule;


/***/ }),
/* 135 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(11);
const class_validator_1 = __webpack_require__(30);
const typeorm_2 = __webpack_require__(12);
const company_entity_1 = __webpack_require__(15);
const menu_entity_1 = __webpack_require__(25);
let MenuService = class MenuService {
    constructor(menuRepository, companyRepository) {
        this.menuRepository = menuRepository;
        this.companyRepository = companyRepository;
    }
    async create(createMenuDto) {
        const qb = await typeorm_2.getRepository(menu_entity_1.MenuEntity)
            .createQueryBuilder('menu')
            .where('menu.link = :link', { link: createMenuDto.link });
        const menu = await qb.getOne();
        if (menu) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Link must be unique.'
            };
        }
        let newMenu = new menu_entity_1.MenuEntity();
        newMenu.link = createMenuDto.link;
        newMenu.description = createMenuDto.description;
        const errors = await class_validator_1.validate(newMenu);
        if (errors.length > 0) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Input is not valid.'
            };
        }
        else {
            const savedMenu = await this.menuRepository.save(newMenu);
            return { status: common_1.HttpStatus.OK, item: savedMenu };
        }
    }
    async findAll() {
        const qb = await typeorm_2.getRepository(menu_entity_1.MenuEntity)
            .createQueryBuilder('menu');
        const menus = await qb.getMany();
        return { items: menus, totalCount: menus.length };
    }
    async findOne(id) {
        const menu = await this.menuRepository.findOne({ id: id });
        if (!menu) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not menu.'
            };
        }
        return { item: menu };
    }
    async update(id, updateMenuDto) {
        let menu = await this.menuRepository.findOne(id);
        if (!menu) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not menu.'
            };
        }
        menu.link = updateMenuDto.link;
        menu.description = updateMenuDto.description;
        await this.menuRepository.update(id, menu);
        const updated = await this.menuRepository.findOne({ id: id });
        return { item: updated };
    }
    async remove(id) {
        const menu = await this.menuRepository.findOne({ id: id });
        if (!menu) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not menu.'
            };
        }
        return await this.menuRepository.delete({ id: id });
    }
};
MenuService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(menu_entity_1.MenuEntity)),
    __param(1, typeorm_1.InjectRepository(company_entity_1.CompanyEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], MenuService);
exports.MenuService = MenuService;


/***/ }),
/* 136 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const menu_service_1 = __webpack_require__(135);
const create_menu_dto_1 = __webpack_require__(137);
const update_menu_dto_1 = __webpack_require__(138);
let MenuController = class MenuController {
    constructor(menuService) {
        this.menuService = menuService;
    }
    create(createMenuDto) {
        return this.menuService.create(createMenuDto);
    }
    findAll() {
        return this.menuService.findAll();
    }
    findOne(id) {
        return this.menuService.findOne(+id);
    }
    update(id, updateMenuDto) {
        return this.menuService.update(+id, updateMenuDto);
    }
    remove(id) {
        return this.menuService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_menu_dto_1.CreateMenuDto !== "undefined" && create_menu_dto_1.CreateMenuDto) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "findOne", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof update_menu_dto_1.UpdateMenuDto !== "undefined" && update_menu_dto_1.UpdateMenuDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "remove", null);
MenuController = __decorate([
    common_1.Controller('menu'),
    __metadata("design:paramtypes", [typeof (_c = typeof menu_service_1.MenuService !== "undefined" && menu_service_1.MenuService) === "function" ? _c : Object])
], MenuController);
exports.MenuController = MenuController;


/***/ }),
/* 137 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const decorators_1 = __webpack_require__(86);
class CreateMenuDto {
}
__decorate([
    decorators_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "link", void 0);
exports.CreateMenuDto = CreateMenuDto;


/***/ }),
/* 138 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const swagger_1 = __webpack_require__(38);
const create_menu_dto_1 = __webpack_require__(137);
class UpdateMenuDto extends swagger_1.PartialType(create_menu_dto_1.CreateMenuDto) {
}
exports.UpdateMenuDto = UpdateMenuDto;


/***/ }),
/* 139 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const company_menu_service_1 = __webpack_require__(140);
const company_menu_controller_1 = __webpack_require__(141);
let CompanyMenuModule = class CompanyMenuModule {
};
CompanyMenuModule = __decorate([
    common_1.Module({
        controllers: [company_menu_controller_1.CompanyMenuController],
        providers: [company_menu_service_1.CompanyMenuService]
    })
], CompanyMenuModule);
exports.CompanyMenuModule = CompanyMenuModule;


/***/ }),
/* 140 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(12);
const company_menu_entity_1 = __webpack_require__(21);
let CompanyMenuService = class CompanyMenuService {
    constructor() { }
    async findAll(company) {
        const qb = await typeorm_1.getRepository(company_menu_entity_1.CompanyMenuEntity)
            .createQueryBuilder('company_menu')
            .leftJoinAndSelect('company_menu.company', 'company')
            .leftJoinAndSelect('company_menu.menu', 'menu')
            .where('company.id = :id', { id: company });
        const menus = await qb.getMany();
        return { items: menus, totalCount: menus.length };
    }
    async findOne(id) {
        const qb = await typeorm_1.getRepository(company_menu_entity_1.CompanyMenuEntity)
            .createQueryBuilder('company_menu')
            .leftJoinAndSelect('company_menu.company', 'company')
            .leftJoinAndSelect('company_menu.menu', 'menu');
        const menu = await qb.where({ id: id }).getOne();
        if (!menu) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not menu.'
            };
        }
        return { item: menu };
    }
    async update(company, menu, permission) {
    }
};
CompanyMenuService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], CompanyMenuService);
exports.CompanyMenuService = CompanyMenuService;


/***/ }),
/* 141 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const company_menu_service_1 = __webpack_require__(140);
let CompanyMenuController = class CompanyMenuController {
    constructor(companyMenuService) {
        this.companyMenuService = companyMenuService;
    }
    async findAll(company) {
        return this.companyMenuService.findAll(+company);
    }
    findOne(id) {
        return this.companyMenuService.findOne(+id);
    }
};
__decorate([
    common_1.Get('company/:company'),
    __param(0, common_1.Param('company')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CompanyMenuController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompanyMenuController.prototype, "findOne", null);
CompanyMenuController = __decorate([
    common_1.Controller('company-menu'),
    __metadata("design:paramtypes", [typeof (_a = typeof company_menu_service_1.CompanyMenuService !== "undefined" && company_menu_service_1.CompanyMenuService) === "function" ? _a : Object])
], CompanyMenuController);
exports.CompanyMenuController = CompanyMenuController;


/***/ }),
/* 142 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const user_menu_service_1 = __webpack_require__(143);
const user_menu_controller_1 = __webpack_require__(144);
let UserMenuModule = class UserMenuModule {
};
UserMenuModule = __decorate([
    common_1.Module({
        controllers: [user_menu_controller_1.UserMenuController],
        providers: [user_menu_service_1.UserMenuService]
    })
], UserMenuModule);
exports.UserMenuModule = UserMenuModule;


/***/ }),
/* 143 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
let UserMenuService = class UserMenuService {
    create(createUserMenuDto) {
        return 'This action adds a new userMenu';
    }
    findAll() {
        return `This action returns all userMenu`;
    }
    findOne(id) {
        return `This action returns a #${id} userMenu`;
    }
    update(id, updateUserMenuDto) {
        return `This action updates a #${id} userMenu`;
    }
    remove(id) {
        return `This action removes a #${id} userMenu`;
    }
};
UserMenuService = __decorate([
    common_1.Injectable()
], UserMenuService);
exports.UserMenuService = UserMenuService;


/***/ }),
/* 144 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const user_menu_service_1 = __webpack_require__(143);
const create_user_menu_dto_1 = __webpack_require__(145);
const update_user_menu_dto_1 = __webpack_require__(146);
let UserMenuController = class UserMenuController {
    constructor(userMenuService) {
        this.userMenuService = userMenuService;
    }
    create(createUserMenuDto) {
        return this.userMenuService.create(createUserMenuDto);
    }
    findAll() {
        return this.userMenuService.findAll();
    }
    findOne(id) {
        return this.userMenuService.findOne(+id);
    }
    update(id, updateUserMenuDto) {
        return this.userMenuService.update(+id, updateUserMenuDto);
    }
    remove(id) {
        return this.userMenuService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_user_menu_dto_1.CreateUserMenuDto !== "undefined" && create_user_menu_dto_1.CreateUserMenuDto) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], UserMenuController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserMenuController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserMenuController.prototype, "findOne", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof update_user_menu_dto_1.UpdateUserMenuDto !== "undefined" && update_user_menu_dto_1.UpdateUserMenuDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], UserMenuController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserMenuController.prototype, "remove", null);
UserMenuController = __decorate([
    common_1.Controller('user-menu'),
    __metadata("design:paramtypes", [typeof (_c = typeof user_menu_service_1.UserMenuService !== "undefined" && user_menu_service_1.UserMenuService) === "function" ? _c : Object])
], UserMenuController);
exports.UserMenuController = UserMenuController;


/***/ }),
/* 145 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class CreateUserMenuDto {
}
exports.CreateUserMenuDto = CreateUserMenuDto;


/***/ }),
/* 146 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const swagger_1 = __webpack_require__(38);
const create_user_menu_dto_1 = __webpack_require__(145);
class UpdateUserMenuDto extends swagger_1.PartialType(create_user_menu_dto_1.CreateUserMenuDto) {
}
exports.UpdateUserMenuDto = UpdateUserMenuDto;


/***/ }),
/* 147 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const company_role_service_1 = __webpack_require__(148);
const company_role_controller_1 = __webpack_require__(149);
const auth_middleware_1 = __webpack_require__(42);
const company_role_entity_1 = __webpack_require__(24);
const typeorm_1 = __webpack_require__(11);
const user_module_1 = __webpack_require__(8);
const adminuser_module_1 = __webpack_require__(53);
const role_menu_entity_1 = __webpack_require__(22);
let CompanyRoleModule = class CompanyRoleModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'company-role', method: common_1.RequestMethod.POST }, { path: 'company-role/:id', method: common_1.RequestMethod.PUT }, { path: 'company-role/company/:id', method: common_1.RequestMethod.GET }, { path: 'company-role/:id', method: common_1.RequestMethod.DELETE }, { path: 'company-role/:id', method: common_1.RequestMethod.GET });
    }
};
CompanyRoleModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([company_role_entity_1.CompanyRoleEntity, role_menu_entity_1.RoleMenuEntity]), user_module_1.UserModule, adminuser_module_1.AdminuserModule],
        controllers: [company_role_controller_1.CompanyRoleController],
        providers: [company_role_service_1.CompanyRoleService]
    })
], CompanyRoleModule);
exports.CompanyRoleModule = CompanyRoleModule;


/***/ }),
/* 148 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(12);
const company_menu_entity_1 = __webpack_require__(21);
const company_entity_1 = __webpack_require__(15);
const company_role_entity_1 = __webpack_require__(24);
const role_menu_entity_1 = __webpack_require__(22);
let CompanyRoleService = class CompanyRoleService {
    async create(createCompanyRoleDto) {
        const { company_id, name, description, menus } = createCompanyRoleDto;
        const company = await typeorm_1.getRepository(company_entity_1.CompanyEntity)
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.roles', 'roles')
            .where('company.id=:id', { id: company_id })
            .getOne();
        if (!company) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Invalid company ID.'
            };
        }
        let qb = await typeorm_1.getRepository(company_role_entity_1.CompanyRoleEntity)
            .createQueryBuilder('company_role')
            .where('company_role.name = :name', { name })
            .andWhere('company_role.active = true')
            .andWhere('company_role.company = :company_id', { company_id });
        let role = await qb.getOne();
        if (role) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Name must be unique.'
            };
        }
        let newRole = new company_role_entity_1.CompanyRoleEntity();
        newRole.name = name;
        newRole.description = description || '';
        newRole.menus = [];
        for (let i = 0; i < menus.length; i++) {
            const menu = menus[i];
            var company_menu_entity = await typeorm_1.getRepository(company_menu_entity_1.CompanyMenuEntity)
                .createQueryBuilder('company_menu')
                .leftJoinAndSelect('company_menu.roles', 'roles')
                .where('company_menu.id=:id', { id: menu.id })
                .getOne();
            if (!company_menu_entity)
                continue;
            const roleMenu = new role_menu_entity_1.RoleMenuEntity();
            roleMenu.permission = menu.permission;
            const saved = await typeorm_1.getRepository(role_menu_entity_1.RoleMenuEntity).save(roleMenu);
            company_menu_entity.roles.push(saved);
            await typeorm_1.getRepository(company_menu_entity_1.CompanyMenuEntity).save(company_menu_entity);
            newRole.menus.push(saved);
        }
        const savedRole = await typeorm_1.getRepository(company_role_entity_1.CompanyRoleEntity).save(newRole);
        company.roles.push(savedRole);
        await typeorm_1.getRepository(company_entity_1.CompanyEntity).save(company);
        return { item: savedRole };
    }
    async findAll(id) {
        let qb = await typeorm_1.getRepository(company_role_entity_1.CompanyRoleEntity)
            .createQueryBuilder('company_role')
            .leftJoinAndSelect('company_role.menus', 'menus')
            .leftJoinAndSelect('menus.menu', 'menu')
            .where('company_role.company = :id', { id })
            .andWhere('company_role.active = true');
        const roles = await qb.getMany();
        return { items: roles, totalCount: roles.length };
    }
    async findOne(id) {
        let qb = await typeorm_1.getRepository(company_role_entity_1.CompanyRoleEntity)
            .createQueryBuilder('company_role')
            .leftJoinAndSelect('company_role.menus', 'menus')
            .leftJoinAndSelect('menus.menu', 'menu')
            .where('company_role.id = :id', { id })
            .andWhere('company_role.active = true');
        const role = await qb.getOne();
        if (!role) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not role.'
            };
        }
        return { item: role };
    }
    async update(id, updateCompanyRoleDto) {
        let role = await this.findOne(id);
        if (!role) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not role.'
            };
        }
        let roleEnity = role.item;
        roleEnity.name = updateCompanyRoleDto.name;
        roleEnity.menus = [];
        for (let i = 0; i < updateCompanyRoleDto.menus.length; i++) {
            const menu = updateCompanyRoleDto.menus[i];
            if (menu.rid) {
                var roleMenu = await typeorm_1.getRepository(role_menu_entity_1.RoleMenuEntity)
                    .createQueryBuilder('role_menu')
                    .where('role_menu.id=:id', { id: menu.rid })
                    .getOne();
                if (!roleMenu)
                    continue;
                roleMenu.permission = menu.permission;
                const saved = await typeorm_1.getRepository(role_menu_entity_1.RoleMenuEntity).save(roleMenu);
                roleEnity.menus.push(saved);
            }
            else {
                var company_menu_entity = await typeorm_1.getRepository(company_menu_entity_1.CompanyMenuEntity)
                    .createQueryBuilder('company_menu')
                    .leftJoinAndSelect('company_menu.roles', 'roles')
                    .where('company_menu.id=:id', { id: menu.id })
                    .getOne();
                console.log(company_menu_entity);
                if (!company_menu_entity)
                    continue;
                var roleMenu = new role_menu_entity_1.RoleMenuEntity();
                roleMenu.permission = menu.permission;
                const saved = await typeorm_1.getRepository(role_menu_entity_1.RoleMenuEntity).save(roleMenu);
                company_menu_entity.roles.push(saved);
                await typeorm_1.getRepository(company_menu_entity_1.CompanyMenuEntity).save(company_menu_entity);
                roleEnity.menus.push(saved);
            }
        }
        let saved = await typeorm_1.getRepository(company_role_entity_1.CompanyRoleEntity).save(roleEnity);
        return { item: saved };
    }
    async remove(id) {
        let role = await this.findOne(id);
        if (!role) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not role.'
            };
        }
        return await typeorm_1.getRepository(company_role_entity_1.CompanyRoleEntity).update(id, { active: false });
    }
};
CompanyRoleService = __decorate([
    common_1.Injectable()
], CompanyRoleService);
exports.CompanyRoleService = CompanyRoleService;


/***/ }),
/* 149 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const company_role_service_1 = __webpack_require__(148);
const create_company_role_dto_1 = __webpack_require__(150);
const update_company_role_dto_1 = __webpack_require__(151);
let CompanyRoleController = class CompanyRoleController {
    constructor(companyRoleService) {
        this.companyRoleService = companyRoleService;
    }
    async create(createCompanyRoleDto) {
        return await this.companyRoleService.create(createCompanyRoleDto);
    }
    async findAll(id) {
        return await this.companyRoleService.findAll(+id);
    }
    async findOne(id) {
        return await this.companyRoleService.findOne(+id);
    }
    async update(id, updateCompanyRoleDto) {
        return await this.companyRoleService.update(+id, updateCompanyRoleDto);
    }
    async remove(id) {
        return await this.companyRoleService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_company_role_dto_1.CreateCompanyRoleDto !== "undefined" && create_company_role_dto_1.CreateCompanyRoleDto) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], CompanyRoleController.prototype, "create", null);
__decorate([
    common_1.Get('company/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompanyRoleController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompanyRoleController.prototype, "findOne", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof update_company_role_dto_1.UpdateCompanyRoleDto !== "undefined" && update_company_role_dto_1.UpdateCompanyRoleDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], CompanyRoleController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompanyRoleController.prototype, "remove", null);
CompanyRoleController = __decorate([
    common_1.Controller('company-role'),
    __metadata("design:paramtypes", [typeof (_c = typeof company_role_service_1.CompanyRoleService !== "undefined" && company_role_service_1.CompanyRoleService) === "function" ? _c : Object])
], CompanyRoleController);
exports.CompanyRoleController = CompanyRoleController;


/***/ }),
/* 150 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const class_validator_1 = __webpack_require__(30);
class CreateCompanyRoleDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateCompanyRoleDto.prototype, "company_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateCompanyRoleDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Array)
], CreateCompanyRoleDto.prototype, "menus", void 0);
exports.CreateCompanyRoleDto = CreateCompanyRoleDto;


/***/ }),
/* 151 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const swagger_1 = __webpack_require__(38);
const create_company_role_dto_1 = __webpack_require__(150);
class UpdateCompanyRoleDto extends swagger_1.PartialType(create_company_role_dto_1.CreateCompanyRoleDto) {
}
exports.UpdateCompanyRoleDto = UpdateCompanyRoleDto;


/***/ }),
/* 152 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const utils_service_1 = __webpack_require__(153);
const utils_controller_1 = __webpack_require__(156);
const auth_middleware_1 = __webpack_require__(42);
const backup_entity_1 = __webpack_require__(155);
const typeorm_1 = __webpack_require__(11);
const adminuser_module_1 = __webpack_require__(53);
const user_module_1 = __webpack_require__(8);
let UtilsModule = class UtilsModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'utils/backup', method: common_1.RequestMethod.POST }, { path: 'utils/backup', method: common_1.RequestMethod.GET }, { path: 'utils/backup/:id', method: common_1.RequestMethod.GET }, { path: 'utils/backup/:id', method: common_1.RequestMethod.DELETE });
    }
};
UtilsModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([backup_entity_1.BackupEntity]), user_module_1.UserModule, adminuser_module_1.AdminuserModule],
        controllers: [utils_controller_1.UtilsController],
        providers: [utils_service_1.UtilsService]
    })
], UtilsModule);
exports.UtilsModule = UtilsModule;


/***/ }),
/* 153 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const mysqldump_1 = __webpack_require__(154);
const common_1 = __webpack_require__(6);
const backup_entity_1 = __webpack_require__(155);
const typeorm_1 = __webpack_require__(12);
let UtilsService = class UtilsService {
    async backup() {
        const date = new Date();
        const timestamp = date.getTime();
        const filename = `dump_${timestamp}.sql`;
        const result = await mysqldump_1.default({
            connection: {
                host: 'localhost',
                user: 'root',
                password: 'Spurlock26!',
                database: 'invoice',
            },
            dumpToFile: './backup_furnserve/' + filename,
        });
        if (!result) {
            return {
                status: common_1.HttpStatus.EXPECTATION_FAILED,
                message: 'Can not create backup.'
            };
        }
        let backup = new backup_entity_1.BackupEntity();
        backup.created = date;
        backup.filename = filename;
        const saved = await typeorm_1.getRepository(backup_entity_1.BackupEntity).save(backup);
        return { item: saved };
    }
    async findAll() {
        const qb = await typeorm_1.getRepository(backup_entity_1.BackupEntity)
            .createQueryBuilder('backup');
        const backups = await qb.getMany();
        return { items: backups, totalCount: backups.length };
    }
    async findOne(id) {
        const backup = await typeorm_1.getRepository(backup_entity_1.BackupEntity)
            .createQueryBuilder('backup')
            .where('id = :id', { id: id })
            .getOne();
        if (!backup) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not backup.'
            };
        }
        return { item: backup };
    }
    async remove(id) {
        const backup = await typeorm_1.getRepository(backup_entity_1.BackupEntity)
            .createQueryBuilder('backup')
            .where('id = :id', { id: id })
            .getOne();
        if (!backup) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not backup.'
            };
        }
        return await typeorm_1.getRepository(backup_entity_1.BackupEntity)
            .delete({ id: id });
    }
};
UtilsService = __decorate([
    common_1.Injectable()
], UtilsService);
exports.UtilsService = UtilsService;


/***/ }),
/* 154 */
/***/ ((module) => {

"use strict";
module.exports = require("mysqldump");

/***/ }),
/* 155 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const typeorm_1 = __webpack_require__(12);
class Company {
}
exports.Company = Company;
let BackupEntity = class BackupEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BackupEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], BackupEntity.prototype, "filename", void 0);
__decorate([
    typeorm_1.Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BackupEntity.prototype, "created", void 0);
BackupEntity = __decorate([
    typeorm_1.Entity('nest_backup')
], BackupEntity);
exports.BackupEntity = BackupEntity;


/***/ }),
/* 156 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const path_1 = __webpack_require__(40);
const role_enum_1 = __webpack_require__(49);
const roles_decorator_1 = __webpack_require__(50);
const utils_service_1 = __webpack_require__(153);
let UtilsController = class UtilsController {
    constructor(utilsService) {
        this.utilsService = utilsService;
    }
    async backup() {
        return await this.utilsService.backup();
    }
    async findAllBackup() {
        return await this.utilsService.findAll();
    }
    async findBackup(id, res) {
        const backup = await this.utilsService.findOne(+id);
        const filename = path_1.join(process.cwd(), './backup_furnserve/' + backup.item.filename);
        return res.download(filename);
    }
    remove(id) {
        return this.utilsService.remove(+id);
    }
};
__decorate([
    common_1.Post('backup'),
    roles_decorator_1.Roles(role_enum_1.Role.Admin, role_enum_1.Role.Developer),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UtilsController.prototype, "backup", null);
__decorate([
    common_1.Get('backup'),
    roles_decorator_1.Roles(role_enum_1.Role.Admin, role_enum_1.Role.Developer),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UtilsController.prototype, "findAllBackup", null);
__decorate([
    common_1.Get('backup/:id'),
    roles_decorator_1.Roles(role_enum_1.Role.Admin, role_enum_1.Role.Developer),
    __param(0, common_1.Param('id')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UtilsController.prototype, "findBackup", null);
__decorate([
    common_1.Delete('backup/:id'),
    roles_decorator_1.Roles(role_enum_1.Role.Admin, role_enum_1.Role.Developer),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UtilsController.prototype, "remove", null);
UtilsController = __decorate([
    common_1.Controller('utils'),
    __metadata("design:paramtypes", [typeof (_a = typeof utils_service_1.UtilsService !== "undefined" && utils_service_1.UtilsService) === "function" ? _a : Object])
], UtilsController);
exports.UtilsController = UtilsController;


/***/ }),
/* 157 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const company_entity_1 = __webpack_require__(15);
const typeorm_1 = __webpack_require__(11);
const auth_middleware_1 = __webpack_require__(42);
const code_entity_1 = __webpack_require__(27);
const code_service_1 = __webpack_require__(158);
const code_controller_1 = __webpack_require__(159);
const user_module_1 = __webpack_require__(8);
const adminuser_module_1 = __webpack_require__(53);
let CodeModule = class CodeModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'code/:id', method: common_1.RequestMethod.GET }, { path: 'code/:id', method: common_1.RequestMethod.PUT }, { path: 'code/:id', method: common_1.RequestMethod.DELETE }, { path: 'code', method: common_1.RequestMethod.POST });
    }
};
CodeModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([company_entity_1.CompanyEntity, code_entity_1.CodeEntity]), user_module_1.UserModule, adminuser_module_1.AdminuserModule],
        controllers: [code_controller_1.CodeController],
        providers: [code_service_1.CodeService]
    })
], CodeModule);
exports.CodeModule = CodeModule;


/***/ }),
/* 158 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(11);
const class_validator_1 = __webpack_require__(30);
const typeorm_2 = __webpack_require__(12);
const company_entity_1 = __webpack_require__(15);
const code_entity_1 = __webpack_require__(27);
let CodeService = class CodeService {
    constructor(codeRepository, companyRepository) {
        this.codeRepository = codeRepository;
        this.companyRepository = companyRepository;
    }
    async create(createCodeDto) {
        let code = new code_entity_1.CodeEntity();
        code.description = createCodeDto.description;
        code.content = createCodeDto.content;
        code.page = createCodeDto.page;
        code.active = createCodeDto.active;
        if (createCodeDto.company > 0)
            code.company = createCodeDto.company;
        const errors = await class_validator_1.validate(code);
        if (errors.length > 0) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Input is not valid.'
            };
        }
        else {
            const savedCode = await this.codeRepository.save(code);
            return { status: common_1.HttpStatus.OK, item: savedCode };
        }
    }
    async findAll(company) {
        let qb = typeorm_2.getRepository(code_entity_1.CodeEntity)
            .createQueryBuilder('code')
            .leftJoinAndSelect('code.company', 'company');
        if (company > 0) {
            qb = qb.where('company.id = :id', { id: company });
        }
        const codes = await qb.getMany();
        return { items: codes, totalCount: codes.length };
    }
    async findOne(id) {
        const code = await this.codeRepository.findOne({ id: id });
        if (!code) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not Role.'
            };
        }
        return { item: code };
    }
    async update(id, updateCodeDto) {
        const code = await this.codeRepository.findOne({ id: id });
        if (!code) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not Role.'
            };
        }
        code.description = updateCodeDto.description;
        code.content = updateCodeDto.content;
        code.page = updateCodeDto.page;
        code.active = updateCodeDto.active;
        const updated = await this.codeRepository.save(code);
        return { item: updated };
    }
    async remove(id) {
        const role = await this.codeRepository.findOne({ id: id });
        if (!role) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'There is not Role.'
            };
        }
        return await this.codeRepository.delete({ id: id });
    }
};
CodeService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(code_entity_1.CodeEntity)),
    __param(1, typeorm_1.InjectRepository(company_entity_1.CompanyEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], CodeService);
exports.CodeService = CodeService;


/***/ }),
/* 159 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(6);
const code_service_1 = __webpack_require__(158);
const create_code_dto_1 = __webpack_require__(160);
const update_code_dto_1 = __webpack_require__(161);
let CodeController = class CodeController {
    constructor(codeService) {
        this.codeService = codeService;
    }
    create(createCodeDto) {
        return this.codeService.create(createCodeDto);
    }
    findAll(company) {
        return this.codeService.findAll(company);
    }
    findOne(id) {
        return this.codeService.findOne(+id);
    }
    update(id, updateCodeDto) {
        return this.codeService.update(+id, updateCodeDto);
    }
    remove(id) {
        return this.codeService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_code_dto_1.CreateCodeDto !== "undefined" && create_code_dto_1.CreateCodeDto) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], CodeController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('company')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CodeController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CodeController.prototype, "findOne", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof update_code_dto_1.UpdateCodeDto !== "undefined" && update_code_dto_1.UpdateCodeDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], CodeController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CodeController.prototype, "remove", null);
CodeController = __decorate([
    common_1.Controller('code'),
    __metadata("design:paramtypes", [typeof (_c = typeof code_service_1.CodeService !== "undefined" && code_service_1.CodeService) === "function" ? _c : Object])
], CodeController);
exports.CodeController = CodeController;


/***/ }),
/* 160 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const decorators_1 = __webpack_require__(86);
class CreateCodeDto {
}
__decorate([
    decorators_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateCodeDto.prototype, "description", void 0);
__decorate([
    decorators_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateCodeDto.prototype, "content", void 0);
exports.CreateCodeDto = CreateCodeDto;


/***/ }),
/* 161 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const class_validator_1 = __webpack_require__(30);
class UpdateCodeDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdateCodeDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdateCodeDto.prototype, "content", void 0);
exports.UpdateCodeDto = UpdateCodeDto;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("3b03687a0cbb799da02f")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises;
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 					blockingPromises.push(promise);
/******/ 					waitForBlockingPromises(function () {
/******/ 						return setStatus("ready");
/******/ 					});
/******/ 					return promise;
/******/ 				case "prepare":
/******/ 					blockingPromises.push(promise);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises.length === 0) return fn();
/******/ 			var blocker = blockingPromises;
/******/ 			blockingPromises = [];
/******/ 			return Promise.all(blocker).then(function () {
/******/ 				return waitForBlockingPromises(fn);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						blockingPromises = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error("apply() is only allowed in ready status");
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = __webpack_require__.hmrS_require = __webpack_require__.hmrS_require || {
/******/ 			0: 1
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no chunk install function needed
/******/ 		
/******/ 		// no chunk loading
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			var update = require("./" + __webpack_require__.hu(chunkId));
/******/ 			var updatedModules = update.modules;
/******/ 			var runtime = update.runtime;
/******/ 			for(var moduleId in updatedModules) {
/******/ 				if(__webpack_require__.o(updatedModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = updatedModules[moduleId];
/******/ 					if(updatedModulesList) updatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 		}
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.requireHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.require = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.require = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.requireHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						!__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						__webpack_require__.o(installedChunks, chunkId) &&
/******/ 						installedChunks[chunkId] !== undefined
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = function() {
/******/ 			return Promise.resolve().then(function() {
/******/ 				return require("./" + __webpack_require__.hmrF());
/******/ 			})['catch'](function(err) { if(err.code !== 'MODULE_NOT_FOUND') throw err; });
/******/ 		}
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__(0);
/******/ 	var __webpack_exports__ = __webpack_require__(3);
/******/ 	
/******/ })()
;