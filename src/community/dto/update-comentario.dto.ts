import { ValidateIf, IsString } from 'class-validator';
import { HasSqlTrimmedLength } from './content-validation';

/** Contenido propio; autor del contexto. Destino unico y padre autorizado; moderacion interna. */
export class UpdateComentarioDto {
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @HasSqlTrimmedLength(1, 5000)
  contenido?: string;
}
