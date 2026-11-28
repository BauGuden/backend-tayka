import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Usuario } from './usuarios.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'identity', name: 'sesiones', synchronize: false })
export class Sesion {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'usuario_id', type: 'uuid' })
  usuarioId!: string;

  @Column({ name: 'hash_token_renovacion', type: 'text', unique: true })
  hashTokenRenovacion!: string;

  @Column({ name: 'direccion_ip', type: 'inet', nullable: true })
  direccionIp!: string | null;

  @Column({ name: 'agente_usuario', type: 'text', nullable: true })
  agenteUsuario!: string | null;

  @Column({ name: 'vence_en', type: 'timestamptz' })
  venceEn!: Date;

  @Column({ name: 'revocado_en', type: 'timestamptz', nullable: true })
  revocadoEn!: Date | null;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @ManyToOne(() => Usuario, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
  usuario!: Relation<Usuario>;
}
