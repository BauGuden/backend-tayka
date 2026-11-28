import { Entity, PrimaryColumn, Column } from 'typeorm';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'geography', name: 'departamentos', synchronize: false })
export class Departamento {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'nombre', type: 'varchar', length: 100, unique: true })
  nombre!: string;

  @Column({
    name: 'abreviatura',
    type: 'varchar',
    length: 8,
    nullable: true,
    unique: true,
  })
  abreviatura!: string | null;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;
}
