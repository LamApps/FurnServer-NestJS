import { IsNotEmpty } from "class-validator";

export class CreateEmailDto {
    @IsNotEmpty()
    readonly company: number;
    
    email: string;
    description: string;
    store_location: string;
    subject_line: string;
    body: string;
    name_format: string;
    active: boolean;
}
