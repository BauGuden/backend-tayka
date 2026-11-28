import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { CasoSoporte } from './casos-soporte.entity';
import { Usuario } from '../../identity/entities/usuarios.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * contenido: CHECK(length(trim(contenido)) > 0)
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'support', name: 'mensajes_soporte', synchronize: false })
export class MensajeSoporte {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'caso_soporte_id', type: 'uuid' })
  casoSoporteId!: string;

  @Column({ name: 'usuario_autor_id', type: 'uuid' })
  usuarioAutorId!: string;

  @Column({ name: 'contenido', type: 'text' })
  contenido!: string;

  @Column({ name: 'url_adjunto', type: 'text', nullable: true })
  urlAdjunto!: string | null;

  @Column({ name: 'es_nota_interna', type: 'boolean', default: () => 'false' })
  esNotaInterna!: boolean;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @ManyToOne(() => CasoSoporte, { nullable: false })
  @JoinColumn({ name: 'caso_soporte_id', referencedColumnName: 'id' })
  casoSoporte!: Relation<CasoSoporte>;

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'usuario_autor_id', referencedColumnName: 'id' })
  usuarioAutor!: Relation<Usuario>;
}
