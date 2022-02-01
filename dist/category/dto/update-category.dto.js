"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapped_types_1 = require("@nestjs/mapped-types");
const create_category_dto_1 = require("./create-category.dto");
class UpdateCategoryDto extends mapped_types_1.PartialType(create_category_dto_1.CreateCategoryDto) {
}
exports.UpdateCategoryDto = UpdateCategoryDto;
//# sourceMappingURL=update-category.dto.js.map