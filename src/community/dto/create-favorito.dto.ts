import { IsUUID } from 'class-validator';

/** Usuario del contexto; sin campos mutables. Quitar favorito requiere accion de desasociacion. */
export class CreateFavoritoDto {
  @IsUUID()
  productoId!: string;
}
