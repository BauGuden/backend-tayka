import { IsUUID, IsString, MaxLength, IsIn, ValidateIf } from 'class-validator';
import { IsExactDecimal } from './decimal-validation';

/** Configuracion por proveedor autorizado; identidad de asociacion inmutable. */
export class CreateDestinoOfertaDto {
  @IsUUID()
  ofertaId!: string;

  @IsUUID()
  ciudadId!: string;

  @IsString()
  @MaxLength(18)
  @IsIn(['retiro', 'envio'])
  modalidadEntrega!: 'retiro' | 'envio';

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @IsExactDecimal(20, 7, { min: '0' })
  costoEnvioEstimado?: string;
}
