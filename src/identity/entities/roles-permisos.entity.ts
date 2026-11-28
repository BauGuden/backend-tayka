import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Rol } from './roles.entity';
import { Permiso } from './permisos.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 */
@Entity({ schema: 'identity', name: 'roles_permisos', synchronize: false })
export class RolPermiso {
  @PrimaryColumn({ name: 'rol_id', type: 'uuid' })
  rolId!: string;

  @PrimaryColumn({ name: 'permiso_id', type: 'uuid' })
  permisoId!: string;

  @ManyToOne(() => Rol, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'rol_id', referencedColumnName: 'id' })
  rol!: Relation<Rol>;

  @ManyToOne(() => Permiso, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'permiso_id', referencedColumnName: 'id' })
  permiso!: Relation<Permiso>;
}
