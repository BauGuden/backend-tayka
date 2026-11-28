import { IsOptional, IsUUID, IsString } from 'class-validator';
import { HasExactlyOne, HasSqlTrimmedLength } from './content-validation';

/** Contenido propio; autor del contexto. Destino unico y padre autorizado; moderacion interna. */
export class CreateComentarioDto {
  @IsOptional()
  @IsUUID()
  productoId?: string | null;

  @IsOptional()
  @IsUUID()
  ofertaId?: string | null;

  @IsOptional()
  @IsUUID()
  grupoId?: string | null;

  @IsOptional()
  @IsUUID()
  comentarioPadreId?: string | null;

  @IsString()
  @HasExactlyOne(['productoId', 'ofertaId', 'grupoId'])
  @HasSqlTrimmedLength(1, 5000)
  contenido!: string;
}
