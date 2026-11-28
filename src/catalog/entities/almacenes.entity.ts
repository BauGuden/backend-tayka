import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Proveedor } from './proveedores.entity';
import { Ciudad } from '../../geography/entities/ciudades.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'catalog', name: 'almacenes', synchronize: false })
export class Almacen {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'proveedor_id', type: 'uuid' })
  proveedorId!: string;

  @Column({ name: 'ciudad_id', type: 'uuid', nullable: true })
  ciudadId!: string | null;

  @Column({ name: 'nombre', type: 'varchar', length: 160 })
  nombre!: string;

  @Column({ name: 'direccion', type: 'text', nullable: true })
  direccion!: string | null;

  @Column({ name: 'esta_activo', type: 'boolean', default: () => 'true' })
  estaActivo!: boolean;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @ManyToOne(() => Proveedor, { nullable: false })
  @JoinColumn({ name: 'proveedor_id', referencedColumnName: 'id' })
  proveedor!: Relation<Proveedor>;

  @ManyToOne(() => Ciudad, { nullable: true })
  @JoinColumn({ name: 'ciudad_id', referencedColumnName: 'id' })
  ciudad!: Relation<Ciudad> | null;
}
