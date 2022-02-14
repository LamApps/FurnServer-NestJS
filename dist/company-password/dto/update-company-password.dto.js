"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCompanyPasswordDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_company_password_dto_1 = require("./create-company-password.dto");
class UpdateCompanyPasswordDto extends mapped_types_1.PartialType(create_company_password_dto_1.CreateCompanyPasswordDto) {
}
exports.UpdateCompanyPasswordDto = UpdateCompanyPasswordDto;
//# sourceMappingURL=update-company-password.dto.js.map