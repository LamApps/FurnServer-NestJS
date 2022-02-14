import { IsNotEmpty } from "class-validator/decorator/decorators";

export class VerifyRoomDto {

    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    password: string;

    company:number;

}