import { IsUUID, IsString, IsOptional } from 'class-validator';
import { HasSqlTrimmedLength } from './content-validation';

/** Mensaje propio; autor del contexto, nota interna requiere comando con rol. Historial sin Update generico. */
export class CreateMensajeSoporteDto {
  @IsUUID()
  casoSoporteId!: string;

  @IsString()
  @HasSqlTrimmedLength(1)
  contenido!: string;

  @IsOptional()
  @IsString()
  urlAdjunto?: string | null;
}
