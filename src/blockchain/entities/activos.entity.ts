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
 * decimales: CHECK(decimales BETWEEN 0 AND 18)
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'blockchain', name: 'activos', synchronize: false })
export class Activo {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'red_id', type: 'uuid' })
  redId!: string;

  @Column({ name: 'codigo_activo', type: 'varchar', length: 24 })
  codigoActivo!: string;

  @Column({
    name: 'direccion_emisor',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  direccionEmisor!: string | null;

  @Column({
    name: 'direccion_contrato',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  direccionContrato!: string | null;

  @Column({ name: 'decimales', type: 'smallint', default: () => '7' })
  decimales!: number;

  @Column({ name: 'esta_habilitado', type: 'boolean', default: () => 'false' })
  estaHabilitado!: boolean;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @ManyToOne(() => Red, { nullable: false })
  @JoinColumn({ name: 'red_id', referencedColumnName: 'id' })
  red!: Relation<Red>;
}
