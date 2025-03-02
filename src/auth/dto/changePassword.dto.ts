import { IsString, Matches, MinLength } from "class-validator";

export class ChangePasswordDto {
    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[0-9])/, { message: 'Password must contain at least one number' })
    oldPassword: string;

    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[0-9])/, { message: 'Password must contain at least one number' })
    newPassword: string;
}