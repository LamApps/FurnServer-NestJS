import { IsNotEmpty } from 'class-validator';

export class ScreenDto {

  @IsNotEmpty()
  readonly type: number;

  @IsNotEmpty()
  readonly device: string;
}