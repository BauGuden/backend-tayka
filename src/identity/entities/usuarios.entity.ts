import { Entity, PrimaryColumn, Column } from 'typeorm';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * estado: CHECK (estado IN ('pendiente','activo','suspendido','bloqueado'))
 * CREATE UNIQUE INDEX unico_usuario_correo_vigente ON identity.usuarios(lower(correo_electronico)) WHERE eliminado_en IS NULL;
 * CREATE UNIQUE INDEX unico_usuario_telefono_vigente ON identity.usuarios(telefono) WHERE telefono IS NOT NULL AND eliminado_en IS NULL;
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'identity', name: 'usuarios', synchronize: false })
export class Usuario {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'correo_electronico', type: 'varchar', length: 254 })
  correoElectronico!: string;

  @Column({ name: 'telefono', type: 'varchar', length: 30, nullable: true })
  telefono!: string | null;

  @Column({ name: 'hash_contrasena', type: 'text', nullable: true })
  hashContrasena!: string | null;

  @Column({ name: 'nombres', type: 'varchar', length: 100 })
  nombres!: string;

  @Column({ name: 'apellidos', type: 'varchar', length: 140 })
  apellidos!: string;

  @Column({ name: 'url_avatar', type: 'text', nullable: true })
  urlAvatar!: string | null;

  @Column({ name: 'fecha_nacimiento', type: 'date', nullable: true })
  fechaNacimiento!: string | null;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 24,
    default: () => "'pendiente'",
  })
  estado!: string;

  @Column({ name: 'correo_verificado_en', type: 'timestamptz', nullable: true })
  correoVerificadoEn!: Date | null;

  @Column({
    name: 'telefono_verificado_en',
    type: 'timestamptz',
    nullable: true,
  })
  telefonoVerificadoEn!: Date | null;

  @Column({ name: 'ultimo_acceso_en', type: 'timestamptz', nullable: true })
  ultimoAccesoEn!: Date | null;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @Column({
    name: 'actualizado_en',
    type: 'timestamptz',
    default: () => 'now()',
  })
  actualizadoEn!: Date;

  @Column({ name: 'eliminado_en', type: 'timestamptz', nullable: true })
  eliminadoEn!: Date | null;
}
