"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
const express_1 = require("express");
async function bootstrap() {
    const httpsOptions = {
        key: fs.readFileSync('../ssl-key/private.key'),
        cert: fs.readFileSync('../ssl-key/fullcert.crt'),
    };
    const app = await core_1.NestFactory.create(app_module_1.ApplicationModule, {
        httpsOptions,
    });
    app.enableCors();
    app.setGlobalPrefix('api');
    app.useStaticAssets(path_1.join(__dirname, '..', 'uploads'));
    app.use(express_1.json({ limit: '50mb' }));
    app.use(express_1.urlencoded({ extended: true, limit: '50mb' }));
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
    await app.listen(4201, "0.0.0.0");
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
//# sourceMappingURL=main.js.map