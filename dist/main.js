"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
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
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
//# sourceMappingURL=main.js.map