import { IsBoolean, IsIn, IsInt, IsNotEmpty, IsString } from "class-validator";

export class ValidEmployeeModel {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsInt()
    @IsNotEmpty()
    salary: number;

    @IsIn(['USD', 'EUR', 'INR'])
    currency: string;

    @IsString()
    @IsNotEmpty()
    department: string;

    @IsString()
    @IsNotEmpty()
    sub_department: string;
    
    @IsBoolean()
    on_contract: boolean;
}