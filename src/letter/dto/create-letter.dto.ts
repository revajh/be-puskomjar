import { IsString, IsDate, IsOptional, IsInt, IsNotEmpty} from 'class-validator';
import { Type } from 'class-transformer';
export class CreateLetterDto {
  @IsOptional()
  @IsInt()
  number?: number; 

  @IsNotEmpty({message:"about Tidak Boleh Kosong"})
  @IsString()
  about: string;

  @IsNotEmpty({message:"date Tidak Boleh Kosong"})
  @IsDate()
  @Type(() => Date) 
  readonly date_of_letter:Date;

  @IsNotEmpty({message:"link Tidak Boleh Kosong"})
  @IsString()
  link: string;

  @IsOptional()
  @IsInt()
  ownerId?: number; 
}
