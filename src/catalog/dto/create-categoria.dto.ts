import {
  IsOptional,
  IsUUID,
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

/** Metadatos administrativos: requiere autorizacion en servicio. Validacion de forma; integridad, permisos y transiciones se resuelven en servicio/BD. */
export class CreateCategoriaDto {
  @IsOptional()
  @IsUUID()
  padreId?: string | null;

  @IsString()
  @MaxLength(120)
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @MaxLength(140)
  @IsNotEmpty()
  identificadorUrl!: string;

  @IsOptional()
  @IsString()
  descripcion?: string | null;
}
