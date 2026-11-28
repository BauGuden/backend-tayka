import { IsString, MaxLength, IsNotEmpty } from 'class-validator';

/** Metadatos administrativos: requiere autorizacion en servicio. Validacion de forma; integridad, permisos y transiciones se resuelven en servicio/BD. */
export class CreateMarcaDto {
  @IsString()
  @MaxLength(120)
  @IsNotEmpty()
  nombre!: string;
}
