import { Entity, PrimaryColumn, Column } from 'typeorm';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * estado: CHECK(estado IN ('activo','inactivo'))
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'logistics', name: 'transportistas', synchronize: false })
export class Transportista {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'nombre', type: 'varchar', length: 150 })
  nombre!: string;

  @Column({
    name: 'telefono_contacto',
    type: 'varchar',
    length: 40,
    nullable: true,
  })
  telefonoContacto!: string | null;

  @Column({ name: 'plantilla_url_seguimiento', type: 'text', nullable: true })
  plantillaUrlSeguimiento!: string | null;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 20,
    default: () => "'activo'",
  })
  estado!: string;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;
}
