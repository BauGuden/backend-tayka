import { ValidateIf, IsString, MaxLength } from 'class-validator';

/** Metadatos administrativos: requiere autorizacion en servicio. Solo metadatos administrativos; hash y fecha de despliegue se obtienen de fuente verificada. */
export class UpdateDespliegueContratoDto {
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(100)
  nombreContrato?: string;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(40)
  version?: string;
}
