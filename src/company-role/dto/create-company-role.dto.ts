import { IsNotEmpty } from "class-validator";

export class CreateCompanyRoleDto {
    @IsNotEmpty()
    readonly company_id: string;

    @IsNotEmpty()
    readonly name: string;

    readonly description: string;

    @IsNotEmpty()
    readonly menus: any[];
}
