import { Entity, PrimaryColumn, Column } from 'typeorm';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'catalog', name: 'marcas', synchronize: false })
export class Marca {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'nombre', type: 'varchar', length: 120, unique: true })
  nombre!: string;

  @Column({ name: 'esta_activo', type: 'boolean', default: () => 'true' })
  estaActivo!: boolean;
}
