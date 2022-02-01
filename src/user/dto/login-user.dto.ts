import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {

  @IsNotEmpty()
  readonly company: string;

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;

  readonly ip_address: string;
  readonly last_login_date: string;
  readonly last_login_time: string;
  readonly last_login_database: string;
  readonly browser: string;
  readonly operating_system: string;
}