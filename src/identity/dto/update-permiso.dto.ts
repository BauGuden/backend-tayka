import { IsOptional, IsString } from 'class-validator';

/** Metadatos administrativos: requiere autorizacion en servicio. Validacion de forma; integridad, permisos y transiciones se resuelven en servicio/BD. */
export class UpdatePermisoDto {
  @IsOptional()
  @IsString()
  descripcion?: string | null;
}
