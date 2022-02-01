"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapped_types_1 = require("@nestjs/mapped-types");
const create_company_dto_1 = require("./create-company.dto");
class UpdateCompanyDto extends mapped_types_1.PartialType(create_company_dto_1.CreateCompanyDto) {
}
exports.UpdateCompanyDto = UpdateCompanyDto;
//# sourceMappingURL=update-company.dto.js.map