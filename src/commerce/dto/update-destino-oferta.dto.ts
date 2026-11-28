import { ValidateIf, IsString } from 'class-validator';
import { IsExactDecimal } from './decimal-validation';

/** Configuracion por proveedor autorizado; identidad de asociacion inmutable. */
export class UpdateDestinoOfertaDto {
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @IsExactDecimal(20, 7, { min: '0' })
  costoEnvioEstimado?: string;
}
