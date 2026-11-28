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
 * tipo_politica: CHECK (tipo_politica IN ('terminos','privacidad','mercadeo','tratamiento_datos'))
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'identity', name: 'consentimientos', synchronize: false })
export class Consentimiento {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'usuario_id', type: 'uuid' })
  usuarioId!: string;

  @Column({ name: 'tipo_politica', type: 'varchar', length: 40 })
  tipoPolitica!: string;

  @Column({ name: 'version_politica', type: 'varchar', length: 40 })
  versionPolitica!: string;

  @Column({ name: 'otorgado', type: 'boolean' })
  otorgado!: boolean;

  @Column({ name: 'direccion_ip', type: 'inet', nullable: true })
  direccionIp!: string | null;

  @Column({
    name: 'registrado_en',
    type: 'timestamptz',
    default: () => 'now()',
  })
  registradoEn!: Date;

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
  usuario!: Relation<Usuario>;
}
