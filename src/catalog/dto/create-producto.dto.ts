import {
  IsUUID,
  IsOptional,
  IsString,
  MaxLength,
  IsNotEmpty,
  ValidateIf,
  IsBoolean,
} from 'class-validator';

/** Metadatos administrativos: requiere autorizacion en servicio. Validacion de forma; integridad, permisos y transiciones se resuelven en servicio/BD. */
export class CreateProductoDto {
  @IsUUID()
  categoriaId!: string;

  @IsOptional()
  @IsUUID()
  marcaId?: string | null;

  @IsString()
  @MaxLength(220)
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @MaxLength(260)
  @IsNotEmpty()
  identificadorUrl!: string;

  @IsOptional()
  @IsString()
  descripcion?: string | null;

  @IsOptional()
  @IsString()
  descripcionGarantia?: string | null;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsBoolean()
  esPerecedero?: boolean;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsBoolean()
  esRegulado?: boolean;
}
