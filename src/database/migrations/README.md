# Migraciones TypeORM de TAYKA

## Inventario y orden

| Archivo | Responsabilidad |
|---|---|
| `1795836889405-CreateTaykaSchemas.ts` | Crea los 10 esquemas. Su reversión conserva los esquemas. |
| `1795837747558-CreateIndependentTaykaTables.ts` | Crea las primeras 16 tablas con 7 claves foráneas. Se conserva como estaba. |
| `1795838346286-CreateRemainingTaykaTables.ts` | Crea las 48 tablas restantes dentro de una transacción. Primero crea tablas con PK, UNIQUE y CHECK, luego 119 FK y finalmente cinco índices únicos parciales sobre columnas. Prepara `public.typeorm_metadata` solo si hace falta para las dos columnas STORED. Su reversión se detiene antes de borrar datos. |
| `tayka-baseline.ts` | Inventario declarativo de 64 tablas, 573 columnas, seis PK compuestas, 126 FK, 36 UNIQUE, 99 CHECK, cinco índices parciales representables y dos columnas STORED. Conserva `commerce.reservas_inventario` en el esquema de su entidad. |
| `inspect-tayka.ts` | Inspección de solo lectura de esquemas, tablas, historial y diferencias. |
| `tayka-table-comparison.ts`, `tayka-expression-comparison.ts`, `tayka-known-schemas.ts` | Comparación estructural y detección de tablas potencialmente heredadas en esquemas conocidos. |
| `independent-tayka-tables.spec.ts`, `remaining-tayka-tables.spec.ts` | Cobertura de metadatos, generación en memoria, detección de diferencias y protección de tablas existentes. |

## Restricción pendiente

El índice único parcial `identity.usuarios.unico_usuario_correo_vigente` usa la clave de expresión `lower(correo_electronico)` y el predicado `eliminado_en IS NULL`. TypeORM 0.3.31 acepta el predicado en `TableIndex`, pero solo admite nombres de columnas como claves. La migración crea `identity.usuarios` con sus demás restricciones, incluido el índice parcial de teléfono. **La unicidad del correo vigente sin distinguir mayúsculas queda pendiente.** No habilitar altas ni cambios de correo en un entorno que dependa de esa garantía hasta disponer del índice exacto.

## Base existente

La tercera migración exige los esquemas y las 16 tablas de las dos migraciones anteriores. Confronta las tablas existentes con las definiciones, detecta copias en esquemas heredados conocidos y se detiene antes de escribir si encuentra diferencias. Usa la información expuesta por TypeORM. El driver reconoce los defaults de UUID como generadores, pero no distingue entre sus distintas funciones. Las expresiones de catálogo fuera de las formas reconocidas requieren revisión manual. La inspección no certifica el índice de expresión pendiente.

## Comprobación y aplicación

```powershell
pnpm exec ts-node src/database/migrations/inspect-tayka.ts
pnpm build
pnpm test --runInBand
```

El destino configurado tenía 10 esquemas y 16 tablas durante la inspección de solo lectura. Se verificó que la tercera migración prepara las 48 restantes con el generador DDL de TypeORM en memoria. La verificación no aplicó la migración.

Después de revisar y autorizar el destino, aplica las migraciones manualmente:

```powershell
pnpm migration:run
```

El ejecutable compilado admite `pnpm exec typeorm migration:run -d dist/database/data-source.js`. El historial se guarda en `public.migrations`. `pnpm migration:revert` invoca la reversión de la última migración aplicada. Las dos migraciones de tablas rechazan el borrado automático. El `DataSource` desactiva la sincronización, las migraciones automáticas, el borrado del esquema y la instalación automática de extensiones.

## Matriz de las 64 tablas

