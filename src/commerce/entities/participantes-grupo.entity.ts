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
import { Ciudad } from '../../geography/entities/ciudades.entity';
import { VersionOferta } from './versiones-oferta.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * UNIQUE(grupo_id,usuario_id)
 * cantidad: CHECK(cantidad > 0)
 * precio_unitario_fijado: CHECK(precio_unitario_fijado >= 0)
 * cargo_envio: CHECK(cargo_envio >= 0)
 * cargo_servicio: CHECK(cargo_servicio >= 0)
 * cargo_impuestos: CHECK(cargo_impuestos >= 0)
 * modalidad_entrega: CHECK(modalidad_entrega IN ('retiro','envio'))
 * estado: CHECK(estado IN ('activo','retirado','reemplazado','cancelado','completado'))
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'commerce', name: 'participantes_grupo', synchronize: false })
export class ParticipanteGrupo {
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

  @Column({ name: 'cantidad', type: 'numeric', precision: 16, scale: 3 })
  cantidad!: string;

  @Column({
    name: 'precio_unitario_fijado',
    type: 'numeric',
    precision: 20,
    scale: 7,
  })
  precioUnitarioFijado!: string;

  @Column({
    name: 'cargo_envio',
    type: 'numeric',
    precision: 20,
    scale: 7,
    default: () => '0',
  })
  cargoEnvio!: string;

  @Column({
    name: 'cargo_servicio',
    type: 'numeric',
    precision: 20,
    scale: 7,
    default: () => '0',
  })
  cargoServicio!: string;

  @Column({
    name: 'cargo_impuestos',
    type: 'numeric',
    precision: 20,
    scale: 7,
    default: () => '0',
  })
  cargoImpuestos!: string;

  @Column({
    name: 'total_adeudado',
    type: 'numeric',
    precision: 24,
    scale: 7,
    nullable: true,
    asExpression:
      'cantidad * precio_unitario_fijado + cargo_envio + cargo_servicio + cargo_impuestos',
    generatedType: 'STORED',
    insert: false,
    update: false,
  })
  readonly totalAdeudado!: string | null;

  @Column({ name: 'modalidad_entrega', type: 'varchar', length: 18 })
  modalidadEntrega!: string;

  @Column({ name: 'ciudad_destino_id', type: 'uuid', nullable: true })
  ciudadDestinoId!: string | null;

  @Column({ name: 'version_condiciones_aceptada_id', type: 'uuid' })
  versionCondicionesAceptadaId!: string;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 20,
    default: () => "'activo'",
  })
  estado!: string;

  @Column({ name: 'adherido_en', type: 'timestamptz', default: () => 'now()' })
  adheridoEn!: Date;

  @Column({
    name: 'actualizado_en',
    type: 'timestamptz',
    default: () => 'now()',
  })
  actualizadoEn!: Date;

  @ManyToOne(() => GrupoCompra, { nullable: false })
  @JoinColumn({ name: 'grupo_id', referencedColumnName: 'id' })
  grupo!: Relation<GrupoCompra>;

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
  usuario!: Relation<Usuario>;

  @ManyToOne(() => Ciudad, { nullable: true })
  @JoinColumn({ name: 'ciudad_destino_id', referencedColumnName: 'id' })
  ciudadDestino!: Relation<Ciudad> | null;

  @ManyToOne(() => VersionOferta, { nullable: false })
  @JoinColumn({
    name: 'version_condiciones_aceptada_id',
    referencedColumnName: 'id',
  })
  versionCondicionesAceptada!: Relation<VersionOferta>;
}
