import { ValidateIf, IsString, MaxLength, IsNotEmpty } from 'class-validator';

/** Solicitud propia; autor, asignacion, prioridad y estado del servidor. Acceso a referencias en servicio. */
export class UpdateCasoSoporteDto {
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(220)
  @IsNotEmpty()
  asunto?: string;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(40)
  @IsNotEmpty()
  categoria?: string;
}
