import { IsNotEmpty } from "class-validator/decorator/decorators";

export class CreateDeviceDto {

    @IsNotEmpty()
    readonly type: number;
  
    @IsNotEmpty()
    readonly userId: number;
  }