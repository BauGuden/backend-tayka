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
import { Resena } from './resenas.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * CHECK(num_nonnulls(comentario_id,resena_id)=1)
 * estado: CHECK(estado IN ('abierto','investigando','resuelto','descartado'))
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'community', name: 'reportes', synchronize: false })
export class Reporte {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'usuario_denunciante_id', type: 'uuid' })
  usuarioDenuncianteId!: string;

  @Column({ name: 'comentario_id', type: 'uuid', nullable: true })
  comentarioId!: string | null;

  @Column({ name: 'resena_id', type: 'uuid', nullable: true })
  resenaId!: string | null;

  @Column({ name: 'motivo', type: 'varchar', length: 80 })
  motivo!: string;

  @Column({ name: 'detalles', type: 'text', nullable: true })
  detalles!: string | null;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 20,
    default: () => "'abierto'",
  })
  estado!: string;

  @Column({ name: 'resuelto_por', type: 'uuid', nullable: true })
  resueltoPor!: string | null;

  @Column({ name: 'resuelto_en', type: 'timestamptz', nullable: true })
  resueltoEn!: Date | null;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'usuario_denunciante_id', referencedColumnName: 'id' })
  usuarioDenunciante!: Relation<Usuario>;

  @ManyToOne(() => Comentario, { nullable: true })
  @JoinColumn({ name: 'comentario_id', referencedColumnName: 'id' })
  comentario!: Relation<Comentario> | null;

  @ManyToOne(() => Resena, { nullable: true })
  @JoinColumn({ name: 'resena_id', referencedColumnName: 'id' })
  resena!: Relation<Resena> | null;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'resuelto_por', referencedColumnName: 'id' })
  resueltoPorRelacion!: Relation<Usuario> | null;
}
