import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Oferta } from './ofertas.entity';
import { Ciudad } from '../../geography/entities/ciudades.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * UNIQUE(oferta_id,ciudad_id,modalidad_entrega)
 * modalidad_entrega: CHECK(modalidad_entrega IN ('retiro','envio'))
 * costo_envio_estimado: CHECK(costo_envio_estimado >= 0)
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'commerce', name: 'destinos_oferta', synchronize: false })
export class DestinoOferta {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'oferta_id', type: 'uuid' })
  ofertaId!: string;

  @Column({ name: 'ciudad_id', type: 'uuid' })
  ciudadId!: string;

  @Column({ name: 'modalidad_entrega', type: 'varchar', length: 18 })
  modalidadEntrega!: string;

  @Column({
    name: 'costo_envio_estimado',
    type: 'numeric',
    precision: 20,
    scale: 7,
    default: () => '0',
  })
  costoEnvioEstimado!: string;

  @Column({ name: 'esta_habilitado', type: 'boolean', default: () => 'true' })
  estaHabilitado!: boolean;

  @ManyToOne(() => Oferta, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'oferta_id', referencedColumnName: 'id' })
  oferta!: Relation<Oferta>;

  @ManyToOne(() => Ciudad, { nullable: false })
  @JoinColumn({ name: 'ciudad_id', referencedColumnName: 'id' })
  ciudad!: Relation<Ciudad>;
}
