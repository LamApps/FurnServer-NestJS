import { IsNotEmpty } from "class-validator";

export class CreateRolesDto {
    @IsNotEmpty()
    readonly name: string;

    readonly code: string;
    readonly description: string;
}
