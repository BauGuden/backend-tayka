import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Oferta } from './ofertas.entity';
import { Usuario } from '../../identity/entities/usuarios.entity';

type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * UNIQUE(oferta_id,numero_version)
 * numero_version: CHECK(numero_version > 0)
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'commerce', name: 'versiones_oferta', synchronize: false })
export class VersionOferta {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'oferta_id', type: 'uuid' })
  ofertaId!: string;

  @Column({ name: 'numero_version', type: 'integer' })
  numeroVersion!: number;

  @Column({ name: 'condiciones_fijadas', type: 'jsonb' })
  condicionesFijadas!: JsonValue;

  @Column({
    name: 'hash_condiciones',
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  hashCondiciones!: string | null;

  @Column({ name: 'creado_por', type: 'uuid', nullable: true })
  creadoPor!: string | null;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @ManyToOne(() => Oferta, { nullable: false })
  @JoinColumn({ name: 'oferta_id', referencedColumnName: 'id' })
  oferta!: Relation<Oferta>;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'creado_por', referencedColumnName: 'id' })
  creadoPorRelacion!: Relation<Usuario> | null;
}
