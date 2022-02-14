import { IsNotEmpty } from "class-validator/decorator/decorators";

export class CreateRoomDto {

    @IsNotEmpty()
    name: string;

    password: string;

    @IsNotEmpty()
    readonly type: number;

    @IsNotEmpty()
    readonly user: number;

    @IsNotEmpty()
    readonly flag: number;

}