"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapped_types_1 = require("@nestjs/mapped-types");
const create_uuid_dto_1 = require("./create-uuid.dto");
class UpdateUuidDto extends mapped_types_1.PartialType(create_uuid_dto_1.CreateUuidDto) {
}
exports.UpdateUuidDto = UpdateUuidDto;
//# sourceMappingURL=update-uuid.dto.js.map