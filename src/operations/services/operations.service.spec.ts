import { EntityManager } from 'typeorm';
import { RegistroAuditoria } from '../entities';
import { OperationsService } from './operations.service';

describe('OperationsService', () => {
  const event = {
    usuarioActorId: 'actor',
    entidadId: 'resource',
    accion: 'actualizar',
    tipoEntidad: 'recurso',
  };

  it('uses the caller?s active transaction and writes only audit metadata', async () => {
    const execute = jest.fn().mockResolvedValue(undefined);
    const values = jest.fn().mockReturnValue({ execute });
    const into = jest.fn().mockReturnValue({ values });
    const manager = {
      queryRunner: { isTransactionActive: true },
      createQueryBuilder: () => ({ insert: () => ({ into }) }),
    } as unknown as EntityManager;
    const eventWithExtraData = {
      ...event,
      datosPosteriores: { hash: 'private' },
    };
    await new OperationsService().registrarAuditoria(
      manager,
      eventWithExtraData,
    );
    expect(into).toHaveBeenCalledWith(RegistroAuditoria);
    expect(values).toHaveBeenCalledWith(event);
    expect(execute).toHaveBeenCalledTimes(1);
  });

  it('rejects audit writes outside a transaction', async () => {
    const createQueryBuilder = jest.fn();
    const manager = {
      queryRunner: { isTransactionActive: false },
      createQueryBuilder,
    } as unknown as EntityManager;
    await expect(
      new OperationsService().registrarAuditoria(manager, event),
    ).rejects.toThrow('transacci?n activa');
    expect(createQueryBuilder).not.toHaveBeenCalled();
  });
});
