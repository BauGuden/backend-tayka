import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Usuario } from '../../identity/entities/usuarios.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 */
@Entity({
  schema: 'support',
  name: 'preferencias_notificacion',
  synchronize: false,
})
export class PreferenciaNotificacion {
  @PrimaryColumn({ name: 'usuario_id', type: 'uuid' })
  usuarioId!: string;

  @PrimaryColumn({ name: 'tipo_notificacion', type: 'varchar', length: 70 })
  tipoNotificacion!: string;

  @Column({ name: 'permite_correo', type: 'boolean', default: () => 'true' })
  permiteCorreo!: boolean;

  @Column({ name: 'permite_push', type: 'boolean', default: () => 'true' })
  permitePush!: boolean;

  @Column({ name: 'permite_sms', type: 'boolean', default: () => 'false' })
  permiteSms!: boolean;

  @Column({
    name: 'actualizado_en',
    type: 'timestamptz',
    default: () => 'now()',
  })
  actualizadoEn!: Date;

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
  usuario!: Relation<Usuario>;
}
