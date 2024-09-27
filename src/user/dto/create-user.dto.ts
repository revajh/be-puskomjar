import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({message:"username Tidak Boleh Kosong"})
  username: string;

  @IsNotEmpty({message:"email Tidak Boleh Kosong"})
  @IsEmail()
  email: string;

  @IsNotEmpty({message:"password Tidak Boleh Kosong"})
  @MinLength(8)
  password: string;
}