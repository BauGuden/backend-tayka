import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Usuario } from '../../identity/entities/usuarios.entity';
import { ParticipanteGrupo } from '../../commerce/entities/participantes-grupo.entity';
import { Producto } from '../../catalog/entities/productos.entity';
import { Proveedor } from '../../catalog/entities/proveedores.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * CHECK(num_nonnulls(producto_id,proveedor_id) = 1)
 * calificacion: CHECK(calificacion BETWEEN 1 AND 5)
 * estado: CHECK(estado IN ('visible','oculto','eliminado'))
 * CREATE UNIQUE INDEX unica_resena_producto_participante ON community.resenas(participante_grupo_id,producto_id) WHERE producto_id IS NOT NULL;
 * CREATE UNIQUE INDEX unica_resena_proveedor_participante ON community.resenas(participante_grupo_id,proveedor_id) WHERE proveedor_id IS NOT NULL;
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'community', name: 'resenas', synchronize: false })
export class Resena {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'usuario_autor_id', type: 'uuid' })
  usuarioAutorId!: string;

  @Column({ name: 'participante_grupo_id', type: 'uuid' })
  participanteGrupoId!: string;

  @Column({ name: 'producto_id', type: 'uuid', nullable: true })
  productoId!: string | null;

  @Column({ name: 'proveedor_id', type: 'uuid', nullable: true })
  proveedorId!: string | null;

  @Column({ name: 'calificacion', type: 'smallint' })
  calificacion!: number;

  @Column({ name: 'titulo', type: 'varchar', length: 180, nullable: true })
  titulo!: string | null;

  @Column({ name: 'contenido', type: 'text', nullable: true })
  contenido!: string | null;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 20,
    default: () => "'visible'",
  })
  estado!: string;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @Column({
    name: 'actualizado_en',
    type: 'timestamptz',
    default: () => 'now()',
  })
  actualizadoEn!: Date;

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'usuario_autor_id', referencedColumnName: 'id' })
  usuarioAutor!: Relation<Usuario>;

  @ManyToOne(() => ParticipanteGrupo, { nullable: false })
  @JoinColumn({ name: 'participante_grupo_id', referencedColumnName: 'id' })
  participanteGrupo!: Relation<ParticipanteGrupo>;

  @ManyToOne(() => Producto, { nullable: true })
  @JoinColumn({ name: 'producto_id', referencedColumnName: 'id' })
  producto!: Relation<Producto> | null;

  @ManyToOne(() => Proveedor, { nullable: true })
  @JoinColumn({ name: 'proveedor_id', referencedColumnName: 'id' })
  proveedor!: Relation<Proveedor> | null;
}
