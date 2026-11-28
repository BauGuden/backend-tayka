import { Entity, PrimaryColumn, Column } from 'typeorm';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'blockchain', name: 'redes', synchronize: false })
export class Red {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'nombre', type: 'varchar', length: 40, unique: true })
  nombre!: string;

  @Column({ name: 'frase_red', type: 'text' })
  fraseRed!: string;

  @Column({ name: 'url_rpc', type: 'text' })
  urlRpc!: string;

  @Column({ name: 'esta_habilitado', type: 'boolean', default: () => 'true' })
  estaHabilitado!: boolean;
}
