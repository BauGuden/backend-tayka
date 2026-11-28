import { IsUUID, IsString, MaxLength, IsIn } from 'class-validator';

/** Usuario del contexto; Update no contiene ninguna parte de la PK compuesta. */
export class CreateReaccionDto {
  @IsUUID()
  comentarioId!: string;

  @IsString()
  @MaxLength(16)
  @IsIn(['me_gusta', 'no_me_gusta'])
  reaccion!: 'me_gusta' | 'no_me_gusta';
}
