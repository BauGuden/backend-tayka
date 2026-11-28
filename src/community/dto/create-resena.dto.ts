import {
  IsUUID,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsString,
  MaxLength,
} from 'class-validator';
import { HasExactlyOne } from './content-validation';

/** Autor del contexto; compra, pertenencia y elegibilidad en servicio. */
export class CreateResenaDto {
  @IsUUID()
  participanteGrupoId!: string;

  @IsOptional()
  @IsUUID()
  productoId?: string | null;

  @IsOptional()
  @IsUUID()
  proveedorId?: string | null;

  @IsInt()
  @Min(1)
  @Max(5)
  @HasExactlyOne(['productoId', 'proveedorId'])
  calificacion!: number;

  @IsOptional()
  @IsString()
  @MaxLength(180)
  titulo?: string | null;

  @IsOptional()
  @IsString()
  contenido?: string | null;
}
