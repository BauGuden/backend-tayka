import { ValidateIf, IsString, MaxLength, IsNotEmpty } from 'class-validator';

/** Metadatos administrativos: requiere autorizacion en servicio. Validacion de forma; integridad, permisos y transiciones se resuelven en servicio/BD. */
export class UpdateMarcaDto {
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(120)
  @IsNotEmpty()
  nombre?: string;
}
