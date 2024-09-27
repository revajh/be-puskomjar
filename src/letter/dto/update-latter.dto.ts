import {
  IsString,
  IsDate,
  IsOptional,
  IsNumber,
  IsInt,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateLetterDto {
  @IsOptional()
  @IsInt()
  number?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNotEmpty()
  @IsString()
  about?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date_of_letter?: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  link?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  readonly ownerId: number;
}
