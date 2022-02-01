import { IsNotEmpty } from "class-validator/decorator/decorators";
import { Permission } from "../../enum/permission.enum";

export class CreateCompanyMenuDto {
    @IsNotEmpty()
    readonly permission: Permission;
}
