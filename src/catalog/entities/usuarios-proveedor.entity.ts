import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Proveedor } from './proveedores.entity';
import { Usuario } from '../../identity/entities/usuarios.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * rol_integrante: CHECK (rol_integrante IN ('propietario','administrador','editor','lector'))
 */
@Entity({ schema: 'catalog', name: 'usuarios_proveedor', synchronize: false })
export class UsuarioProveedor {
  @PrimaryColumn({ name: 'proveedor_id', type: 'uuid' })
  proveedorId!: string;

  @PrimaryColumn({ name: 'usuario_id', type: 'uuid' })
  usuarioId!: string;

  @Column({ name: 'rol_integrante', type: 'varchar', length: 24 })
  rolIntegrante!: string;

  @Column({ name: 'esta_activo', type: 'boolean', default: () => 'true' })
  estaActivo!: boolean;

  @Column({ name: 'agregado_en', type: 'timestamptz', default: () => 'now()' })
  agregadoEn!: Date;

  @ManyToOne(() => Proveedor, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'proveedor_id', referencedColumnName: 'id' })
  proveedor!: Relation<Proveedor>;

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
  usuario!: Relation<Usuario>;
}
