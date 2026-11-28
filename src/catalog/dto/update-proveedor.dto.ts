import {
  ValidateIf,
  IsString,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsEmail,
} from 'class-validator';

/** Datos comerciales; cifrado, ultimos4Nit, verificacion y ciclo de vida son del servidor. */
export class UpdateProveedorDto {
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(220)
  @IsNotEmpty()
  razonSocial?: string;

  @IsOptional()
  @IsString()
  @MaxLength(220)
  nombreComercial?: string | null;

  @IsOptional()
  @IsString()
  descripcion?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(254)
  @IsEmail()
  correoContacto?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  telefonoContacto?: string | null;

  @IsOptional()
  @IsString()
  urlSitio?: string | null;

  @IsOptional()
  @IsString()
  direccion?: string | null;
}
