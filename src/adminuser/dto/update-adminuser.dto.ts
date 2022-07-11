import { IsNotEmpty } from "class-validator";
import { Role } from "../../enum/role.enum";
import { CreateAdminuserDto } from "./create-adminuser.dto";

export class UpdateAdminuserDto {
    @IsNotEmpty()
    readonly active: boolean;
    birthday: string;
    firstname: string;
    lastname: string;
    position: string;
    email: string;
    role: string;
    photo: string;
    mobile: string;
    password: string;
    chatalert: boolean;
    sound: boolean;
    alert_fadetime: number;
    default_status: string;
}