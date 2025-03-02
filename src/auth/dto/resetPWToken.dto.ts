import { IsNotEmpty } from "class-validator";

export class ResetPWTokenDto {
    @IsNotEmpty()
    resetToken: string;

    @IsNotEmpty()
    password: string;
}