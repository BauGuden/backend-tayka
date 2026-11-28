import {
  IsUUID,
  IsOptional,
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

/** Metadatos administrativos: requiere autorizacion en servicio. Administracion autorizada; pertenencia del proveedor/ciudad en servicio, no actor autenticado. */
export class CreateAlmacenDto {
  @IsUUID()
  proveedorId!: string;

  @IsOptional()
  @IsUUID()
  ciudadId?: string | null;

  @IsString()
  @MaxLength(160)
  @IsNotEmpty()
  nombre!: string;

  @IsOptional()
  @IsString()
  direccion?: string | null;
}
