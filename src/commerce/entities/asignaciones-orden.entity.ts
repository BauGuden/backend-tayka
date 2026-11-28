import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  type Relation,
} from 'typeorm';
import { OrdenCompra } from './ordenes-compra.entity';
import { ParticipanteGrupo } from './participantes-grupo.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * cantidad_asignada: CHECK(cantidad_asignada > 0)
 * costo_asignado: CHECK(costo_asignado >= 0)
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'commerce', name: 'asignaciones_orden', synchronize: false })
export class AsignacionOrden {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'orden_compra_id', type: 'uuid' })
  ordenCompraId!: string;

  @Column({ name: 'participante_id', type: 'uuid', unique: true })
  participanteId!: string;

  @Column({
    name: 'cantidad_asignada',
    type: 'numeric',
    precision: 16,
    scale: 3,
  })
  cantidadAsignada!: string;

  @Column({ name: 'costo_asignado', type: 'numeric', precision: 24, scale: 7 })
  costoAsignado!: string;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @ManyToOne(() => OrdenCompra, { nullable: false })
  @JoinColumn({ name: 'orden_compra_id', referencedColumnName: 'id' })
  ordenCompra!: Relation<OrdenCompra>;

  @OneToOne(() => ParticipanteGrupo, { nullable: false })
  @JoinColumn({ name: 'participante_id', referencedColumnName: 'id' })
  participante!: Relation<ParticipanteGrupo>;
}
