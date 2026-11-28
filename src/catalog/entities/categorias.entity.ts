import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'catalog', name: 'categorias', synchronize: false })
export class Categoria {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'padre_id', type: 'uuid', nullable: true })
  padreId!: string | null;

  @Column({ name: 'nombre', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({
    name: 'identificador_url',
    type: 'varchar',
    length: 140,
    unique: true,
  })
  identificadorUrl!: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion!: string | null;

  @Column({ name: 'esta_activo', type: 'boolean', default: () => 'true' })
  estaActivo!: boolean;

  @ManyToOne(() => Categoria, { nullable: true })
  @JoinColumn({ name: 'padre_id', referencedColumnName: 'id' })
  padre!: Relation<Categoria> | null;
}
