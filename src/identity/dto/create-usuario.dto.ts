import {
  IsString,
  MaxLength,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  Matches,
  IsISO8601,
} from 'class-validator';

/** Alta de perfil sin credenciales; cambios de correo/telefono y verificacion requieren comando separado. */
export class CreateUsuarioDto {
  @IsString()
  @MaxLength(254)
  @IsEmail()
  correoElectronico!: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  telefono?: string | null;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  nombres!: string;

  @IsString()
  @MaxLength(140)
  @IsNotEmpty()
  apellidos!: string;

  @IsOptional()
  @IsString()
  urlAvatar?: string | null;

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @IsISO8601({ strict: true, strictSeparator: true })
  fechaNacimiento?: string | null;
}
