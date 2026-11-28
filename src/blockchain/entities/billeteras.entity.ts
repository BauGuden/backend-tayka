import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Red } from './redes.entity';
import { Usuario } from '../../identity/entities/usuarios.entity';
import { Proveedor } from '../../catalog/entities/proveedores.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * UNIQUE(red_id, direccion_publica)
 * CHECK(num_nonnulls(usuario_id,proveedor_id) = 1)
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'blockchain', name: 'billeteras', synchronize: false })
export class Billetera {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'red_id', type: 'uuid' })
  redId!: string;

  @Column({ name: 'usuario_id', type: 'uuid', nullable: true })
  usuarioId!: string | null;

  @Column({ name: 'proveedor_id', type: 'uuid', nullable: true })
  proveedorId!: string | null;

  @Column({ name: 'direccion_publica', type: 'varchar', length: 100 })
  direccionPublica!: string;

  @Column({ name: 'verificado_en', type: 'timestamptz', nullable: true })
  verificadoEn!: Date | null;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @ManyToOne(() => Red, { nullable: false })
  @JoinColumn({ name: 'red_id', referencedColumnName: 'id' })
  red!: Relation<Red>;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
  usuario!: Relation<Usuario> | null;

  @ManyToOne(() => Proveedor, { nullable: true })
  @JoinColumn({ name: 'proveedor_id', referencedColumnName: 'id' })
  proveedor!: Relation<Proveedor> | null;
}
