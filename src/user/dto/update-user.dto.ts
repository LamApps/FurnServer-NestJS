import { IsNotEmpty } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto {
    @IsNotEmpty()
    readonly active: boolean;

    birthday: string;
    firstname: string;
    lastname: string;
    position: string;
    login: string;
    email: string;
    role: number;
    photo: string;
    password: string;
    mobile: string;
    database: string;
    default_database: string;

    ip_address: string;
    last_login_date: string;
    last_login_time: string;
    last_login_database: string;
    browser: string;
    operating_system: string;
    timeout: number;
}