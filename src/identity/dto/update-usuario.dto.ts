import {
  ValidateIf,
  IsString,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  Matches,
  IsISO8601,
} from 'class-validator';

/** Alta de perfil sin credenciales; cambios de correo/telefono y verificacion requieren comando separado. */
export class UpdateUsuarioDto {
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  nombres?: string;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(140)
  @IsNotEmpty()
  apellidos?: string;

  @IsOptional()
  @IsString()
  urlAvatar?: string | null;

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsISO8601({ strict: true, strictSeparator: true })
  fechaNacimiento?: string | null;
}
