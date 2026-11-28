import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Departamento } from './departamentos.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * UNIQUE(departamento_id, nombre)
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'geography', name: 'ciudades', synchronize: false })
export class Ciudad {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'departamento_id', type: 'uuid' })
  departamentoId!: string;

  @Column({ name: 'nombre', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({
    name: 'codigo_postal',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  codigoPostal!: string | null;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @ManyToOne(() => Departamento, { nullable: false })
  @JoinColumn({ name: 'departamento_id', referencedColumnName: 'id' })
  departamento!: Relation<Departamento>;
}
