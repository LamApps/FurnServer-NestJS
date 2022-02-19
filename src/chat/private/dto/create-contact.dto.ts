import { IsNotEmpty } from "class-validator/decorator/decorators";

export class CreateContactDto {

    @IsNotEmpty()
    isAdmin: boolean;

    @IsNotEmpty()
    target: any;
}