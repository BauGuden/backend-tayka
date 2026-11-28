import {
  IsString,
  MaxLength,
  IsNotEmpty,
  ValidateIf,
  IsBoolean,
} from 'class-validator';

/** Usuario autenticado implicito; Update no permite alterar tipoNotificacion ni usuarioId (PK compuesta). */
export class CreatePreferenciaNotificacionDto {
  @IsString()
  @MaxLength(70)
  @IsNotEmpty()
  tipoNotificacion!: string;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsBoolean()
  permiteCorreo?: boolean;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsBoolean()
  permitePush?: boolean;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsBoolean()
  permiteSms?: boolean;
}
