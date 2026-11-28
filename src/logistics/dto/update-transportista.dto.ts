import {
  ValidateIf,
  IsString,
  MaxLength,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

/** Metadatos administrativos: requiere autorizacion en servicio. Validacion de forma; integridad, permisos y transiciones se resuelven en servicio/BD. */
export class UpdateTransportistaDto {
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(150)
  @IsNotEmpty()
  nombre?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  telefonoContacto?: string | null;

  @IsOptional()
  @IsString()
  plantillaUrlSeguimiento?: string | null;
}
