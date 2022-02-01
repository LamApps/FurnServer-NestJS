"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapped_types_1 = require("@nestjs/mapped-types");
const create_option_dto_1 = require("./create-option.dto");
class UpdateOptionDto extends mapped_types_1.PartialType(create_option_dto_1.CreateOptionDto) {
}
exports.UpdateOptionDto = UpdateOptionDto;
//# sourceMappingURL=update-option.dto.js.map