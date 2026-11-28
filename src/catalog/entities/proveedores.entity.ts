import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Ciudad } from '../../geography/entities/ciudades.entity';
import { Usuario } from '../../identity/entities/usuarios.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * estado: CHECK (estado IN ('pendiente','verificado','suspendido','rechazado'))
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'catalog', name: 'proveedores', synchronize: false })
export class Proveedor {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'razon_social', type: 'varchar', length: 220 })
  razonSocial!: string;

  @Column({
    name: 'nombre_comercial',
    type: 'varchar',
    length: 220,
    nullable: true,
  })
  nombreComercial!: string | null;

  @Column({ name: 'nit_cifrado', type: 'bytea', nullable: true })
  nitCifrado!: Buffer | null;

  @Column({ name: 'ultimos4_nit', type: 'varchar', length: 4, nullable: true })
  ultimos4Nit!: string | null;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion!: string | null;

  @Column({
    name: 'correo_contacto',
    type: 'varchar',
    length: 254,
    nullable: true,
  })
  correoContacto!: string | null;

  @Column({
    name: 'telefono_contacto',
    type: 'varchar',
    length: 40,
    nullable: true,
  })
  telefonoContacto!: string | null;

  @Column({ name: 'url_sitio', type: 'text', nullable: true })
  urlSitio!: string | null;

  @Column({ name: 'ciudad_id', type: 'uuid', nullable: true })
  ciudadId!: string | null;

  @Column({ name: 'direccion', type: 'text', nullable: true })
  direccion!: string | null;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 24,
    default: () => "'pendiente'",
  })
  estado!: string;

  @Column({ name: 'verificado_por', type: 'uuid', nullable: true })
  verificadoPor!: string | null;

  @Column({ name: 'verificado_en', type: 'timestamptz', nullable: true })
  verificadoEn!: Date | null;

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

  @ManyToOne(() => Ciudad, { nullable: true })
  @JoinColumn({ name: 'ciudad_id', referencedColumnName: 'id' })
  ciudad!: Relation<Ciudad> | null;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'verificado_por', referencedColumnName: 'id' })
  verificadoPorRelacion!: Relation<Usuario> | null;
}
