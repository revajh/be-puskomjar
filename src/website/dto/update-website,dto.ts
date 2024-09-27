import { Type } from 'class-transformer';
import { IsString,IsOptional, IsNotEmpty, IsInt, IsDate, IsBoolean } from 'class-validator';

export class UpdateWebsiteDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly link: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly provider: string;

 
  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  payment_lastest?: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  readonly ownerId: number;

  @IsOptional()
  @IsBoolean()
    is_active: boolean;
}
  
