import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Red } from './redes.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * UNIQUE(red_id,nombre_flujo)
 * ultimo_libro_mayor: CHECK(ultimo_libro_mayor >= 0)
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({
  schema: 'blockchain',
  name: 'cursores_indexador',
  synchronize: false,
})
export class CursorIndexador {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'red_id', type: 'uuid' })
  redId!: string;

  @Column({ name: 'nombre_flujo', type: 'varchar', length: 70 })
  nombreFlujo!: string;

  @Column({ name: 'ultimo_libro_mayor', type: 'bigint', default: () => '0' })
  ultimoLibroMayor!: string;

  @Column({ name: 'valor_cursor', type: 'text', nullable: true })
  valorCursor!: string | null;

  @Column({
    name: 'actualizado_en',
    type: 'timestamptz',
    default: () => 'now()',
  })
  actualizadoEn!: Date;

  @ManyToOne(() => Red, { nullable: false })
  @JoinColumn({ name: 'red_id', referencedColumnName: 'id' })
  red!: Relation<Red>;
}
