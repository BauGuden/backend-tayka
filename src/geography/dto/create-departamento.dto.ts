import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

/** La unicidad de nombre y abreviatura se verifica en el servicio/BD. */
export class CreateDepartamentoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre!: string;

  @IsOptional()
  @IsString()
  @MaxLength(8)
  abreviatura?: string | null;
}
