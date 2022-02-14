"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateQrcodeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_qrcode_dto_1 = require("./create-qrcode.dto");
class UpdateQrcodeDto extends mapped_types_1.PartialType(create_qrcode_dto_1.CreateQrcodeDto) {
}
exports.UpdateQrcodeDto = UpdateQrcodeDto;
//# sourceMappingURL=update-qrcode.dto.js.map