| Tabla | Columnas | FK | Migración |
|---|---:|---:|---|
| `blockchain.activos` | 8 | 1 | 1795837747558 |
| `blockchain.billeteras` | 7 | 3 | 1795838346286 |
| `blockchain.cursores_indexador` | 6 | 1 | 1795837747558 |
| `blockchain.despliegues_contrato` | 8 | 1 | 1795837747558 |
| `blockchain.eventos_contrato` | 9 | 2 | 1795838346286 |
| `blockchain.operaciones_contrato` | 17 | 8 | 1795838346286 |
| `blockchain.redes` | 5 | 0 | 1795837747558 |
| `blockchain.transacciones` | 10 | 2 | 1795838346286 |
| `catalog.almacenes` | 7 | 2 | 1795838346286 |
| `catalog.archivos_producto` | 8 | 2 | 1795838346286 |
| `catalog.categorias` | 6 | 1 | 1795837747558 |
| `catalog.existencias` | 6 | 2 | 1795838346286 |
| `catalog.marcas` | 3 | 0 | 1795837747558 |
| `catalog.movimientos_inventario` | 8 | 2 | 1795838346286 |
| `catalog.productos` | 15 | 3 | 1795838346286 |
| `catalog.proveedores` | 17 | 2 | 1795838346286 |
| `catalog.usuarios_proveedor` | 5 | 2 | 1795838346286 |
| `catalog.variantes_producto` | 12 | 1 | 1795838346286 |
| `commerce.asignaciones_orden` | 6 | 2 | 1795838346286 |
| `commerce.destinos_oferta` | 6 | 2 | 1795838346286 |
| `commerce.detalles_orden_compra` | 6 | 2 | 1795838346286 |
| `commerce.eventos_grupo` | 8 | 2 | 1795838346286 |
| `commerce.grupos_compra` | 18 | 3 | 1795838346286 |
| `commerce.lista_espera` | 8 | 2 | 1795838346286 |
| `commerce.ofertas` | 20 | 4 | 1795838346286 |
| `commerce.ordenes_compra` | 14 | 3 | 1795838346286 |
| `commerce.participantes_grupo` | 15 | 4 | 1795838346286 |
| `commerce.reservas_inventario` | 8 | 3 | 1795838346286 |
| `commerce.versiones_oferta` | 7 | 2 | 1795838346286 |
| `community.comentarios` | 11 | 5 | 1795838346286 |
| `community.favoritos` | 3 | 2 | 1795838346286 |
| `community.reacciones` | 4 | 2 | 1795838346286 |
| `community.reportes` | 10 | 4 | 1795838346286 |
| `community.resenas` | 11 | 4 | 1795838346286 |
| `finance.conciliaciones` | 9 | 2 | 1795838346286 |
| `finance.liquidaciones_proveedor` | 9 | 3 | 1795838346286 |
| `finance.medios_pago` | 8 | 0 | 1795837747558 |
| `finance.obligaciones_pago` | 11 | 2 | 1795838346286 |
| `finance.reembolsos` | 11 | 3 | 1795838346286 |
| `finance.transferencias` | 20 | 5 | 1795838346286 |
| `geography.ciudades` | 5 | 1 | 1795837747558 |
| `geography.departamentos` | 4 | 0 | 1795837747558 |
| `identity.consentimientos` | 7 | 1 | 1795838346286 |
| `identity.direcciones` | 12 | 2 | 1795838346286 |
| `identity.permisos` | 3 | 0 | 1795837747558 |
| `identity.roles` | 5 | 0 | 1795837747558 |
| `identity.roles_permisos` | 2 | 2 | 1795837747558 |
| `identity.sesiones` | 8 | 1 | 1795838346286 |
| `identity.usuarios` | 15 | 0 | 1795838346286 |
| `identity.usuarios_roles` | 5 | 3 | 1795838346286 |
| `identity.verificaciones_identidad` | 12 | 2 | 1795838346286 |
| `logistics.codigos_retiro` | 7 | 2 | 1795838346286 |
| `logistics.entregas` | 14 | 3 | 1795838346286 |
| `logistics.eventos_entrega` | 7 | 2 | 1795838346286 |
| `logistics.puntos_retiro` | 10 | 2 | 1795838346286 |
| `logistics.transportistas` | 6 | 0 | 1795837747558 |
| `operations.claves_idempotencia` | 8 | 0 | 1795837747558 |
| `operations.eventos_salida` | 10 | 0 | 1795837747558 |
| `operations.registros_auditoria` | 10 | 1 | 1795838346286 |
| `operations.webhooks_entrantes` | 8 | 0 | 1795837747558 |
| `support.casos_soporte` | 12 | 4 | 1795838346286 |
| `support.mensajes_soporte` | 7 | 2 | 1795838346286 |
| `support.notificaciones` | 10 | 1 | 1795838346286 |
| `support.preferencias_notificacion` | 6 | 1 | 1795838346286 |
