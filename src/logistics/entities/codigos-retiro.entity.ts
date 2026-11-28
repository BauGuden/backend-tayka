import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  type Relation,
} from 'typeorm';
import { Entrega } from './entregas.entity';
import { Usuario } from '../../identity/entities/usuarios.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'logistics', name: 'codigos_retiro', synchronize: false })
export class CodigoRetiro {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'entrega_id', type: 'uuid', unique: true })
  entregaId!: string;

  @Column({ name: 'hash_token', type: 'varchar', length: 128, unique: true })
  hashToken!: string;

  @Column({ name: 'vence_en', type: 'timestamptz' })
  venceEn!: Date;

  @Column({ name: 'canjeado_en', type: 'timestamptz', nullable: true })
  canjeadoEn!: Date | null;

  @Column({ name: 'canjeado_por', type: 'uuid', nullable: true })
  canjeadoPor!: string | null;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @OneToOne(() => Entrega, { nullable: false })
  @JoinColumn({ name: 'entrega_id', referencedColumnName: 'id' })
  entrega!: Relation<Entrega>;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'canjeado_por', referencedColumnName: 'id' })
  canjeadoPorRelacion!: Relation<Usuario> | null;
}
