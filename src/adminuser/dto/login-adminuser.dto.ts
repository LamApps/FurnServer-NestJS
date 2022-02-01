import { IsNotEmpty } from 'class-validator';

export class LoginAdminuserDto {

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}