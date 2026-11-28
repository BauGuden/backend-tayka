import {
  IsOptional,
  IsUUID,
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

/** Solicitud propia; autor, asignacion, prioridad y estado del servidor. Acceso a referencias en servicio. */
export class CreateCasoSoporteDto {
  @IsOptional()
  @IsUUID()
  grupoId?: string | null;

  @IsOptional()
  @IsUUID()
  obligacionPagoId?: string | null;

  @IsString()
  @MaxLength(220)
  @IsNotEmpty()
  asunto!: string;

  @IsString()
  @MaxLength(40)
  @IsNotEmpty()
  categoria!: string;
}
