import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Red } from './redes.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * UNIQUE(red_id,direccion_contrato)
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({
  schema: 'blockchain',
  name: 'despliegues_contrato',
  synchronize: false,
})
export class DespliegueContrato {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'red_id', type: 'uuid' })
  redId!: string;

  @Column({ name: 'nombre_contrato', type: 'varchar', length: 100 })
  nombreContrato!: string;

  @Column({ name: 'direccion_contrato', type: 'varchar', length: 100 })
  direccionContrato!: string;

  @Column({ name: 'hash_wasm', type: 'varchar', length: 128, nullable: true })
  hashWasm!: string | null;

  @Column({ name: 'version', type: 'varchar', length: 40 })
  version!: string;

  @Column({ name: 'desplegado_en', type: 'timestamptz', nullable: true })
  desplegadoEn!: Date | null;

  @Column({ name: 'esta_activo', type: 'boolean', default: () => 'true' })
  estaActivo!: boolean;

  @ManyToOne(() => Red, { nullable: false })
  @JoinColumn({ name: 'red_id', referencedColumnName: 'id' })
  red!: Relation<Red>;
}
