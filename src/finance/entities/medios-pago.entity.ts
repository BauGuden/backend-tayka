import { Entity, PrimaryColumn, Column } from 'typeorm';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * tipo_medio: CHECK(tipo_medio IN ('transferencia_bancaria','qr','token_stellar','prueba_manual'))
 * ambiente: CHECK(ambiente IN ('prueba','produccion'))
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'finance', name: 'medios_pago', synchronize: false })
export class MedioPago {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'codigo', type: 'varchar', length: 50, unique: true })
  codigo!: string;

  @Column({ name: 'tipo_medio', type: 'varchar', length: 32 })
  tipoMedio!: string;

  @Column({
    name: 'nombre_proveedor_servicio',
    type: 'varchar',
    length: 120,
    nullable: true,
  })
  nombreProveedorServicio!: string | null;

  @Column({ name: 'codigo_moneda', type: 'varchar', length: 12 })
  codigoMoneda!: string;

  @Column({ name: 'esta_habilitado', type: 'boolean', default: () => 'false' })
  estaHabilitado!: boolean;

  @Column({
    name: 'ambiente',
    type: 'varchar',
    length: 12,
    default: () => "'prueba'",
  })
  ambiente!: string;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;
}
