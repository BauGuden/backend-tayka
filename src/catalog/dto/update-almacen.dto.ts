import {
  ValidateIf,
  IsString,
  MaxLength,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

/** Metadatos administrativos: requiere autorizacion en servicio. Administracion autorizada; pertenencia del proveedor/ciudad en servicio, no actor autenticado. */
export class UpdateAlmacenDto {
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(160)
  @IsNotEmpty()
  nombre?: string;

  @IsOptional()
  @IsString()
  direccion?: string | null;
}
