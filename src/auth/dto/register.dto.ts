import { Transform } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Matches, MinLength } from "class-validator";

export class RegisterDto {

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[0-9])/, { message: 'Password must contain at least one number' })
    password: string;

    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    @IsPhoneNumber('VN')
    phoneNumber: string;

    @IsDate()
    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    dob: Date;

    @IsString()
    @IsNotEmpty()
    gender: string;
}