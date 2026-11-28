import {
  ValidateIf,
  IsInt,
  Min,
  Max,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

/** Autor del contexto; compra, pertenencia y elegibilidad en servicio. */
export class UpdateResenaDto {
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsInt()
  @Min(1)
  @Max(5)
  calificacion?: number;

  @IsOptional()
  @IsString()
  @MaxLength(180)
  titulo?: string | null;

  @IsOptional()
  @IsString()
  contenido?: string | null;
}
