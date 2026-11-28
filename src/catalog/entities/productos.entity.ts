import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Categoria } from './categorias.entity';
import { Marca } from './marcas.entity';
import { Usuario } from '../../identity/entities/usuarios.entity';

type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * estado: CHECK (estado IN ('borrador','activo','oculto','archivado'))
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'catalog', name: 'productos', synchronize: false })
export class Producto {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'categoria_id', type: 'uuid' })
  categoriaId!: string;

  @Column({ name: 'marca_id', type: 'uuid', nullable: true })
  marcaId!: string | null;

  @Column({ name: 'nombre', type: 'varchar', length: 220 })
  nombre!: string;

  @Column({
    name: 'identificador_url',
    type: 'varchar',
    length: 260,
    unique: true,
  })
  identificadorUrl!: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion!: string | null;

  @Column({
    name: 'especificaciones',
    type: 'jsonb',
    default: () => "'{}'::jsonb",
  })
  especificaciones!: JsonValue;

  @Column({ name: 'descripcion_garantia', type: 'text', nullable: true })
  descripcionGarantia!: string | null;

  @Column({ name: 'es_perecedero', type: 'boolean', default: () => 'false' })
  esPerecedero!: boolean;

  @Column({ name: 'es_regulado', type: 'boolean', default: () => 'false' })
  esRegulado!: boolean;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 20,
    default: () => "'borrador'",
  })
  estado!: string;

  @Column({ name: 'creado_por', type: 'uuid', nullable: true })
  creadoPor!: string | null;

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

  @ManyToOne(() => Categoria, { nullable: false })
  @JoinColumn({ name: 'categoria_id', referencedColumnName: 'id' })
  categoria!: Relation<Categoria>;

  @ManyToOne(() => Marca, { nullable: true })
  @JoinColumn({ name: 'marca_id', referencedColumnName: 'id' })
  marca!: Relation<Marca> | null;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'creado_por', referencedColumnName: 'id' })
  creadoPorRelacion!: Relation<Usuario> | null;
}
