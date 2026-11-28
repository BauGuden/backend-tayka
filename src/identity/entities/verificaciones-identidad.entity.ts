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
 * estado: CHECK (estado IN ('pendiente','aprobado','rechazado','vencido'))
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({
  schema: 'identity',
  name: 'verificaciones_identidad',
  synchronize: false,
})
export class VerificacionIdentidad {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'usuario_id', type: 'uuid' })
  usuarioId!: string;

  @Column({ name: 'tipo_documento', type: 'varchar', length: 40 })
  tipoDocumento!: string;

  @Column({
    name: 'ultimos4_documento',
    type: 'varchar',
    length: 4,
    nullable: true,
  })
  ultimos4Documento!: string | null;

  @Column({ name: 'documento_cifrado', type: 'bytea', nullable: true })
  documentoCifrado!: Buffer | null;

  @Column({
    name: 'codigo_pais',
    type: 'char',
    length: 2,
    default: () => "'BO'",
  })
  codigoPais!: string;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 22,
    default: () => "'pendiente'",
  })
  estado!: string;

  @Column({ name: 'verificado_por', type: 'uuid', nullable: true })
  verificadoPor!: string | null;

  @Column({ name: 'verificado_en', type: 'timestamptz', nullable: true })
  verificadoEn!: Date | null;

  @Column({ name: 'vence_en', type: 'timestamptz', nullable: true })
  venceEn!: Date | null;

  @Column({ name: 'notas', type: 'text', nullable: true })
  notas!: string | null;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
  usuario!: Relation<Usuario>;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'verificado_por', referencedColumnName: 'id' })
  verificadoPorRelacion!: Relation<Usuario> | null;
}
