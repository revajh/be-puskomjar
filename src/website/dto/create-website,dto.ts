import { Type } from 'class-transformer';
import { IsString, IsBoolean, IsOptional,IsDate, IsInt,IsNotEmpty} from 'class-validator';

export class CreateWebsiteDto {
  @IsNotEmpty({message:"Nama Tidak Boleh Kosong"})
  @IsString()
  readonly name: string;

  @IsNotEmpty({message:"link Tidak Boleh Kosong"})
  @IsString()
  readonly link: string;

  @IsNotEmpty({message:"provider Tidak Boleh Kosong"})
  @IsString()
  readonly provider:string;

  @IsNotEmpty({message:"date Tidak Boleh Kosong"})
  @IsDate()
  @Type(() => Date) 
  readonly payment_lastest:Date;

  @IsNotEmpty({message:"owner Tidak Boleh Kosong"})
  @IsInt()
  readonly ownerId:number;

  @IsOptional()
  @IsBoolean()
  readonly is_active?: boolean;
}
