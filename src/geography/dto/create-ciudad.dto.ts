import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

/** La existencia del departamento y UNIQUE(departamento_id, nombre) son del servicio/BD. */
export class CreateCiudadDto {
  @IsUUID()
  departamentoId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  nombre!: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  codigoPostal?: string | null;
}
