import { IsString, MaxLength, IsNotEmpty, IsOptional } from 'class-validator';

/** Metadatos administrativos: requiere autorizacion en servicio. Validacion de forma; integridad, permisos y transiciones se resuelven en servicio/BD. */
export class CreateTransportistaDto {
  @IsString()
  @MaxLength(150)
  @IsNotEmpty()
  nombre!: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  telefonoContacto?: string | null;

  @IsOptional()
  @IsString()
  plantillaUrlSeguimiento?: string | null;
}
