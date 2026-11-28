import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Usuario } from './usuarios.entity';
import { Rol } from './roles.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 */
@Entity({ schema: 'identity', name: 'usuarios_roles', synchronize: false })
export class UsuarioRol {
  @PrimaryColumn({ name: 'usuario_id', type: 'uuid' })
  usuarioId!: string;

  @PrimaryColumn({ name: 'rol_id', type: 'uuid' })
  rolId!: string;

  @Column({ name: 'asignado_por', type: 'uuid', nullable: true })
  asignadoPor!: string | null;

  @Column({ name: 'asignado_en', type: 'timestamptz', default: () => 'now()' })
  asignadoEn!: Date;

  @Column({ name: 'revocado_en', type: 'timestamptz', nullable: true })
  revocadoEn!: Date | null;

  @ManyToOne(() => Usuario, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
  usuario!: Relation<Usuario>;

  @ManyToOne(() => Rol, { nullable: false })
  @JoinColumn({ name: 'rol_id', referencedColumnName: 'id' })
  rol!: Relation<Rol>;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'asignado_por', referencedColumnName: 'id' })
  asignadoPorRelacion!: Relation<Usuario> | null;
}
