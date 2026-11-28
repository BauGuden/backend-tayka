import { ValidateIf, IsString, MaxLength, IsNotEmpty } from 'class-validator';

/** Metadatos administrativos: requiere autorizacion en servicio. Validacion de forma; integridad, permisos y transiciones se resuelven en servicio/BD. */
export class UpdateRedDto {
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(40)
  @IsNotEmpty()
  nombre?: string;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  fraseRed?: string;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  urlRpc?: string;
}
