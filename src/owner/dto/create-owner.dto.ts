import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateOwnerDto {
  @IsString({message:"Nama Tipe Datanya Harus Berupa String"})
  @IsNotEmpty({message:"Nama Tidak Boleh Kosong"})
  readonly name: string;
  
  @IsString({message:"Nama Tipe Datanya Harus Berupa String"})
  @IsNotEmpty({message:"Nama Tidak Boleh Kosong"})
  readonly alias: string;

  @IsOptional()
  @IsBoolean()
  readonly is_active?: boolean;
}
