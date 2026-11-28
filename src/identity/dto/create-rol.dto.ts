import { IsString, MaxLength, IsNotEmpty, IsOptional } from 'class-validator';

/** Metadatos administrativos: requiere autorizacion en servicio. Validacion de forma; integridad, permisos y transiciones se resuelven en servicio/BD. */
export class CreateRolDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  codigo!: string;

  @IsString()
  @MaxLength(90)
  @IsNotEmpty()
  nombre!: string;

  @IsOptional()
  @IsString()
  descripcion?: string | null;
}
