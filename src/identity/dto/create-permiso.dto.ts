import { IsString, MaxLength, IsNotEmpty, IsOptional } from 'class-validator';

/** Metadatos administrativos: requiere autorizacion en servicio. Validacion de forma; integridad, permisos y transiciones se resuelven en servicio/BD. */
export class CreatePermisoDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  codigo!: string;

  @IsOptional()
  @IsString()
  descripcion?: string | null;
}
