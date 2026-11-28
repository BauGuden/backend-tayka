import { IsString, MaxLength, IsNotEmpty } from 'class-validator';

/** Metadatos administrativos: requiere autorizacion en servicio. Validacion de forma; integridad, permisos y transiciones se resuelven en servicio/BD. */
export class CreateRedDto {
  @IsString()
  @MaxLength(40)
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  fraseRed!: string;

  @IsString()
  urlRpc!: string;
}
