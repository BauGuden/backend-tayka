import {
  IsOptional,
  IsUUID,
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { HasExactlyOne } from './content-validation';

/** Denuncia propia; actor del contexto, resolucion y moderacion internas. */
export class CreateReporteDto {
  @IsOptional()
  @IsUUID()
  comentarioId?: string | null;

  @IsOptional()
  @IsUUID()
  resenaId?: string | null;

  @IsString()
  @MaxLength(80)
  @IsNotEmpty()
  @HasExactlyOne(['comentarioId', 'resenaId'])
  motivo!: string;

  @IsOptional()
  @IsString()
  detalles?: string | null;
}
