import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Usuario } from '../../identity/entities/usuarios.entity';
import { Comentario } from './comentarios.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * reaccion: CHECK(reaccion IN ('me_gusta','no_me_gusta'))
 */
@Entity({ schema: 'community', name: 'reacciones', synchronize: false })
export class Reaccion {
  @PrimaryColumn({ name: 'usuario_id', type: 'uuid' })
  usuarioId!: string;

  @PrimaryColumn({ name: 'comentario_id', type: 'uuid' })
  comentarioId!: string;

  @Column({ name: 'reaccion', type: 'varchar', length: 16 })
  reaccion!: string;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
  usuario!: Relation<Usuario>;

  @ManyToOne(() => Comentario, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'comentario_id', referencedColumnName: 'id' })
  comentario!: Relation<Comentario>;
}
