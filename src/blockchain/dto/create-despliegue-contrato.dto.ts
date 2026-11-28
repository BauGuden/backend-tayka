import { IsUUID, IsString, MaxLength } from 'class-validator';

/** Metadatos administrativos: requiere autorizacion en servicio. Solo metadatos administrativos; hash y fecha de despliegue se obtienen de fuente verificada. */
export class CreateDespliegueContratoDto {
  @IsUUID()
  redId!: string;

  @IsString()
  @MaxLength(100)
  nombreContrato!: string;

  @IsString()
  @MaxLength(100)
  direccionContrato!: string;

  @IsString()
  @MaxLength(40)
  version!: string;
}
