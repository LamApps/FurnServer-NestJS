"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapped_types_1 = require("@nestjs/mapped-types");
const create_password_dto_1 = require("./create-password.dto");
class UpdatePasswordDto extends mapped_types_1.PartialType(create_password_dto_1.CreatePasswordDto) {
}
exports.UpdatePasswordDto = UpdatePasswordDto;
//# sourceMappingURL=update-password.dto.js.map