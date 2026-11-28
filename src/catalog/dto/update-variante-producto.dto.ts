import {
  ValidateIf,
  IsString,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsIn,
} from 'class-validator';
import { IsExactDecimal } from './decimal-validation';

/** Metadatos administrativos: requiere autorizacion en servicio. Validacion de forma; integridad, permisos y transiciones se resuelven en servicio/BD. */
export class UpdateVarianteProductoDto {
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  sku?: string;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(180)
  @IsNotEmpty()
  nombre?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  codigoBarras?: string | null;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(24)
  @IsIn(['pieza', 'caja', 'paquete', 'kg', 'g', 'l', 'ml'])
  unidad?: 'pieza' | 'caja' | 'paquete' | 'kg' | 'g' | 'l' | 'ml';

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @IsExactDecimal(16, 3, { min: '0', exclusiveMin: true })
  unidadesPorPaquete?: string;

  @IsOptional()
  @IsString()
  @IsExactDecimal(14, 3, { min: '0' })
  pesoGramos?: string | null;
}
