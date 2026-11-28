import {
  ValidateIf,
  IsString,
  IsOptional,
  MaxLength,
  IsIn,
  IsInt,
} from 'class-validator';

/** Metadatos administrativos: requiere autorizacion en servicio. Validacion de forma; integridad, permisos y transiciones se resuelven en servicio/BD. */
export class UpdateArchivoProductoDto {
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  urlArchivo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  textoAlternativo?: string | null;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(15)
  @IsIn(['imagen', 'video'])
  tipoArchivo?: 'imagen' | 'video';

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsInt()
  ordenVisualizacion?: number;
}
