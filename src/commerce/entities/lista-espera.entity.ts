import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { GrupoCompra } from './grupos-compra.entity';
import { Usuario } from '../../identity/entities/usuarios.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * UNIQUE(grupo_id,usuario_id)
 * cantidad_deseada: CHECK(cantidad_deseada > 0)
 * estado: CHECK(estado IN ('esperando','invitado','aceptado','rechazado','vencido'))
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'commerce', name: 'lista_espera', synchronize: false })
export class ListaEspera {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'grupo_id', type: 'uuid' })
  grupoId!: string;

  @Column({ name: 'usuario_id', type: 'uuid' })
  usuarioId!: string;

  @Column({
    name: 'cantidad_deseada',
    type: 'numeric',
    precision: 16,
    scale: 3,
  })
  cantidadDeseada!: string;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 18,
    default: () => "'esperando'",
  })
  estado!: string;

  @Column({ name: 'invitado_en', type: 'timestamptz', nullable: true })
  invitadoEn!: Date | null;

  @Column({ name: 'respondido_en', type: 'timestamptz', nullable: true })
  respondidoEn!: Date | null;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @ManyToOne(() => GrupoCompra, { nullable: false })
  @JoinColumn({ name: 'grupo_id', referencedColumnName: 'id' })
  grupo!: Relation<GrupoCompra>;

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
  usuario!: Relation<Usuario>;
}
