import {
  IsString,
  MaxLength,
  IsIn,
  IsNotEmpty,
  IsBoolean,
} from 'class-validator';

/** Registrar decision propia; actor e IP del contexto. Historial inmutable; version vigente validada por servicio. */
export class CreateConsentimientoDto {
  @IsString()
  @MaxLength(40)
  @IsIn(['terminos', 'privacidad', 'mercadeo', 'tratamiento_datos'])
  tipoPolitica!: 'terminos' | 'privacidad' | 'mercadeo' | 'tratamiento_datos';

  @IsString()
  @MaxLength(40)
  @IsNotEmpty()
  versionPolitica!: string;

  @IsBoolean()
  otorgado!: boolean;
}
