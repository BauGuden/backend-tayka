import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Usuario } from '../../identity/entities/usuarios.entity';
import { Producto } from '../../catalog/entities/productos.entity';
import { Oferta } from '../../commerce/entities/ofertas.entity';
import { GrupoCompra } from '../../commerce/entities/grupos-compra.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * CHECK(num_nonnulls(producto_id,oferta_id,grupo_id) = 1)
 * contenido: CHECK(length(trim(contenido)) BETWEEN 1 AND 5000)
 * estado: CHECK(estado IN ('visible','oculto','en_revision','eliminado'))
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'community', name: 'comentarios', synchronize: false })
export class Comentario {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'usuario_autor_id', type: 'uuid' })
  usuarioAutorId!: string;

  @Column({ name: 'producto_id', type: 'uuid', nullable: true })
  productoId!: string | null;

  @Column({ name: 'oferta_id', type: 'uuid', nullable: true })
  ofertaId!: string | null;

  @Column({ name: 'grupo_id', type: 'uuid', nullable: true })
  grupoId!: string | null;

  @Column({ name: 'comentario_padre_id', type: 'uuid', nullable: true })
  comentarioPadreId!: string | null;

  @Column({ name: 'contenido', type: 'text' })
  contenido!: string;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 22,
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

  @Column({ name: 'eliminado_en', type: 'timestamptz', nullable: true })
  eliminadoEn!: Date | null;

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'usuario_autor_id', referencedColumnName: 'id' })
  usuarioAutor!: Relation<Usuario>;

  @ManyToOne(() => Producto, { nullable: true })
  @JoinColumn({ name: 'producto_id', referencedColumnName: 'id' })
  producto!: Relation<Producto> | null;

  @ManyToOne(() => Oferta, { nullable: true })
  @JoinColumn({ name: 'oferta_id', referencedColumnName: 'id' })
  oferta!: Relation<Oferta> | null;

  @ManyToOne(() => GrupoCompra, { nullable: true })
  @JoinColumn({ name: 'grupo_id', referencedColumnName: 'id' })
  grupo!: Relation<GrupoCompra> | null;

  @ManyToOne(() => Comentario, { nullable: true })
  @JoinColumn({ name: 'comentario_padre_id', referencedColumnName: 'id' })
  comentarioPadre!: Relation<Comentario> | null;
}
