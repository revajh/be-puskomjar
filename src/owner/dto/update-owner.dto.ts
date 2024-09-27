import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateOwnerDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly alias?: string;

  @IsOptional()
  @IsBoolean()
  readonly is_active?: boolean;
}
