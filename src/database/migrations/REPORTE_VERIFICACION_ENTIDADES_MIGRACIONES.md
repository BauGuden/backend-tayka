# Verificación de entidades y migraciones de TAYKA

Auditado el 28 de noviembre de 2026 en America/La_Paz.

## A. Resumen general

**NO APTO para certificar la equivalencia completa.** Se verificó la estructura de la base configurada por introspección de solo lectura. No se ejecutaron migraciones en esa base.

| Indicador | Plan | Verificación física |
|---|---:|---:|
| Esquemas | 10 | 10 |
| Entidades / tablas | 64 | 64 |
| Columnas físicas | 573 | 573 |
| PK simples / compuestas | 58 / 6 | 58 / 6 |
| FK total | 126 | 126 |
| FK entre esquemas | 64 | 64 |
| Cardinalidad de navegación | 5 uno a uno y 121 muchos a uno | Cotejo de FK y UNIQUE por relación |
| UNIQUE | 36 | 36 |
| CHECK | 99 | 99 |
| Índices parciales representables | 5 | 5 |
| Índices con PK y UNIQUE incluidos | 105 | 105 |
| Columnas STORED | 2 | 2 |
| Migraciones | 3 registradas | 3 aplicadas y 0 pendientes |

63/64 tablas coinciden con el contrato comprobado. El índice de expresión del correo impide cerrar la verificación de `identity.usuarios`.

La inspección usó los metadatos del DataSource, las llamadas API capturadas de cada método up con memoria SQL de TypeORM y una transacción REPEATABLE READ finalizada con rollback. Las lecturas de catálogo usaron QueryRunner y repositorios EntitySchema sobre information_schema.columns, information_schema.key_column_usage y pg_catalog.pg_indexes. Se escribieron cero consultas SQL manuales.

Las restricciones declaradas por decoradores se cotejaron con los metadatos de las entidades. Los CHECK, UNIQUE compuestos e índices que el código documenta en comentarios se cotejaron con esos comentarios, las llamadas de creación de TypeORM y el catálogo físico.

| Migración en orden | Esquemas | Objetos Table | FK | Índices adicionales | Registros internos | Aplicada |
|---|---:|---:|---:|---:|---:|---|
| `CreateTaykaSchemas1795836889405` | 10 | 0 | 0 | 0 | 0 | Sí |
| `CreateIndependentTaykaTables1795837747558` | 0 | 16 | 7 | 0 | 0 | Sí |
| `CreateRemainingTaykaTables1795838346286` | 0 | 49 | 119 | 5 | 2 | Sí |

El tercer paso incluye el objeto interno public.typeorm_metadata si no existe, además de las 48 tablas y las dos expresiones STORED. Tablas de dominio detectadas en esquemas heredados inspeccionados: 0.

| Esquema | Clases | Columnas | FK |
|---|---:|---:|---:|
| blockchain | 8 | 70 | 18 |
| catalog | 10 | 87 | 17 |
| commerce | 11 | 116 | 29 |
| community | 5 | 39 | 17 |
| finance | 6 | 68 | 15 |
| geography | 2 | 9 | 1 |
| identity | 9 | 69 | 11 |
| logistics | 5 | 44 | 9 |
| operations | 4 | 36 | 1 |
| support | 4 | 35 | 8 |

## B. Matriz de las 64 tablas

| Tabla | Clase TypeScript | Migración | Columnas | PK | FK | UNIQUE / CHECK / índices parciales | Resultado |
|---|---|---|---:|---|---:|---|---|
| `blockchain.activos` | `Activo` | 1795837747558 | 8 | `id` | 1 | 0 / 1 / 0 | Coincide |
| `blockchain.billeteras` | `Billetera` | 1795838346286 | 7 | `id` | 3 | 1 / 1 / 0 | Coincide |
| `blockchain.cursores_indexador` | `CursorIndexador` | 1795837747558 | 6 | `id` | 1 | 1 / 1 / 0 | Coincide |
| `blockchain.despliegues_contrato` | `DespliegueContrato` | 1795837747558 | 8 | `id` | 1 | 1 / 0 / 0 | Coincide |
| `blockchain.eventos_contrato` | `EventoContrato` | 1795838346286 | 9 | `id` | 2 | 1 / 1 / 0 | Coincide |
| `blockchain.operaciones_contrato` | `OperacionContrato` | 1795838346286 | 17 | `id` | 8 | 1 / 2 / 0 | Coincide |
| `blockchain.redes` | `Red` | 1795837747558 | 5 | `id` | 0 | 1 / 0 / 0 | Coincide |
| `blockchain.transacciones` | `Transaccion` | 1795838346286 | 10 | `id` | 2 | 1 / 2 / 0 | Coincide |
| `catalog.almacenes` | `Almacen` | 1795838346286 | 7 | `id` | 2 | 0 / 0 / 0 | Coincide |
| `catalog.archivos_producto` | `ArchivoProducto` | 1795838346286 | 8 | `id` | 2 | 0 / 1 / 0 | Coincide |
| `catalog.categorias` | `Categoria` | 1795837747558 | 6 | `id` | 1 | 1 / 0 / 0 | Coincide |
| `catalog.existencias` | `Existencia` | 1795838346286 | 6 | `id` | 2 | 1 / 3 / 0 | Coincide |
| `catalog.marcas` | `Marca` | 1795837747558 | 3 | `id` | 0 | 1 / 0 / 0 | Coincide |
| `catalog.movimientos_inventario` | `MovimientoInventario` | 1795838346286 | 8 | `id` | 2 | 0 / 2 / 0 | Coincide |
| `catalog.productos` | `Producto` | 1795838346286 | 15 | `id` | 3 | 1 / 1 / 0 | Coincide |
| `catalog.proveedores` | `Proveedor` | 1795838346286 | 17 | `id` | 2 | 0 / 1 / 0 | Coincide |
| `catalog.usuarios_proveedor` | `UsuarioProveedor` | 1795838346286 | 5 | `proveedor_id`, `usuario_id` | 2 | 0 / 1 / 0 | Coincide |
| `catalog.variantes_producto` | `VarianteProducto` | 1795838346286 | 12 | `id` | 1 | 1 / 3 / 0 | Coincide |
| `commerce.asignaciones_orden` | `AsignacionOrden` | 1795838346286 | 6 | `id` | 2 | 1 / 2 / 0 | Coincide |
| `commerce.destinos_oferta` | `DestinoOferta` | 1795838346286 | 6 | `id` | 2 | 1 / 2 / 0 | Coincide |
| `commerce.detalles_orden_compra` | `DetalleOrdenCompra` | 1795838346286 | 6 | `id` | 2 | 1 / 2 / 0 | Coincide |
| `commerce.eventos_grupo` | `EventoGrupo` | 1795838346286 | 8 | `id` | 2 | 0 / 0 / 0 | Coincide |
| `commerce.grupos_compra` | `GrupoCompra` | 1795838346286 | 18 | `id` | 3 | 1 / 7 / 0 | Coincide |
| `commerce.lista_espera` | `ListaEspera` | 1795838346286 | 8 | `id` | 2 | 1 / 2 / 0 | Coincide |
| `commerce.ofertas` | `Oferta` | 1795838346286 | 20 | `id` | 4 | 0 / 8 / 0 | Coincide |
| `commerce.ordenes_compra` | `OrdenCompra` | 1795838346286 | 14 | `id` | 3 | 2 / 3 / 0 | Coincide |
| `commerce.participantes_grupo` | `ParticipanteGrupo` | 1795838346286 | 15 | `id` | 4 | 1 / 7 / 0 | Coincide |
| `commerce.reservas_inventario` | `ReservaInventario` | 1795838346286 | 8 | `id` | 3 | 1 / 2 / 0 | Coincide |
| `commerce.versiones_oferta` | `VersionOferta` | 1795838346286 | 7 | `id` | 2 | 1 / 1 / 0 | Coincide |
| `community.comentarios` | `Comentario` | 1795838346286 | 11 | `id` | 5 | 0 / 3 / 0 | Coincide |
| `community.favoritos` | `Favorito` | 1795838346286 | 3 | `usuario_id`, `producto_id` | 2 | 0 / 0 / 0 | Coincide |
| `community.reacciones` | `Reaccion` | 1795838346286 | 4 | `usuario_id`, `comentario_id` | 2 | 0 / 1 / 0 | Coincide |
| `community.reportes` | `Reporte` | 1795838346286 | 10 | `id` | 4 | 0 / 2 / 0 | Coincide |
| `community.resenas` | `Resena` | 1795838346286 | 11 | `id` | 4 | 0 / 3 / 2 | Coincide |
| `finance.conciliaciones` | `Conciliacion` | 1795838346286 | 9 | `id` | 2 | 0 / 2 / 0 | Coincide |
| `finance.liquidaciones_proveedor` | `LiquidacionProveedor` | 1795838346286 | 9 | `id` | 3 | 0 / 2 / 0 | Coincide |
| `finance.medios_pago` | `MedioPago` | 1795837747558 | 8 | `id` | 0 | 1 / 2 / 0 | Coincide |
| `finance.obligaciones_pago` | `ObligacionPago` | 1795838346286 | 11 | `id` | 2 | 1 / 4 / 0 | Coincide |
| `finance.reembolsos` | `Reembolso` | 1795838346286 | 11 | `id` | 3 | 0 / 2 / 0 | Coincide |
| `finance.transferencias` | `Transferencia` | 1795838346286 | 20 | `id` | 5 | 1 / 4 / 1 | Coincide |
| `geography.ciudades` | `Ciudad` | 1795837747558 | 5 | `id` | 1 | 1 / 0 / 0 | Coincide |
| `geography.departamentos` | `Departamento` | 1795837747558 | 4 | `id` | 0 | 2 / 0 / 0 | Coincide |
| `identity.consentimientos` | `Consentimiento` | 1795838346286 | 7 | `id` | 1 | 0 / 1 / 0 | Coincide |
| `identity.direcciones` | `Direccion` | 1795838346286 | 12 | `id` | 2 | 0 / 2 / 1 | Coincide |
| `identity.permisos` | `Permiso` | 1795837747558 | 3 | `id` | 0 | 1 / 0 / 0 | Coincide |
| `identity.roles` | `Rol` | 1795837747558 | 5 | `id` | 0 | 1 / 0 / 0 | Coincide |
| `identity.roles_permisos` | `RolPermiso` | 1795837747558 | 2 | `rol_id`, `permiso_id` | 2 | 0 / 0 / 0 | Coincide |
| `identity.sesiones` | `Sesion` | 1795838346286 | 8 | `id` | 1 | 1 / 0 / 0 | Coincide |
| `identity.usuarios` | `Usuario` | 1795838346286 | 15 | `id` | 0 | 0 / 1 / 1 | Índice de correo ausente |
| `identity.usuarios_roles` | `UsuarioRol` | 1795838346286 | 5 | `usuario_id`, `rol_id` | 3 | 0 / 0 / 0 | Coincide |
| `identity.verificaciones_identidad` | `VerificacionIdentidad` | 1795838346286 | 12 | `id` | 2 | 0 / 1 / 0 | Coincide |
| `logistics.codigos_retiro` | `CodigoRetiro` | 1795838346286 | 7 | `id` | 2 | 2 / 0 / 0 | Coincide |
| `logistics.entregas` | `Entrega` | 1795838346286 | 14 | `id` | 3 | 1 / 4 / 0 | Coincide |
| `logistics.eventos_entrega` | `EventoEntrega` | 1795838346286 | 7 | `id` | 2 | 0 / 0 / 0 | Coincide |
| `logistics.puntos_retiro` | `PuntoRetiro` | 1795838346286 | 10 | `id` | 2 | 0 / 0 / 0 | Coincide |
| `logistics.transportistas` | `Transportista` | 1795837747558 | 6 | `id` | 0 | 0 / 1 / 0 | Coincide |
| `operations.claves_idempotencia` | `ClaveIdempotencia` | 1795837747558 | 8 | `id` | 0 | 1 / 0 / 0 | Coincide |
| `operations.eventos_salida` | `EventoSalida` | 1795837747558 | 10 | `id` | 0 | 0 / 2 / 0 | Coincide |
| `operations.registros_auditoria` | `RegistroAuditoria` | 1795838346286 | 10 | `id` | 1 | 0 / 0 / 0 | Coincide |
| `operations.webhooks_entrantes` | `WebhookEntrante` | 1795837747558 | 8 | `id` | 0 | 1 / 1 / 0 | Coincide |
| `support.casos_soporte` | `CasoSoporte` | 1795838346286 | 12 | `id` | 4 | 0 / 2 / 0 | Coincide |
| `support.mensajes_soporte` | `MensajeSoporte` | 1795838346286 | 7 | `id` | 2 | 0 / 1 / 0 | Coincide |
| `support.notificaciones` | `Notificacion` | 1795838346286 | 10 | `id` | 1 | 0 / 2 / 0 | Coincide |
| `support.preferencias_notificacion` | `PreferenciaNotificacion` | 1795838346286 | 6 | `usuario_id`, `tipo_notificacion` | 1 | 0 / 0 / 0 | Coincide |

### PK compuestas y UNIQUE compuestas relevantes

| Tabla | PK | UNIQUE |
|---|---|---|
| `identity.roles_permisos` | `rol_id`, `permiso_id` | — |
| `identity.usuarios_roles` | `usuario_id`, `rol_id` | — |
| `catalog.usuarios_proveedor` | `proveedor_id`, `usuario_id` | — |
| `community.reacciones` | `usuario_id`, `comentario_id` | — |
| `community.favoritos` | `usuario_id`, `producto_id` | — |
| `support.preferencias_notificacion` | `usuario_id`, `tipo_notificacion` | — |
| `commerce.participantes_grupo` | `id` | `grupo_id`, `usuario_id` |
| `commerce.lista_espera` | `id` | `grupo_id`, `usuario_id` |
| `commerce.destinos_oferta` | `id` | `oferta_id`, `ciudad_id`, `modalidad_entrega` |
| `catalog.existencias` | `id` | `almacen_id`, `variante_id` |
| `commerce.detalles_orden_compra` | `id` | `orden_compra_id`, `variante_id` |
| `commerce.reservas_inventario` | `id` | `orden_compra_id`, `existencia_id` |

Se confirmó la ubicación `commerce.reservas_inventario`, con PK id y FK hacia catalog.existencias, commerce.grupos_compra y commerce.ordenes_compra.

## C. Diferencias encontradas

| Ubicación | Gravedad | Evidencia y acción |
|---|---|---|
| `src/identity/entities/usuarios.entity.ts` y `1795838346286-CreateRemainingTaykaTables.ts` | Alta | El índice `unico_usuario_correo_vigente` está documentado en la entidad y ausente en la migración y en pg_indexes. La condición esperada es `lower(correo_electronico)` con `eliminado_en IS NULL`. TableIndex no admite claves por expresión. La corrección exacta requiere un mecanismo autorizado compatible con la restricción de SQL manual o un cambio aprobado del contrato. |
| `inspect-tayka.ts` y `identity.direcciones` | Baja, presentación | El inspector emitió 4 avisos por los dos CHECK. PostgreSQL decompila los negativos como literales de texto convertidos a integer y luego a numeric. Cotejados los valores -90/90 y -180/180, comparadores y nulabilidad, las restricciones físicas son equivalentes. No requieren una migración correctiva. |
| `identity.verificaciones_identidad.codigo_pais` | Informativa, presentación | PostgreSQL devuelve el DEFAULT como `'BO'::bpchar`. El tipo físico `character(2)` corresponde a `char(2)` y el valor predeterminado es el mismo. |

Índices que sí aparecen para usuarios.
- `pk_usuarios` · `CREATE UNIQUE INDEX pk_usuarios ON identity.usuarios USING btree (id)`
- `unico_usuario_telefono_vigente` · `CREATE UNIQUE INDEX unico_usuario_telefono_vigente ON identity.usuarios USING btree (telefono) WHERE ((telefono IS NOT NULL) AND (eliminado_en IS NULL))`

No se preparó una migración correctiva. El índice requiere una capacidad que la API declarativa de TypeORM no ofrece y el alcance prohíbe SQL manual.

## D. Pruebas ejecutadas

| Verificación | Resultado |
|---|---|
| `pnpm build` | Compilación correcta. |
| `pnpm test --runInBand` | Correcto. Dos pruebas de una suite disponible. |
| `pnpm test:e2e --runInBand` | Falló antes de cargar pruebas. Jest no encontró `test/jest-e2e.json`. No hubo resultados E2E. |
| `pnpm exec ts-node src/database/migrations/inspect-tayka.ts` | Correcto. 10 esquemas, 64 tablas y cero migraciones pendientes. El comparador devolvió cuatro avisos para los dos CHECK de coordenadas. |
| Auditoría TypeORM ejecutada mediante `pnpm exec node` y entrada estándar | Cargó las 64 entidades, simuló los tres up y cotejó 573 columnas, FK, defaults físicos, orden de PK y catálogo de índices. |
| `git diff --check` y búsqueda de llamadas SQL manuales | Sin errores de espacios ni llamadas SQL manuales en las migraciones revisadas. |
| Migraciones desde cero y segunda ejecución en PostgreSQL aislado | No ejecutadas. No se identificó un destino aislado autorizado. Se verificó el historial de la base configurada sin modificarla. |

## E. Conclusión

**NO APTO para certificar el contrato completo.** La estructura física existe y las tres migraciones figuran aplicadas. Falta el índice único por expresión del correo. Queda pendiente reproducir ambas ejecuciones en una base aislada autorizada.

## Anexo. Comparación atributo por atributo

Se muestran propiedad, nombre físico, tipo, longitud o precisión y escala, nulabilidad, PK y valores por defecto. Los DEFAULT físicos proceden de information_schema.columns. También se cotejan directamente las expresiones STORED y los nombres de las FK.

### blockchain.activos · Activo

Entidad `src/blockchain/entities/activos.entity.ts`. Migración `CreateIndependentTaykaTables1795837747558`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `redId` → `red_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `codigoActivo` → `codigo_activo` | `varchar(24)` · NOT NULL | `varchar(24)` · NOT NULL | `character varying(24)` · NOT NULL | — / — / — | Coincide |
| `direccionEmisor` → `direccion_emisor` | `varchar(100)` · NULL | `varchar(100)` · NULL | `character varying(100)` · NULL | — / — / — | Coincide |
| `direccionContrato` → `direccion_contrato` | `varchar(100)` · NULL | `varchar(100)` · NULL | `character varying(100)` · NULL | — / — / — | Coincide |
| `decimales` → `decimales` | `smallint` · NOT NULL | `smallint` · NOT NULL | `smallint` · NOT NULL | `7` / `7` / `7` | Coincide |
| `estaHabilitado` → `esta_habilitado` | `boolean` · NOT NULL | `boolean` · NOT NULL | `boolean` · NOT NULL | `false` / `false` / `false` | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `red` · N:1 | `red_id` | `blockchain.redes` (`id`) | `NO ACTION` / `NO ACTION` | `FK_7de786a945c4de517a770bc8b24` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- CHECK `CHK_5e2a73352fec6b45000ef9ef85` · `decimales BETWEEN 0 AND 18`

### blockchain.billeteras · Billetera

Entidad `src/blockchain/entities/billeteras.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `redId` → `red_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `usuarioId` → `usuario_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `proveedorId` → `proveedor_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `direccionPublica` → `direccion_publica` | `varchar(100)` · NOT NULL | `varchar(100)` · NOT NULL | `character varying(100)` · NOT NULL | — / — / — | Coincide |
| `verificadoEn` → `verificado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `red` · N:1 | `red_id` | `blockchain.redes` (`id`) | `NO ACTION` / `NO ACTION` | `FK_c35a54a9c1f6c93c0b9479c91ca` · Coincide |
| `usuario` · N:1 | `usuario_id` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_e22d3cd530a60745d47c20ee614` · Coincide |
| `proveedor` · N:1 | `proveedor_id` | `catalog.proveedores` (`id`) | `NO ACTION` / `NO ACTION` | `FK_40491ae5a66b799b78de47cfd7e` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_f37f16fa06a63a13cb76a747692` · `red_id`, `direccion_publica`
- CHECK `CHK_107e5122cd9436801e7bd48a55` · `num_nonnulls(usuario_id,proveedor_id) = 1`

### blockchain.cursores_indexador · CursorIndexador

Entidad `src/blockchain/entities/cursores-indexador.entity.ts`. Migración `CreateIndependentTaykaTables1795837747558`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `redId` → `red_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `nombreFlujo` → `nombre_flujo` | `varchar(70)` · NOT NULL | `varchar(70)` · NOT NULL | `character varying(70)` · NOT NULL | — / — / — | Coincide |
| `ultimoLibroMayor` → `ultimo_libro_mayor` | `bigint` · NOT NULL | `bigint` · NOT NULL | `bigint` · NOT NULL | `0` / `0` / `0` | Coincide |
| `valorCursor` → `valor_cursor` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |
| `actualizadoEn` → `actualizado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `red` · N:1 | `red_id` | `blockchain.redes` (`id`) | `NO ACTION` / `NO ACTION` | `FK_182f1a59b616fcf82c82d81442c` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_3700e5a33de8f7e21c5ea12f044` · `red_id`, `nombre_flujo`
- CHECK `CHK_f2c51df7d20e0c3078094f8a76` · `ultimo_libro_mayor >= 0`

### blockchain.despliegues_contrato · DespliegueContrato

Entidad `src/blockchain/entities/despliegues-contrato.entity.ts`. Migración `CreateIndependentTaykaTables1795837747558`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `redId` → `red_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `nombreContrato` → `nombre_contrato` | `varchar(100)` · NOT NULL | `varchar(100)` · NOT NULL | `character varying(100)` · NOT NULL | — / — / — | Coincide |
| `direccionContrato` → `direccion_contrato` | `varchar(100)` · NOT NULL | `varchar(100)` · NOT NULL | `character varying(100)` · NOT NULL | — / — / — | Coincide |
| `hashWasm` → `hash_wasm` | `varchar(128)` · NULL | `varchar(128)` · NULL | `character varying(128)` · NULL | — / — / — | Coincide |
| `version` → `version` | `varchar(40)` · NOT NULL | `varchar(40)` · NOT NULL | `character varying(40)` · NOT NULL | — / — / — | Coincide |
| `desplegadoEn` → `desplegado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |
| `estaActivo` → `esta_activo` | `boolean` · NOT NULL | `boolean` · NOT NULL | `boolean` · NOT NULL | `true` / `true` / `true` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `red` · N:1 | `red_id` | `blockchain.redes` (`id`) | `NO ACTION` / `NO ACTION` | `FK_68727647626b8178f2b8f8fa756` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_fd8d1f5ef9d31d6ef6a979bfff7` · `red_id`, `direccion_contrato`

### blockchain.eventos_contrato · EventoContrato

Entidad `src/blockchain/entities/eventos-contrato.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `transaccionId` → `transaccion_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `despliegueId` → `despliegue_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `indiceEvento` → `indice_evento` | `integer` · NOT NULL | `integer` · NOT NULL | `integer` · NOT NULL | — / — / — | Coincide |
| `tipoEvento` → `tipo_evento` | `varchar(100)` · NULL | `varchar(100)` · NULL | `character varying(100)` · NULL | — / — / — | Coincide |
| `temas` → `temas` | `jsonb` · NOT NULL | `jsonb` · NOT NULL | `jsonb` · NOT NULL | `'[]'::jsonb` / `'[]'::jsonb` / `'[]'::jsonb` | Coincide |
| `datos` → `datos` | `jsonb` · NOT NULL | `jsonb` · NOT NULL | `jsonb` · NOT NULL | `'{}'::jsonb` / `'{}'::jsonb` / `'{}'::jsonb` | Coincide |
| `secuenciaLibroMayor` → `secuencia_libro_mayor` | `bigint` · NULL | `bigint` · NULL | `bigint` · NULL | — / — / — | Coincide |
| `registradoEn` → `registrado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `transaccion` · N:1 | `transaccion_id` | `blockchain.transacciones` (`id`) | `NO ACTION` / `NO ACTION` | `FK_84a231e3b5a0627a1636fc3df16` · Coincide |
| `despliegue` · N:1 | `despliegue_id` | `blockchain.despliegues_contrato` (`id`) | `NO ACTION` / `NO ACTION` | `FK_6bc7c4d341fb164dd0843ba616e` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_15c82967b97066e1fe0bc977aa2` · `transaccion_id`, `indice_evento`
- CHECK `CHK_b703ad902c60fc6316a6538a1c` · `indice_evento >= 0`

### blockchain.operaciones_contrato · OperacionContrato

Entidad `src/blockchain/entities/operaciones-contrato.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `despliegueId` → `despliegue_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `transaccionId` → `transaccion_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `tipoOperacion` → `tipo_operacion` | `varchar(40)` · NOT NULL | `varchar(40)` · NOT NULL | `character varying(40)` · NOT NULL | — / — / — | Coincide |
| `grupoId` → `grupo_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `participanteId` → `participante_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `obligacionPagoId` → `obligacion_pago_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `transferenciaId` → `transferencia_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `reembolsoId` → `reembolso_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `ordenCompraId` → `orden_compra_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `claveGrupoContrato` → `clave_grupo_contrato` | `varchar(140)` · NULL | `varchar(140)` · NULL | `character varying(140)` · NULL | — / — / — | Coincide |
| `solicitudId` → `solicitud_id` | `varchar(150)` · NOT NULL | `varchar(150)` · NOT NULL | `character varying(150)` · NOT NULL | — / — / — | Coincide |
| `estado` → `estado` | `varchar(22)` · NOT NULL | `varchar(22)` · NOT NULL | `character varying(22)` · NOT NULL | `'creado'` / `'creado'` / `'creado'::character varying` | Coincide |
| `argumentos` → `argumentos` | `jsonb` · NOT NULL | `jsonb` · NOT NULL | `jsonb` · NOT NULL | `'{}'::jsonb` / `'{}'::jsonb` / `'{}'::jsonb` | Coincide |
| `resultado` → `resultado` | `jsonb` · NULL | `jsonb` · NULL | `jsonb` · NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `actualizadoEn` → `actualizado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `despliegue` · N:1 | `despliegue_id` | `blockchain.despliegues_contrato` (`id`) | `NO ACTION` / `NO ACTION` | `FK_07baf793339c67a61aa47ab441c` · Coincide |
| `transaccion` · N:1 | `transaccion_id` | `blockchain.transacciones` (`id`) | `NO ACTION` / `NO ACTION` | `FK_affe4cd29b0c1c7ba8aff0b4226` · Coincide |
| `grupo` · N:1 | `grupo_id` | `commerce.grupos_compra` (`id`) | `NO ACTION` / `NO ACTION` | `FK_76088a311e1e99f76a2c2de3f11` · Coincide |
| `participante` · N:1 | `participante_id` | `commerce.participantes_grupo` (`id`) | `NO ACTION` / `NO ACTION` | `FK_0e74a549da5ea0dda12f553f68a` · Coincide |
| `obligacionPago` · N:1 | `obligacion_pago_id` | `finance.obligaciones_pago` (`id`) | `NO ACTION` / `NO ACTION` | `FK_d4699bf1122f28193d2f1255434` · Coincide |
| `transferencia` · N:1 | `transferencia_id` | `finance.transferencias` (`id`) | `NO ACTION` / `NO ACTION` | `FK_d24aaef3ee0f0257b53b6157a25` · Coincide |
| `reembolso` · N:1 | `reembolso_id` | `finance.reembolsos` (`id`) | `NO ACTION` / `NO ACTION` | `FK_676258eed3e375ab0bdf06a5607` · Coincide |
| `ordenCompra` · N:1 | `orden_compra_id` | `commerce.ordenes_compra` (`id`) | `NO ACTION` / `NO ACTION` | `FK_79e2d51895a8e0a9527eeaa4e05` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_142b725f066759d8f53983db752` · `solicitud_id`
- CHECK `CHK_9eaa1338b057f10fded78c0758` · `tipo_operacion IN ('crear_grupo','depositar','confirmar','liberar','reembolso','cancelar','otro')`
- CHECK `CHK_05c89fc27e7e332baf588c392e` · `estado IN ('creado','enviado','confirmado','fallido','revertido')`

### blockchain.redes · Red

Entidad `src/blockchain/entities/redes.entity.ts`. Migración `CreateIndependentTaykaTables1795837747558`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `nombre` → `nombre` | `varchar(40)` · NOT NULL | `varchar(40)` · NOT NULL | `character varying(40)` · NOT NULL | — / — / — | Coincide |
| `fraseRed` → `frase_red` | `text` · NOT NULL | `text` · NOT NULL | `text` · NOT NULL | — / — / — | Coincide |
| `urlRpc` → `url_rpc` | `text` · NOT NULL | `text` · NOT NULL | `text` · NOT NULL | — / — / — | Coincide |
| `estaHabilitado` → `esta_habilitado` | `boolean` · NOT NULL | `boolean` · NOT NULL | `boolean` · NOT NULL | `true` / `true` / `true` | Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_d3571a73606533eee27cd4f88fb` · `nombre`

### blockchain.transacciones · Transaccion

Entidad `src/blockchain/entities/transacciones.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `redId` → `red_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `hashTransaccion` → `hash_transaccion` | `varchar(128)` · NOT NULL | `varchar(128)` · NOT NULL | `character varying(128)` · NOT NULL | — / — / — | Coincide |
| `billeteraOrigenId` → `billetera_origen_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `secuenciaLibroMayor` → `secuencia_libro_mayor` | `bigint` · NULL | `bigint` · NULL | `bigint` · NULL | — / — / — | Coincide |
| `estado` → `estado` | `varchar(20)` · NOT NULL | `varchar(20)` · NOT NULL | `character varying(20)` · NOT NULL | `'enviado'` / `'enviado'` / `'enviado'::character varying` | Coincide |
| `comisionStroops` → `comision_stroops` | `bigint` · NULL | `bigint` · NULL | `bigint` · NULL | — / — / — | Coincide |
| `enviadoEn` → `enviado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `confirmadoEn` → `confirmado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |
| `resultadoBruto` → `resultado_bruto` | `jsonb` · NULL | `jsonb` · NULL | `jsonb` · NULL | — / — / — | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `red` · N:1 | `red_id` | `blockchain.redes` (`id`) | `NO ACTION` / `NO ACTION` | `FK_7ed5149e182b5aaf1e4a055630c` · Coincide |
| `billeteraOrigen` · N:1 | `billetera_origen_id` | `blockchain.billeteras` (`id`) | `NO ACTION` / `NO ACTION` | `FK_a99cb0c869422180fd5af8efff3` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_ce1cc385a5d34f1c3ed2becca3a` · `red_id`, `hash_transaccion`
- CHECK `CHK_83eca22e3cc8d57d945401c33c` · `estado IN ('enviado','pendiente','exitoso','fallido','desconocido')`
- CHECK `CHK_0759f09a22982c8f2fa472ba89` · `comision_stroops IS NULL OR comision_stroops >= 0`

### catalog.almacenes · Almacen

Entidad `src/catalog/entities/almacenes.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `proveedorId` → `proveedor_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `ciudadId` → `ciudad_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `nombre` → `nombre` | `varchar(160)` · NOT NULL | `varchar(160)` · NOT NULL | `character varying(160)` · NOT NULL | — / — / — | Coincide |
| `direccion` → `direccion` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |
| `estaActivo` → `esta_activo` | `boolean` · NOT NULL | `boolean` · NOT NULL | `boolean` · NOT NULL | `true` / `true` / `true` | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `proveedor` · N:1 | `proveedor_id` | `catalog.proveedores` (`id`) | `NO ACTION` / `NO ACTION` | `FK_fdae0f195feecbe960dc4525efb` · Coincide |
| `ciudad` · N:1 | `ciudad_id` | `geography.ciudades` (`id`) | `NO ACTION` / `NO ACTION` | `FK_2f75d28ef38abe3c926bef549f3` · Coincide |

### catalog.archivos_producto · ArchivoProducto

Entidad `src/catalog/entities/archivos-producto.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `productoId` → `producto_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `varianteId` → `variante_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `urlArchivo` → `url_archivo` | `text` · NOT NULL | `text` · NOT NULL | `text` · NOT NULL | — / — / — | Coincide |
| `textoAlternativo` → `texto_alternativo` | `varchar(250)` · NULL | `varchar(250)` · NULL | `character varying(250)` · NULL | — / — / — | Coincide |
| `tipoArchivo` → `tipo_archivo` | `varchar(15)` · NOT NULL | `varchar(15)` · NOT NULL | `character varying(15)` · NOT NULL | `'imagen'` / `'imagen'` / `'imagen'::character varying` | Coincide |
| `ordenVisualizacion` → `orden_visualizacion` | `integer` · NOT NULL | `integer` · NOT NULL | `integer` · NOT NULL | `0` / `0` / `0` | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `producto` · N:1 | `producto_id` | `catalog.productos` (`id`) | `CASCADE` / `NO ACTION` | `FK_de356c951b407858e6eeff17638` · Coincide |
| `variante` · N:1 | `variante_id` | `catalog.variantes_producto` (`id`) | `SET NULL` / `NO ACTION` | `FK_11b55062f8d248edb6876dfbf96` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- CHECK `CHK_5a4e72db788994cc31525f9738` · `tipo_archivo IN ('imagen','video')`

### catalog.categorias · Categoria

Entidad `src/catalog/entities/categorias.entity.ts`. Migración `CreateIndependentTaykaTables1795837747558`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `padreId` → `padre_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `nombre` → `nombre` | `varchar(120)` · NOT NULL | `varchar(120)` · NOT NULL | `character varying(120)` · NOT NULL | — / — / — | Coincide |
| `identificadorUrl` → `identificador_url` | `varchar(140)` · NOT NULL | `varchar(140)` · NOT NULL | `character varying(140)` · NOT NULL | — / — / — | Coincide |
| `descripcion` → `descripcion` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |
| `estaActivo` → `esta_activo` | `boolean` · NOT NULL | `boolean` · NOT NULL | `boolean` · NOT NULL | `true` / `true` / `true` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `padre` · N:1 | `padre_id` | `catalog.categorias` (`id`) | `NO ACTION` / `NO ACTION` | `FK_e365ca3e687b87a6158766ed4ca` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_f5f87fc99b33de396fb69798e83` · `identificador_url`

### catalog.existencias · Existencia

Entidad `src/catalog/entities/existencias.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `almacenId` → `almacen_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `varianteId` → `variante_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `cantidadExistente` → `cantidad_existente` | `numeric(16,3)` · NOT NULL | `numeric(16,3)` · NOT NULL | `numeric(16,3)` · NOT NULL | `0` / `0` / `0` | Coincide |
| `cantidadReservada` → `cantidad_reservada` | `numeric(16,3)` · NOT NULL | `numeric(16,3)` · NOT NULL | `numeric(16,3)` · NOT NULL | `0` / `0` / `0` | Coincide |
| `actualizadoEn` → `actualizado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `almacen` · N:1 | `almacen_id` | `catalog.almacenes` (`id`) | `NO ACTION` / `NO ACTION` | `FK_32b1d225d53049557d9c2c686f6` · Coincide |
| `variante` · N:1 | `variante_id` | `catalog.variantes_producto` (`id`) | `NO ACTION` / `NO ACTION` | `FK_152831f8130c9d91689d7504389` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_72c514f1f5627bd53bcdf9482fd` · `almacen_id`, `variante_id`
- CHECK `CHK_68c773a8f8591d3bddf196702d` · `cantidad_reservada <= cantidad_existente`
- CHECK `CHK_985c90b7324979673b84187eb4` · `cantidad_existente >= 0`
- CHECK `CHK_8f45b254221d1ec3a8a8e1bebf` · `cantidad_reservada >= 0`

### catalog.marcas · Marca

Entidad `src/catalog/entities/marcas.entity.ts`. Migración `CreateIndependentTaykaTables1795837747558`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `nombre` → `nombre` | `varchar(120)` · NOT NULL | `varchar(120)` · NOT NULL | `character varying(120)` · NOT NULL | — / — / — | Coincide |
| `estaActivo` → `esta_activo` | `boolean` · NOT NULL | `boolean` · NOT NULL | `boolean` · NOT NULL | `true` / `true` / `true` | Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_29f5713899c32a96a8900143c6f` · `nombre`

### catalog.movimientos_inventario · MovimientoInventario

Entidad `src/catalog/entities/movimientos-inventario.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `existenciaId` → `existencia_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `usuarioActorId` → `usuario_actor_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `tipoMovimiento` → `tipo_movimiento` | `varchar(25)` · NOT NULL | `varchar(25)` · NOT NULL | `character varying(25)` · NOT NULL | — / — / — | Coincide |
| `variacionCantidad` → `variacion_cantidad` | `numeric(16,3)` · NOT NULL | `numeric(16,3)` · NOT NULL | `numeric(16,3)` · NOT NULL | — / — / — | Coincide |
| `motivo` → `motivo` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |
| `referenciaExterna` → `referencia_externa` | `varchar(120)` · NULL | `varchar(120)` · NULL | `character varying(120)` · NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `existencia` · N:1 | `existencia_id` | `catalog.existencias` (`id`) | `NO ACTION` / `NO ACTION` | `FK_7aac98916701f4e1ed4e87c9118` · Coincide |
| `usuarioActor` · N:1 | `usuario_actor_id` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_9ff7adc4549bdcba2accf67876f` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- CHECK `CHK_b3f99457d89dc3378d37854deb` · `tipo_movimiento IN ('inicial','recepcion','venta','ajuste','devolucion','dano')`
- CHECK `CHK_970a8958385cef723f9a59a00c` · `variacion_cantidad <> 0`

### catalog.productos · Producto

Entidad `src/catalog/entities/productos.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `categoriaId` → `categoria_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `marcaId` → `marca_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `nombre` → `nombre` | `varchar(220)` · NOT NULL | `varchar(220)` · NOT NULL | `character varying(220)` · NOT NULL | — / — / — | Coincide |
| `identificadorUrl` → `identificador_url` | `varchar(260)` · NOT NULL | `varchar(260)` · NOT NULL | `character varying(260)` · NOT NULL | — / — / — | Coincide |
| `descripcion` → `descripcion` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |
| `especificaciones` → `especificaciones` | `jsonb` · NOT NULL | `jsonb` · NOT NULL | `jsonb` · NOT NULL | `'{}'::jsonb` / `'{}'::jsonb` / `'{}'::jsonb` | Coincide |
| `descripcionGarantia` → `descripcion_garantia` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |
| `esPerecedero` → `es_perecedero` | `boolean` · NOT NULL | `boolean` · NOT NULL | `boolean` · NOT NULL | `false` / `false` / `false` | Coincide |
| `esRegulado` → `es_regulado` | `boolean` · NOT NULL | `boolean` · NOT NULL | `boolean` · NOT NULL | `false` / `false` / `false` | Coincide |
| `estado` → `estado` | `varchar(20)` · NOT NULL | `varchar(20)` · NOT NULL | `character varying(20)` · NOT NULL | `'borrador'` / `'borrador'` / `'borrador'::character varying` | Coincide |
| `creadoPor` → `creado_por` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `actualizadoEn` → `actualizado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `eliminadoEn` → `eliminado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `categoria` · N:1 | `categoria_id` | `catalog.categorias` (`id`) | `NO ACTION` / `NO ACTION` | `FK_5aaee6054b643e7c778477193a3` · Coincide |
| `marca` · N:1 | `marca_id` | `catalog.marcas` (`id`) | `NO ACTION` / `NO ACTION` | `FK_db0c18bdd5f379d40ae838e74bd` · Coincide |
| `creadoPorRelacion` · N:1 | `creado_por` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_a6fc531943327147f3c39dfd6a5` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_43c889a0f0913b86b505389d30a` · `identificador_url`
- CHECK `CHK_d0a2253387f9d397abc875a5e5` · `estado IN ('borrador','activo','oculto','archivado')`

### catalog.proveedores · Proveedor

Entidad `src/catalog/entities/proveedores.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `razonSocial` → `razon_social` | `varchar(220)` · NOT NULL | `varchar(220)` · NOT NULL | `character varying(220)` · NOT NULL | — / — / — | Coincide |
| `nombreComercial` → `nombre_comercial` | `varchar(220)` · NULL | `varchar(220)` · NULL | `character varying(220)` · NULL | — / — / — | Coincide |
| `nitCifrado` → `nit_cifrado` | `bytea` · NULL | `bytea` · NULL | `bytea` · NULL | — / — / — | Coincide |
| `ultimos4Nit` → `ultimos4_nit` | `varchar(4)` · NULL | `varchar(4)` · NULL | `character varying(4)` · NULL | — / — / — | Coincide |
| `descripcion` → `descripcion` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |
| `correoContacto` → `correo_contacto` | `varchar(254)` · NULL | `varchar(254)` · NULL | `character varying(254)` · NULL | — / — / — | Coincide |
| `telefonoContacto` → `telefono_contacto` | `varchar(40)` · NULL | `varchar(40)` · NULL | `character varying(40)` · NULL | — / — / — | Coincide |
| `urlSitio` → `url_sitio` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |
| `ciudadId` → `ciudad_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `direccion` → `direccion` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |
| `estado` → `estado` | `varchar(24)` · NOT NULL | `varchar(24)` · NOT NULL | `character varying(24)` · NOT NULL | `'pendiente'` / `'pendiente'` / `'pendiente'::character varying` | Coincide |
| `verificadoPor` → `verificado_por` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `verificadoEn` → `verificado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `actualizadoEn` → `actualizado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `eliminadoEn` → `eliminado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `ciudad` · N:1 | `ciudad_id` | `geography.ciudades` (`id`) | `NO ACTION` / `NO ACTION` | `FK_a17eeb1185a3ac637e371ab5d28` · Coincide |
| `verificadoPorRelacion` · N:1 | `verificado_por` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_2d8a78349e36a63e995504b8751` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- CHECK `CHK_3d06321dd040c2dd463b900d1a` · `estado IN ('pendiente','verificado','suspendido','rechazado')`

### catalog.usuarios_proveedor · UsuarioProveedor

Entidad `src/catalog/entities/usuarios-proveedor.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `proveedorId` → `proveedor_id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | — / — / — | Coincide |
| `usuarioId` → `usuario_id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | — / — / — | Coincide |
| `rolIntegrante` → `rol_integrante` | `varchar(24)` · NOT NULL | `varchar(24)` · NOT NULL | `character varying(24)` · NOT NULL | — / — / — | Coincide |
| `estaActivo` → `esta_activo` | `boolean` · NOT NULL | `boolean` · NOT NULL | `boolean` · NOT NULL | `true` / `true` / `true` | Coincide |
| `agregadoEn` → `agregado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `proveedor` · N:1 | `proveedor_id` | `catalog.proveedores` (`id`) | `CASCADE` / `NO ACTION` | `FK_41eba9eaeae9d09aeea1ce71aed` · Coincide |
| `usuario` · N:1 | `usuario_id` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_6135cf9046d354ed25d285ffaad` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- CHECK `CHK_31a164a05244c8e0b119489009` · `rol_integrante IN ('propietario','administrador','editor','lector')`

### catalog.variantes_producto · VarianteProducto

Entidad `src/catalog/entities/variantes-producto.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `productoId` → `producto_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `sku` → `sku` | `varchar(100)` · NOT NULL | `varchar(100)` · NOT NULL | `character varying(100)` · NOT NULL | — / — / — | Coincide |
| `nombre` → `nombre` | `varchar(180)` · NOT NULL | `varchar(180)` · NOT NULL | `character varying(180)` · NOT NULL | — / — / — | Coincide |
| `codigoBarras` → `codigo_barras` | `varchar(80)` · NULL | `varchar(80)` · NULL | `character varying(80)` · NULL | — / — / — | Coincide |
| `unidad` → `unidad` | `varchar(24)` · NOT NULL | `varchar(24)` · NOT NULL | `character varying(24)` · NOT NULL | — / — / — | Coincide |
| `unidadesPorPaquete` → `unidades_por_paquete` | `numeric(16,3)` · NOT NULL | `numeric(16,3)` · NOT NULL | `numeric(16,3)` · NOT NULL | `1` / `1` / `1` | Coincide |
| `pesoGramos` → `peso_gramos` | `numeric(14,3)` · NULL | `numeric(14,3)` · NULL | `numeric(14,3)` · NULL | — / — / — | Coincide |
| `atributos` → `atributos` | `jsonb` · NOT NULL | `jsonb` · NOT NULL | `jsonb` · NOT NULL | `'{}'::jsonb` / `'{}'::jsonb` / `'{}'::jsonb` | Coincide |
| `estaActivo` → `esta_activo` | `boolean` · NOT NULL | `boolean` · NOT NULL | `boolean` · NOT NULL | `true` / `true` / `true` | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `actualizadoEn` → `actualizado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `producto` · N:1 | `producto_id` | `catalog.productos` (`id`) | `NO ACTION` / `NO ACTION` | `FK_a16669d102a3cb11ccc79514a97` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_86cae081c04f72309229a68b5d1` · `sku`
- CHECK `CHK_b6ca9ae8de98fb6cad62aabf3f` · `peso_gramos IS NULL OR peso_gramos >= 0`
- CHECK `CHK_ea3480f15d4beed7447b5aaba9` · `unidad IN ('pieza','caja','paquete','kg','g','l','ml')`
- CHECK `CHK_55f7e16f28944e85eed33aa3fe` · `unidades_por_paquete > 0`

### commerce.asignaciones_orden · AsignacionOrden

Entidad `src/commerce/entities/asignaciones-orden.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `ordenCompraId` → `orden_compra_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `participanteId` → `participante_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `cantidadAsignada` → `cantidad_asignada` | `numeric(16,3)` · NOT NULL | `numeric(16,3)` · NOT NULL | `numeric(16,3)` · NOT NULL | — / — / — | Coincide |
| `costoAsignado` → `costo_asignado` | `numeric(24,7)` · NOT NULL | `numeric(24,7)` · NOT NULL | `numeric(24,7)` · NOT NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `ordenCompra` · N:1 | `orden_compra_id` | `commerce.ordenes_compra` (`id`) | `NO ACTION` / `NO ACTION` | `FK_c63291be7753b5cfa5972534995` · Coincide |
| `participante` · 1:1 | `participante_id` | `commerce.participantes_grupo` (`id`) | `NO ACTION` / `NO ACTION` | `FK_0cd255e386a350afd3ca21ac48d` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `REL_0cd255e386a350afd3ca21ac48` · `participante_id`
- CHECK `CHK_35cc2aea20bd2abb42349e96d8` · `cantidad_asignada > 0`
- CHECK `CHK_b08c111d4474e5e9ba101f6bdd` · `costo_asignado >= 0`

### commerce.destinos_oferta · DestinoOferta

Entidad `src/commerce/entities/destinos-oferta.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `ofertaId` → `oferta_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `ciudadId` → `ciudad_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `modalidadEntrega` → `modalidad_entrega` | `varchar(18)` · NOT NULL | `varchar(18)` · NOT NULL | `character varying(18)` · NOT NULL | — / — / — | Coincide |
| `costoEnvioEstimado` → `costo_envio_estimado` | `numeric(20,7)` · NOT NULL | `numeric(20,7)` · NOT NULL | `numeric(20,7)` · NOT NULL | `0` / `0` / `0` | Coincide |
| `estaHabilitado` → `esta_habilitado` | `boolean` · NOT NULL | `boolean` · NOT NULL | `boolean` · NOT NULL | `true` / `true` / `true` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `oferta` · N:1 | `oferta_id` | `commerce.ofertas` (`id`) | `CASCADE` / `NO ACTION` | `FK_d91ca66a289924a19b26ed0f0be` · Coincide |
| `ciudad` · N:1 | `ciudad_id` | `geography.ciudades` (`id`) | `NO ACTION` / `NO ACTION` | `FK_bf31f27b94466af1e7e16693299` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_1500e75c08e87c9005a0e3cb7f8` · `oferta_id`, `ciudad_id`, `modalidad_entrega`
- CHECK `CHK_95a847864249655a3aa38016b3` · `modalidad_entrega IN ('retiro','envio')`
- CHECK `CHK_bc025e2e3db3940ba47bfc8109` · `costo_envio_estimado >= 0`

### commerce.detalles_orden_compra · DetalleOrdenCompra

Entidad `src/commerce/entities/detalles-orden-compra.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `ordenCompraId` → `orden_compra_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `varianteId` → `variante_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `cantidad` → `cantidad` | `numeric(16,3)` · NOT NULL | `numeric(16,3)` · NOT NULL | `numeric(16,3)` · NOT NULL | — / — / — | Coincide |
| `precioUnitario` → `precio_unitario` | `numeric(20,7)` · NOT NULL | `numeric(20,7)` · NOT NULL | `numeric(20,7)` · NOT NULL | — / — / — | Coincide |
| `totalLinea` → `total_linea` | `numeric(24,7)` · NULL · STORED | `numeric(24,7)` · NULL · STORED | `numeric(24,7)` · NULL · STORED | — / — / — | Coincide |
| ↳ `total_linea` | `cantidad * precio_unitario` | `cantidad * precio_unitario` | `(cantidad * precio_unitario)` | — | Expresión equivalente |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `ordenCompra` · N:1 | `orden_compra_id` | `commerce.ordenes_compra` (`id`) | `NO ACTION` / `NO ACTION` | `FK_d8532dc7b88f514157373f04d18` · Coincide |
| `variante` · N:1 | `variante_id` | `catalog.variantes_producto` (`id`) | `NO ACTION` / `NO ACTION` | `FK_8b85c75b4ef21eb6a17e60cd9d1` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_0ecdcd2dfebe55643b13f68eece` · `orden_compra_id`, `variante_id`
- CHECK `CHK_18c2b4083f7cbb8d674679312e` · `cantidad > 0`
- CHECK `CHK_bdef3909621e2cfd55b05a3fe3` · `precio_unitario >= 0`

### commerce.eventos_grupo · EventoGrupo

Entidad `src/commerce/entities/eventos-grupo.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `grupoId` → `grupo_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `usuarioActorId` → `usuario_actor_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `tipoEvento` → `tipo_evento` | `varchar(70)` · NOT NULL | `varchar(70)` · NOT NULL | `character varying(70)` · NOT NULL | — / — / — | Coincide |
| `estadoAnterior` → `estado_anterior` | `varchar(26)` · NULL | `varchar(26)` · NULL | `character varying(26)` · NULL | — / — / — | Coincide |
| `estadoNuevo` → `estado_nuevo` | `varchar(26)` · NULL | `varchar(26)` · NULL | `character varying(26)` · NULL | — / — / — | Coincide |
| `datosEvento` → `datos_evento` | `jsonb` · NOT NULL | `jsonb` · NOT NULL | `jsonb` · NOT NULL | `'{}'::jsonb` / `'{}'::jsonb` / `'{}'::jsonb` | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `grupo` · N:1 | `grupo_id` | `commerce.grupos_compra` (`id`) | `NO ACTION` / `NO ACTION` | `FK_15edb5069181fb0c9a7a46e1b17` · Coincide |
| `usuarioActor` · N:1 | `usuario_actor_id` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_3fd5bc92b81a0e10bce1b9e0686` · Coincide |

### commerce.grupos_compra · GrupoCompra

Entidad `src/commerce/entities/grupos-compra.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `ofertaId` → `oferta_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `versionOfertaId` → `version_oferta_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `abiertoPor` → `abierto_por` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `codigoGrupo` → `codigo_grupo` | `varchar(40)` · NOT NULL | `varchar(40)` · NOT NULL | `character varying(40)` · NOT NULL | — / — / — | Coincide |
| `estado` → `estado` | `varchar(26)` · NOT NULL | `varchar(26)` · NOT NULL | `character varying(26)` · NOT NULL | `'abierto'` / `'abierto'` / `'abierto'::character varying` | Coincide |
| `cantidadMinimaFijada` → `cantidad_minima_fijada` | `numeric(16,3)` · NOT NULL | `numeric(16,3)` · NOT NULL | `numeric(16,3)` · NOT NULL | — / — / — | Coincide |
| `minimoCompradoresFijado` → `minimo_compradores_fijado` | `integer` · NOT NULL | `integer` · NOT NULL | `integer` · NOT NULL | — / — / — | Coincide |
| `precioFijado` → `precio_fijado` | `numeric(20,7)` · NOT NULL | `numeric(20,7)` · NOT NULL | `numeric(20,7)` · NOT NULL | — / — / — | Coincide |
| `codigoMoneda` → `codigo_moneda` | `varchar(12)` · NOT NULL | `varchar(12)` · NOT NULL | `character varying(12)` · NOT NULL | `'BOB'` / `'BOB'` / `'BOB'::character varying` | Coincide |
| `abiertoEn` → `abierto_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `plazoAdhesion` → `plazo_adhesion` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | — / — / — | Coincide |
| `pagoAbiertoEn` → `pago_abierto_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |
| `plazoPago` → `plazo_pago` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |
| `cerradoEn` → `cerrado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |
| `motivoCancelacion` → `motivo_cancelacion` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `actualizadoEn` → `actualizado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `oferta` · N:1 | `oferta_id` | `commerce.ofertas` (`id`) | `NO ACTION` / `NO ACTION` | `FK_03562cfb2795f70de7fdd9e370f` · Coincide |
| `versionOferta` · N:1 | `version_oferta_id` | `commerce.versiones_oferta` (`id`) | `NO ACTION` / `NO ACTION` | `FK_fd7abf67a1c483117e97e95cf73` · Coincide |
| `abiertoPorRelacion` · N:1 | `abierto_por` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_f43172d3ee58fca747bf7cc1274` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_aff1c8fcf6b62d4c066d6e8bb51` · `codigo_grupo`
- CHECK `CHK_74c49c8ea1baf8fb3fa9293bf1` · `plazo_adhesion > abierto_en`
- CHECK `CHK_1ad3f05f674663154ef94d9c27` · `plazo_adhesion <= abierto_en + interval '7 days'`
- CHECK `CHK_2427acead937c465f3effbdb3b` · `plazo_pago IS NULL OR (pago_abierto_en IS NOT NULL AND plazo_pago > pago_abierto_en)`
- CHECK `CHK_02112c916294d945a16d6db957` · `estado IN ('abierto','pago_abierto','incidencia','listo_para_compra','comprado','en_transito','disponible','completado','vencido','cancelado')`
- CHECK `CHK_7ce1409c07f7d557c9db157828` · `cantidad_minima_fijada > 0`
- CHECK `CHK_ac59eb2401ff79682b53464fba` · `minimo_compradores_fijado >= 0`
- CHECK `CHK_480197a56feeff7f63fe111c31` · `precio_fijado >= 0`

### commerce.lista_espera · ListaEspera

Entidad `src/commerce/entities/lista-espera.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `grupoId` → `grupo_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `usuarioId` → `usuario_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `cantidadDeseada` → `cantidad_deseada` | `numeric(16,3)` · NOT NULL | `numeric(16,3)` · NOT NULL | `numeric(16,3)` · NOT NULL | — / — / — | Coincide |
| `estado` → `estado` | `varchar(18)` · NOT NULL | `varchar(18)` · NOT NULL | `character varying(18)` · NOT NULL | `'esperando'` / `'esperando'` / `'esperando'::character varying` | Coincide |
| `invitadoEn` → `invitado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |
| `respondidoEn` → `respondido_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `grupo` · N:1 | `grupo_id` | `commerce.grupos_compra` (`id`) | `NO ACTION` / `NO ACTION` | `FK_13dc07d0418e1169aea354441aa` · Coincide |
| `usuario` · N:1 | `usuario_id` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_d49547d15f4a6f317f32cf62e1e` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_036cd50e92c8253d2efcc963ff7` · `grupo_id`, `usuario_id`
- CHECK `CHK_14cb99bfac87d02a11c449e987` · `cantidad_deseada > 0`
- CHECK `CHK_ae3d782426724224466c1d9783` · `estado IN ('esperando','invitado','aceptado','rechazado','vencido')`

### commerce.ofertas · Oferta

Entidad `src/commerce/entities/ofertas.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `proveedorId` → `proveedor_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `varianteId` → `variante_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `almacenId` → `almacen_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `autorizadoPor` → `autorizado_por` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `titulo` → `titulo` | `varchar(220)` · NOT NULL | `varchar(220)` · NOT NULL | `character varying(220)` · NOT NULL | — / — / — | Coincide |
| `descripcionCondiciones` → `descripcion_condiciones` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |
| `codigoMoneda` → `codigo_moneda` | `varchar(12)` · NOT NULL | `varchar(12)` · NOT NULL | `character varying(12)` · NOT NULL | `'BOB'` / `'BOB'` / `'BOB'::character varying` | Coincide |
| `precioUnitario` → `precio_unitario` | `numeric(20,7)` · NOT NULL | `numeric(20,7)` · NOT NULL | `numeric(20,7)` · NOT NULL | — / — / — | Coincide |
| `precioMinoristaReferencia` → `precio_minorista_referencia` | `numeric(20,7)` · NULL | `numeric(20,7)` · NULL | `numeric(20,7)` · NULL | — / — / — | Coincide |
| `cantidadMinimaPedido` → `cantidad_minima_pedido` | `numeric(16,3)` · NOT NULL | `numeric(16,3)` · NOT NULL | `numeric(16,3)` · NOT NULL | — / — / — | Coincide |
| `minimoCompradores` → `minimo_compradores` | `integer` · NOT NULL | `integer` · NOT NULL | `integer` · NOT NULL | `0` / `0` / `0` | Coincide |
| `cantidadMaxima` → `cantidad_maxima` | `numeric(16,3)` · NULL | `numeric(16,3)` · NULL | `numeric(16,3)` · NULL | — / — / — | Coincide |
| `vigenteDesde` → `vigente_desde` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | — / — / — | Coincide |
| `vigenteHasta` → `vigente_hasta` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | — / — / — | Coincide |
| `estado` → `estado` | `varchar(22)` · NOT NULL | `varchar(22)` · NOT NULL | `character varying(22)` · NOT NULL | `'borrador'` / `'borrador'` / `'borrador'::character varying` | Coincide |
| `condicionesGarantia` → `condiciones_garantia` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |
| `condicionesDevolucion` → `condiciones_devolucion` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `actualizadoEn` → `actualizado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `proveedor` · N:1 | `proveedor_id` | `catalog.proveedores` (`id`) | `NO ACTION` / `NO ACTION` | `FK_37c4ba411dd9ad7b36dd48b2ccb` · Coincide |
| `variante` · N:1 | `variante_id` | `catalog.variantes_producto` (`id`) | `NO ACTION` / `NO ACTION` | `FK_0d22878b12eaff6c9ae6951c706` · Coincide |
| `almacen` · N:1 | `almacen_id` | `catalog.almacenes` (`id`) | `NO ACTION` / `NO ACTION` | `FK_15c2cfe5a4c00c213e04cb841a9` · Coincide |
| `autorizadoPorRelacion` · N:1 | `autorizado_por` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_15cd80db72254723cbe1d75b270` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- CHECK `CHK_c9f12105bf82e6f85396f14a8c` · `vigente_hasta > vigente_desde`
- CHECK `CHK_0ea7400f1854e7a6b9f4a75fdc` · `cantidad_maxima IS NULL OR cantidad_maxima >= cantidad_minima_pedido`
- CHECK `CHK_e7bf314ac559dd19677b111a56` · `precio_unitario >= 0`
- CHECK `CHK_d4596ea6758386e04cf931a9c6` · `precio_minorista_referencia IS NULL OR precio_minorista_referencia >= 0`
- CHECK `CHK_effa7f894dbb4ae7a6811ee20c` · `cantidad_minima_pedido > 0`
- CHECK `CHK_59adb0b0e4819b57caffc225b2` · `minimo_compradores >= 0`
- CHECK `CHK_1cb35d30790479d1f8da643e8b` · `cantidad_maxima IS NULL OR cantidad_maxima > 0`
- CHECK `CHK_8891860b7b60f2e0b71672af73` · `estado IN ('borrador','autorizado','activo','pausado','vencido','revocado')`

### commerce.ordenes_compra · OrdenCompra

Entidad `src/commerce/entities/ordenes-compra.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `grupoId` → `grupo_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `proveedorId` → `proveedor_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `numeroOrden` → `numero_orden` | `varchar(50)` · NOT NULL | `varchar(50)` · NOT NULL | `character varying(50)` · NOT NULL | — / — / — | Coincide |
| `estado` → `estado` | `varchar(24)` · NOT NULL | `varchar(24)` · NOT NULL | `character varying(24)` · NOT NULL | `'preparado'` / `'preparado'` / `'preparado'::character varying` | Coincide |
| `cantidadTotal` → `cantidad_total` | `numeric(16,3)` · NOT NULL | `numeric(16,3)` · NOT NULL | `numeric(16,3)` · NOT NULL | — / — / — | Coincide |
| `subtotal` → `subtotal` | `numeric(24,7)` · NOT NULL | `numeric(24,7)` · NOT NULL | `numeric(24,7)` · NOT NULL | — / — / — | Coincide |
| `codigoMoneda` → `codigo_moneda` | `varchar(12)` · NOT NULL | `varchar(12)` · NOT NULL | `character varying(12)` · NOT NULL | `'BOB'` / `'BOB'` / `'BOB'::character varying` | Coincide |
| `referenciaExternaProveedor` → `referencia_externa_proveedor` | `varchar(120)` · NULL | `varchar(120)` · NULL | `character varying(120)` · NULL | — / — / — | Coincide |
| `emitidoPor` → `emitido_por` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `emitidoEn` → `emitido_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |
| `aceptadoEn` → `aceptado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `actualizadoEn` → `actualizado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `grupo` · 1:1 | `grupo_id` | `commerce.grupos_compra` (`id`) | `NO ACTION` / `NO ACTION` | `FK_f471256fab4b9a66e5d3a6187ad` · Coincide |
| `proveedor` · N:1 | `proveedor_id` | `catalog.proveedores` (`id`) | `NO ACTION` / `NO ACTION` | `FK_eae2474197d404cc8da237e190b` · Coincide |
| `emitidoPorRelacion` · N:1 | `emitido_por` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_9c9fa1ac79b29f7900ce50067bc` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `REL_f471256fab4b9a66e5d3a6187a` · `grupo_id`
- UNIQUE `UQ_7bebab66aceff9dc016b44942ab` · `numero_orden`
- CHECK `CHK_ab4e385d21d488017361106385` · `estado IN ('preparado','enviado','aceptado','cumplido','cancelado','fallido')`
- CHECK `CHK_2383b0dddbbbd93e214d24aafd` · `cantidad_total > 0`
- CHECK `CHK_f67a333882136c778f3e4b3555` · `subtotal >= 0`

### commerce.participantes_grupo · ParticipanteGrupo

Entidad `src/commerce/entities/participantes-grupo.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `grupoId` → `grupo_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `usuarioId` → `usuario_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `cantidad` → `cantidad` | `numeric(16,3)` · NOT NULL | `numeric(16,3)` · NOT NULL | `numeric(16,3)` · NOT NULL | — / — / — | Coincide |
| `precioUnitarioFijado` → `precio_unitario_fijado` | `numeric(20,7)` · NOT NULL | `numeric(20,7)` · NOT NULL | `numeric(20,7)` · NOT NULL | — / — / — | Coincide |
| `cargoEnvio` → `cargo_envio` | `numeric(20,7)` · NOT NULL | `numeric(20,7)` · NOT NULL | `numeric(20,7)` · NOT NULL | `0` / `0` / `0` | Coincide |
| `cargoServicio` → `cargo_servicio` | `numeric(20,7)` · NOT NULL | `numeric(20,7)` · NOT NULL | `numeric(20,7)` · NOT NULL | `0` / `0` / `0` | Coincide |
| `cargoImpuestos` → `cargo_impuestos` | `numeric(20,7)` · NOT NULL | `numeric(20,7)` · NOT NULL | `numeric(20,7)` · NOT NULL | `0` / `0` / `0` | Coincide |
| `totalAdeudado` → `total_adeudado` | `numeric(24,7)` · NULL · STORED | `numeric(24,7)` · NULL · STORED | `numeric(24,7)` · NULL · STORED | — / — / — | Coincide |
| ↳ `total_adeudado` | `cantidad * precio_unitario_fijado + cargo_envio + cargo_servicio + cargo_impuestos` | `cantidad * precio_unitario_fijado + cargo_envio + cargo_servicio + cargo_impuestos` | `((((cantidad * precio_unitario_fijado) + cargo_envio) + cargo_servicio) + cargo_impuestos)` | — | Expresión equivalente |
| `modalidadEntrega` → `modalidad_entrega` | `varchar(18)` · NOT NULL | `varchar(18)` · NOT NULL | `character varying(18)` · NOT NULL | — / — / — | Coincide |
| `ciudadDestinoId` → `ciudad_destino_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `versionCondicionesAceptadaId` → `version_condiciones_aceptada_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `estado` → `estado` | `varchar(20)` · NOT NULL | `varchar(20)` · NOT NULL | `character varying(20)` · NOT NULL | `'activo'` / `'activo'` / `'activo'::character varying` | Coincide |
| `adheridoEn` → `adherido_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `actualizadoEn` → `actualizado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `grupo` · N:1 | `grupo_id` | `commerce.grupos_compra` (`id`) | `NO ACTION` / `NO ACTION` | `FK_e3467a204ee307808ecc1a4daa2` · Coincide |
| `usuario` · N:1 | `usuario_id` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_0f9d1fe7a04a676ea9e5bf1f817` · Coincide |
| `ciudadDestino` · N:1 | `ciudad_destino_id` | `geography.ciudades` (`id`) | `NO ACTION` / `NO ACTION` | `FK_7b1171eba057e7308ab2e1e8bb9` · Coincide |
| `versionCondicionesAceptada` · N:1 | `version_condiciones_aceptada_id` | `commerce.versiones_oferta` (`id`) | `NO ACTION` / `NO ACTION` | `FK_aa957dd8789abae5140ab6f21d3` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_bfdfed4259154a18ba3c47d3294` · `grupo_id`, `usuario_id`
- CHECK `CHK_19ab3fb4f8b8a1fb6bf1379af4` · `cantidad > 0`
- CHECK `CHK_b0f10204667c7fe015d5f010a4` · `precio_unitario_fijado >= 0`
- CHECK `CHK_2d458e0bbb6520a23830eddfc9` · `cargo_envio >= 0`
- CHECK `CHK_a6ffaee125d71a8df02f7b0325` · `cargo_servicio >= 0`
- CHECK `CHK_a440264491a56df60c970b3634` · `cargo_impuestos >= 0`
- CHECK `CHK_cb5a80aeddc2c053c400acf55a` · `modalidad_entrega IN ('retiro','envio')`
- CHECK `CHK_5bf4666a8cdc048c0efc43ee72` · `estado IN ('activo','retirado','reemplazado','cancelado','completado')`

### commerce.reservas_inventario · ReservaInventario

Entidad `src/commerce/entities/reservas-inventario.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `existenciaId` → `existencia_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `grupoId` → `grupo_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `ordenCompraId` → `orden_compra_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `cantidadReservada` → `cantidad_reservada` | `numeric(16,3)` · NOT NULL | `numeric(16,3)` · NOT NULL | `numeric(16,3)` · NOT NULL | — / — / — | Coincide |
| `estado` → `estado` | `varchar(16)` · NOT NULL | `varchar(16)` · NOT NULL | `character varying(16)` · NOT NULL | `'activo'` / `'activo'` / `'activo'::character varying` | Coincide |
| `reservadoEn` → `reservado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `liberadoEn` → `liberado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `existencia` · N:1 | `existencia_id` | `catalog.existencias` (`id`) | `NO ACTION` / `NO ACTION` | `FK_a445384a07e56eeb34702866b79` · Coincide |
| `grupo` · N:1 | `grupo_id` | `commerce.grupos_compra` (`id`) | `NO ACTION` / `NO ACTION` | `FK_c7e27dfed4cf0f386cee8391012` · Coincide |
| `ordenCompra` · N:1 | `orden_compra_id` | `commerce.ordenes_compra` (`id`) | `NO ACTION` / `NO ACTION` | `FK_5caf55643092e7979c96b080036` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_9ebb3ba2f5adeb5be7182b3dfbb` · `orden_compra_id`, `existencia_id`
- CHECK `CHK_44dff18cacf74317c15dca1f48` · `cantidad_reservada > 0`
- CHECK `CHK_058dd75701f0d7a0e4e0be9f09` · `estado IN ('activo','consumido','liberado','vencido')`

### commerce.versiones_oferta · VersionOferta

Entidad `src/commerce/entities/versiones-oferta.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `ofertaId` → `oferta_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `numeroVersion` → `numero_version` | `integer` · NOT NULL | `integer` · NOT NULL | `integer` · NOT NULL | — / — / — | Coincide |
| `condicionesFijadas` → `condiciones_fijadas` | `jsonb` · NOT NULL | `jsonb` · NOT NULL | `jsonb` · NOT NULL | — / — / — | Coincide |
| `hashCondiciones` → `hash_condiciones` | `varchar(128)` · NULL | `varchar(128)` · NULL | `character varying(128)` · NULL | — / — / — | Coincide |
| `creadoPor` → `creado_por` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `oferta` · N:1 | `oferta_id` | `commerce.ofertas` (`id`) | `NO ACTION` / `NO ACTION` | `FK_b41dab8945e34e1bdeb859d416f` · Coincide |
| `creadoPorRelacion` · N:1 | `creado_por` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_780763e00fea2dadb199f668809` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_9ce386f1fe8ee2a15fba96d85ad` · `oferta_id`, `numero_version`
- CHECK `CHK_e6f00070cb205ca7a8cc96a7eb` · `numero_version > 0`

### community.comentarios · Comentario

Entidad `src/community/entities/comentarios.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `usuarioAutorId` → `usuario_autor_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `productoId` → `producto_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `ofertaId` → `oferta_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `grupoId` → `grupo_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `comentarioPadreId` → `comentario_padre_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `contenido` → `contenido` | `text` · NOT NULL | `text` · NOT NULL | `text` · NOT NULL | — / — / — | Coincide |
| `estado` → `estado` | `varchar(22)` · NOT NULL | `varchar(22)` · NOT NULL | `character varying(22)` · NOT NULL | `'visible'` / `'visible'` / `'visible'::character varying` | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `actualizadoEn` → `actualizado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `eliminadoEn` → `eliminado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `usuarioAutor` · N:1 | `usuario_autor_id` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_3a0cddabb86273ad40f2529e732` · Coincide |
| `producto` · N:1 | `producto_id` | `catalog.productos` (`id`) | `NO ACTION` / `NO ACTION` | `FK_08b736aaff4b2532af6adebd29b` · Coincide |
| `oferta` · N:1 | `oferta_id` | `commerce.ofertas` (`id`) | `NO ACTION` / `NO ACTION` | `FK_d8d374a40767a85a734ef6c8cca` · Coincide |
| `grupo` · N:1 | `grupo_id` | `commerce.grupos_compra` (`id`) | `NO ACTION` / `NO ACTION` | `FK_fe8d83885064153fddd2650d137` · Coincide |
| `comentarioPadre` · N:1 | `comentario_padre_id` | `community.comentarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_4c60f13a000e00c927064871875` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- CHECK `CHK_d4408d750275ef600d6b9e9370` · `num_nonnulls(producto_id,oferta_id,grupo_id) = 1`
- CHECK `CHK_ce1f5a4e27b406a81b22c2cd7e` · `length(trim(contenido)) BETWEEN 1 AND 5000`
- CHECK `CHK_706f2031a14e52884ea5ce4373` · `estado IN ('visible','oculto','en_revision','eliminado')`

### community.favoritos · Favorito

Entidad `src/community/entities/favoritos.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `usuarioId` → `usuario_id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | — / — / — | Coincide |
| `productoId` → `producto_id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `usuario` · N:1 | `usuario_id` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_a5437f5339df26be381a7df84b7` · Coincide |
| `producto` · N:1 | `producto_id` | `catalog.productos` (`id`) | `NO ACTION` / `NO ACTION` | `FK_a845954b0aad7d2ba99e91af9f3` · Coincide |

### community.reacciones · Reaccion

Entidad `src/community/entities/reacciones.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `usuarioId` → `usuario_id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | — / — / — | Coincide |
| `comentarioId` → `comentario_id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | — / — / — | Coincide |
| `reaccion` → `reaccion` | `varchar(16)` · NOT NULL | `varchar(16)` · NOT NULL | `character varying(16)` · NOT NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `usuario` · N:1 | `usuario_id` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_93e7919dfe40d4905ce411644f8` · Coincide |
| `comentario` · N:1 | `comentario_id` | `community.comentarios` (`id`) | `CASCADE` / `NO ACTION` | `FK_105cbec53aecedae1d43a7c9302` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- CHECK `CHK_3f4597956c041fb50afd9c86b9` · `reaccion IN ('me_gusta','no_me_gusta')`

### community.reportes · Reporte

Entidad `src/community/entities/reportes.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `usuarioDenuncianteId` → `usuario_denunciante_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `comentarioId` → `comentario_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `resenaId` → `resena_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `motivo` → `motivo` | `varchar(80)` · NOT NULL | `varchar(80)` · NOT NULL | `character varying(80)` · NOT NULL | — / — / — | Coincide |
| `detalles` → `detalles` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |
| `estado` → `estado` | `varchar(20)` · NOT NULL | `varchar(20)` · NOT NULL | `character varying(20)` · NOT NULL | `'abierto'` / `'abierto'` / `'abierto'::character varying` | Coincide |
| `resueltoPor` → `resuelto_por` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `resueltoEn` → `resuelto_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `usuarioDenunciante` · N:1 | `usuario_denunciante_id` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_5ca5b7ecc33f95e3afc6f51e6cd` · Coincide |
| `comentario` · N:1 | `comentario_id` | `community.comentarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_74c14664bd1be79028ca7eae2f6` · Coincide |
| `resena` · N:1 | `resena_id` | `community.resenas` (`id`) | `NO ACTION` / `NO ACTION` | `FK_ef418e65f24eb750971c0a8cf48` · Coincide |
| `resueltoPorRelacion` · N:1 | `resuelto_por` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_898e93f36c2cdf5d86d61229e6e` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- CHECK `CHK_14c625cd2ba639920591cab9e7` · `num_nonnulls(comentario_id,resena_id)=1`
- CHECK `CHK_ceb926ea215646f27bd272605b` · `estado IN ('abierto','investigando','resuelto','descartado')`

### community.resenas · Resena

Entidad `src/community/entities/resenas.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `usuarioAutorId` → `usuario_autor_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `participanteGrupoId` → `participante_grupo_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `productoId` → `producto_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `proveedorId` → `proveedor_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `calificacion` → `calificacion` | `smallint` · NOT NULL | `smallint` · NOT NULL | `smallint` · NOT NULL | — / — / — | Coincide |
| `titulo` → `titulo` | `varchar(180)` · NULL | `varchar(180)` · NULL | `character varying(180)` · NULL | — / — / — | Coincide |
| `contenido` → `contenido` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |
| `estado` → `estado` | `varchar(20)` · NOT NULL | `varchar(20)` · NOT NULL | `character varying(20)` · NOT NULL | `'visible'` / `'visible'` / `'visible'::character varying` | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `actualizadoEn` → `actualizado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `usuarioAutor` · N:1 | `usuario_autor_id` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_601d0602f5363dd5fbc30d45f83` · Coincide |
| `participanteGrupo` · N:1 | `participante_grupo_id` | `commerce.participantes_grupo` (`id`) | `NO ACTION` / `NO ACTION` | `FK_3e011f8e1951b3ad58c4de360a9` · Coincide |
| `producto` · N:1 | `producto_id` | `catalog.productos` (`id`) | `NO ACTION` / `NO ACTION` | `FK_c0600522a10d2bfcb707a417325` · Coincide |
| `proveedor` · N:1 | `proveedor_id` | `catalog.proveedores` (`id`) | `NO ACTION` / `NO ACTION` | `FK_d10cd60bf0827775bc3cf2ce605` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- CHECK `CHK_83c674e11513285d85dc07bf39` · `num_nonnulls(producto_id,proveedor_id) = 1`
- CHECK `CHK_4d4d2e9d7798f137dce91f9290` · `calificacion BETWEEN 1 AND 5`
- CHECK `CHK_f49cae2929c1e8f3b254fba207` · `estado IN ('visible','oculto','eliminado')`
- Índice parcial `unica_resena_producto_participante` · `participante_grupo_id`, `producto_id` · `producto_id IS NOT NULL`
- Índice parcial `unica_resena_proveedor_participante` · `participante_grupo_id`, `proveedor_id` · `proveedor_id IS NOT NULL`

### finance.conciliaciones · Conciliacion

Entidad `src/finance/entities/conciliaciones.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `transferenciaId` → `transferencia_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `verificadoPor` → `verificado_por` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `fuenteVerificacion` → `fuente_verificacion` | `varchar(32)` · NOT NULL | `varchar(32)` · NOT NULL | `character varying(32)` · NOT NULL | — / — / — | Coincide |
| `resultado` → `resultado` | `varchar(20)` · NOT NULL | `varchar(20)` · NOT NULL | `character varying(20)` · NOT NULL | — / — / — | Coincide |
| `transaccionProveedorId` → `transaccion_proveedor_id` | `varchar(180)` · NULL | `varchar(180)` · NULL | `character varying(180)` · NULL | — / — / — | Coincide |
| `evidencia` → `evidencia` | `jsonb` · NOT NULL | `jsonb` · NOT NULL | `jsonb` · NOT NULL | `'{}'::jsonb` / `'{}'::jsonb` / `'{}'::jsonb` | Coincide |
| `verificadoEn` → `verificado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `notas` → `notas` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `transferencia` · N:1 | `transferencia_id` | `finance.transferencias` (`id`) | `NO ACTION` / `NO ACTION` | `FK_bf7614930f9acdcbe663b54dfbe` · Coincide |
| `verificadoPorRelacion` · N:1 | `verificado_por` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_d923988ad5ed9ea389c57b326f4` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- CHECK `CHK_3d30b216548690638b20176a8a` · `fuente_verificacion IN ('api_bancaria','proveedor_pagos','rpc_stellar','manual_autorizado','dato_prueba')`
- CHECK `CHK_1ab503938da614e7933996231d` · `resultado IN ('coincidente','no_coincidente','pendiente','duplicado','rechazado')`

### finance.liquidaciones_proveedor · LiquidacionProveedor

Entidad `src/finance/entities/liquidaciones-proveedor.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `ordenCompraId` → `orden_compra_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `proveedorId` → `proveedor_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `monto` → `monto` | `numeric(24,7)` · NOT NULL | `numeric(24,7)` · NOT NULL | `numeric(24,7)` · NOT NULL | — / — / — | Coincide |
| `codigoMoneda` → `codigo_moneda` | `varchar(12)` · NOT NULL | `varchar(12)` · NOT NULL | `character varying(12)` · NOT NULL | — / — / — | Coincide |
| `estado` → `estado` | `varchar(20)` · NOT NULL | `varchar(20)` · NOT NULL | `character varying(20)` · NOT NULL | `'pendiente'` / `'pendiente'` / `'pendiente'::character varying` | Coincide |
| `aprobadoPor` → `aprobado_por` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `confirmadoEn` → `confirmado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `ordenCompra` · N:1 | `orden_compra_id` | `commerce.ordenes_compra` (`id`) | `NO ACTION` / `NO ACTION` | `FK_105d3afa0632f4bd53167fda630` · Coincide |
| `proveedor` · N:1 | `proveedor_id` | `catalog.proveedores` (`id`) | `NO ACTION` / `NO ACTION` | `FK_059eeadd45cb0149672632e7860` · Coincide |
| `aprobadoPorRelacion` · N:1 | `aprobado_por` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_13fa286c727d2d434425a5949d8` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- CHECK `CHK_95d4b83b05e755520460d9a5c5` · `monto > 0`
- CHECK `CHK_3fb449ca4748f3364a0fa485e1` · `estado IN ('pendiente','aprobado','enviado','confirmado','fallido')`

### finance.medios_pago · MedioPago

Entidad `src/finance/entities/medios-pago.entity.ts`. Migración `CreateIndependentTaykaTables1795837747558`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `codigo` → `codigo` | `varchar(50)` · NOT NULL | `varchar(50)` · NOT NULL | `character varying(50)` · NOT NULL | — / — / — | Coincide |
| `tipoMedio` → `tipo_medio` | `varchar(32)` · NOT NULL | `varchar(32)` · NOT NULL | `character varying(32)` · NOT NULL | — / — / — | Coincide |
| `nombreProveedorServicio` → `nombre_proveedor_servicio` | `varchar(120)` · NULL | `varchar(120)` · NULL | `character varying(120)` · NULL | — / — / — | Coincide |
| `codigoMoneda` → `codigo_moneda` | `varchar(12)` · NOT NULL | `varchar(12)` · NOT NULL | `character varying(12)` · NOT NULL | — / — / — | Coincide |
| `estaHabilitado` → `esta_habilitado` | `boolean` · NOT NULL | `boolean` · NOT NULL | `boolean` · NOT NULL | `false` / `false` / `false` | Coincide |
| `ambiente` → `ambiente` | `varchar(12)` · NOT NULL | `varchar(12)` · NOT NULL | `character varying(12)` · NOT NULL | `'prueba'` / `'prueba'` / `'prueba'::character varying` | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_8f4802fcdfc719a8d692d70b4a9` · `codigo`
- CHECK `CHK_72f21a496e91c76c76d5ee36c8` · `tipo_medio IN ('transferencia_bancaria','qr','token_stellar','prueba_manual')`
- CHECK `CHK_f70d6074f5c734b790872091e2` · `ambiente IN ('prueba','produccion')`

### finance.obligaciones_pago · ObligacionPago

Entidad `src/finance/entities/obligaciones-pago.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `participanteGrupoId` → `participante_grupo_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `medioPagoId` → `medio_pago_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `montoAdeudado` → `monto_adeudado` | `numeric(24,7)` · NOT NULL | `numeric(24,7)` · NOT NULL | `numeric(24,7)` · NOT NULL | — / — / — | Coincide |
| `montoVerificado` → `monto_verificado` | `numeric(24,7)` · NOT NULL | `numeric(24,7)` · NOT NULL | `numeric(24,7)` · NOT NULL | `0` / `0` / `0` | Coincide |
| `codigoMoneda` → `codigo_moneda` | `varchar(12)` · NOT NULL | `varchar(12)` · NOT NULL | `character varying(12)` · NOT NULL | — / — / — | Coincide |
| `estado` → `estado` | `varchar(24)` · NOT NULL | `varchar(24)` · NOT NULL | `character varying(24)` · NOT NULL | `'creado'` / `'creado'` / `'creado'::character varying` | Coincide |
| `venceEn` → `vence_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | — / — / — | Coincide |
| `pagadoEn` → `pagado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `actualizadoEn` → `actualizado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `participanteGrupo` · 1:1 | `participante_grupo_id` | `commerce.participantes_grupo` (`id`) | `NO ACTION` / `NO ACTION` | `FK_ac4ef693d9d1d6167ba30e22dff` · Coincide |
| `medioPago` · N:1 | `medio_pago_id` | `finance.medios_pago` (`id`) | `NO ACTION` / `NO ACTION` | `FK_aed13bae5bef822a0b16fd90705` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `REL_ac4ef693d9d1d6167ba30e22df` · `participante_grupo_id`
- CHECK `CHK_759539e930d9d07e843478e467` · `monto_verificado <= monto_adeudado`
- CHECK `CHK_436c96dc39fa5a483c5a2f93d4` · `monto_adeudado >= 0`
- CHECK `CHK_b34d4775096d42533058863ccb` · `monto_verificado >= 0`
- CHECK `CHK_a03e5de8fde730dda15d250748` · `estado IN ('creado','pendiente','pago_parcial','pagado','fallido','vencido','reembolsado')`

### finance.reembolsos · Reembolso

Entidad `src/finance/entities/reembolsos.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `obligacionPagoId` → `obligacion_pago_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `motivo` → `motivo` | `varchar(70)` · NOT NULL | `varchar(70)` · NOT NULL | `character varying(70)` · NOT NULL | — / — / — | Coincide |
| `monto` → `monto` | `numeric(24,7)` · NOT NULL | `numeric(24,7)` · NOT NULL | `numeric(24,7)` · NOT NULL | — / — / — | Coincide |
| `codigoMoneda` → `codigo_moneda` | `varchar(12)` · NOT NULL | `varchar(12)` · NOT NULL | `character varying(12)` · NOT NULL | — / — / — | Coincide |
| `estado` → `estado` | `varchar(20)` · NOT NULL | `varchar(20)` · NOT NULL | `character varying(20)` · NOT NULL | `'solicitado'` / `'solicitado'` / `'solicitado'::character varying` | Coincide |
| `solicitadoPor` → `solicitado_por` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `aprobadoPor` → `aprobado_por` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `completadoEn` → `completado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |
| `notas` → `notas` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `obligacionPago` · N:1 | `obligacion_pago_id` | `finance.obligaciones_pago` (`id`) | `NO ACTION` / `NO ACTION` | `FK_fa2cb8bf2266682571b6a401ca4` · Coincide |
| `solicitadoPorRelacion` · N:1 | `solicitado_por` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_9fe739b2e1bcee31271f7dff9a5` · Coincide |
| `aprobadoPorRelacion` · N:1 | `aprobado_por` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_7719e04dea828f7037773244526` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- CHECK `CHK_7ae7f43afdba4c7ca14c6f6175` · `monto > 0`
- CHECK `CHK_aacac9f85aeff5d852e7b638f5` · `estado IN ('solicitado','aprobado','procesando','completado','rechazado','fallido')`

### finance.transferencias · Transferencia

Entidad `src/finance/entities/transferencias.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `medioPagoId` → `medio_pago_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `clase` → `clase` | `varchar(24)` · NOT NULL | `varchar(24)` · NOT NULL | `character varying(24)` · NOT NULL | — / — / — | Coincide |
| `obligacionPagoId` → `obligacion_pago_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `reembolsoId` → `reembolso_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `liquidacionProveedorId` → `liquidacion_proveedor_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `iniciadoPor` → `iniciado_por` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `monto` → `monto` | `numeric(24,7)` · NOT NULL | `numeric(24,7)` · NOT NULL | `numeric(24,7)` · NOT NULL | — / — / — | Coincide |
| `codigoMoneda` → `codigo_moneda` | `varchar(12)` · NOT NULL | `varchar(12)` · NOT NULL | `character varying(12)` · NOT NULL | — / — / — | Coincide |
| `referenciaOrigen` → `referencia_origen` | `varchar(140)` · NULL | `varchar(140)` · NULL | `character varying(140)` · NULL | — / — / — | Coincide |
| `referenciaDestinatario` → `referencia_destinatario` | `varchar(140)` · NULL | `varchar(140)` · NULL | `character varying(140)` · NULL | — / — / — | Coincide |
| `referenciaExterna` → `referencia_externa` | `varchar(180)` · NULL | `varchar(180)` · NULL | `character varying(180)` · NULL | — / — / — | Coincide |
| `claveIdempotencia` → `clave_idempotencia` | `varchar(160)` · NULL | `varchar(160)` · NULL | `character varying(160)` · NULL | — / — / — | Coincide |
| `estado` → `estado` | `varchar(24)` · NOT NULL | `varchar(24)` · NOT NULL | `character varying(24)` · NOT NULL | `'declarado'` / `'declarado'` / `'declarado'::character varying` | Coincide |
| `urlComprobante` → `url_comprobante` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |
| `datosTransferencia` → `datos_transferencia` | `jsonb` · NOT NULL | `jsonb` · NOT NULL | `jsonb` · NOT NULL | `'{}'::jsonb` / `'{}'::jsonb` / `'{}'::jsonb` | Coincide |
| `declaradoEn` → `declarado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `verificadoEn` → `verificado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `actualizadoEn` → `actualizado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `medioPago` · N:1 | `medio_pago_id` | `finance.medios_pago` (`id`) | `NO ACTION` / `NO ACTION` | `FK_2172d90b5585cb236b1cfa86c14` · Coincide |
| `obligacionPago` · N:1 | `obligacion_pago_id` | `finance.obligaciones_pago` (`id`) | `NO ACTION` / `NO ACTION` | `FK_addc67a0c5909345aa6dc7b2da7` · Coincide |
| `reembolso` · N:1 | `reembolso_id` | `finance.reembolsos` (`id`) | `NO ACTION` / `NO ACTION` | `FK_bfa96495347f174aa961010b877` · Coincide |
| `liquidacionProveedor` · N:1 | `liquidacion_proveedor_id` | `finance.liquidaciones_proveedor` (`id`) | `NO ACTION` / `NO ACTION` | `FK_d4eca7bfcb9b4ba978d19b7e9da` · Coincide |
| `iniciadoPorRelacion` · N:1 | `iniciado_por` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_be4cd6bb03735ecafd5d550e335` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_567910101a3b80f2e2a87a9e407` · `clave_idempotencia`
- CHECK `CHK_5efba37895176ffdb722c52557` · ` (clase = 'cobro' AND obligacion_pago_id IS NOT NULL AND reembolso_id IS NULL AND liquidacion_proveedor_id IS NULL) OR (clase = 'reembolso' AND obligacion_pago_id IS NULL AND reembolso_id IS NOT NULL AND liquidacion_proveedor_id IS NULL) OR (clase = 'liquidacion_proveedor' AND obligacion_pago_id IS NULL AND reembolso_id IS NULL AND liquidacion_proveedor_id IS NOT NULL) OR (clase = 'ajuste' AND obligacion_pago_id IS NULL AND reembolso_id IS NULL AND liquidacion_proveedor_id IS NULL) `
- CHECK `CHK_011caa072ff809e6f1673e2431` · `clase IN ('cobro','reembolso','liquidacion_proveedor','ajuste')`
- CHECK `CHK_fc47221d7131a7c425ae45c0fb` · `monto > 0`
- CHECK `CHK_2c07851323b6ad48c1025755cb` · `estado IN ('declarado','pendiente_verificacion','verificado','rechazado','fallido','revertido')`
- Índice parcial `unica_referencia_transferencia_medio` · `medio_pago_id`, `referencia_externa` · `referencia_externa IS NOT NULL`

### geography.ciudades · Ciudad

Entidad `src/geography/entities/ciudades.entity.ts`. Migración `CreateIndependentTaykaTables1795837747558`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `departamentoId` → `departamento_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `nombre` → `nombre` | `varchar(120)` · NOT NULL | `varchar(120)` · NOT NULL | `character varying(120)` · NOT NULL | — / — / — | Coincide |
| `codigoPostal` → `codigo_postal` | `varchar(20)` · NULL | `varchar(20)` · NULL | `character varying(20)` · NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `departamento` · N:1 | `departamento_id` | `geography.departamentos` (`id`) | `NO ACTION` / `NO ACTION` | `FK_bd96bf2e90791cf79ccd8534f8f` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_3fa544fb014eb7e88b4f06db2f5` · `departamento_id`, `nombre`

### geography.departamentos · Departamento

Entidad `src/geography/entities/departamentos.entity.ts`. Migración `CreateIndependentTaykaTables1795837747558`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `nombre` → `nombre` | `varchar(100)` · NOT NULL | `varchar(100)` · NOT NULL | `character varying(100)` · NOT NULL | — / — / — | Coincide |
| `abreviatura` → `abreviatura` | `varchar(8)` · NULL | `varchar(8)` · NULL | `character varying(8)` · NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_324052d75576efdbc10ba3e8997` · `nombre`
- UNIQUE `UQ_4b85c46db2cc0c44767d7c65654` · `abreviatura`

### identity.consentimientos · Consentimiento

Entidad `src/identity/entities/consentimientos.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `usuarioId` → `usuario_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `tipoPolitica` → `tipo_politica` | `varchar(40)` · NOT NULL | `varchar(40)` · NOT NULL | `character varying(40)` · NOT NULL | — / — / — | Coincide |
| `versionPolitica` → `version_politica` | `varchar(40)` · NOT NULL | `varchar(40)` · NOT NULL | `character varying(40)` · NOT NULL | — / — / — | Coincide |
| `otorgado` → `otorgado` | `boolean` · NOT NULL | `boolean` · NOT NULL | `boolean` · NOT NULL | — / — / — | Coincide |
| `direccionIp` → `direccion_ip` | `inet` · NULL | `inet` · NULL | `inet` · NULL | — / — / — | Coincide |
| `registradoEn` → `registrado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `usuario` · N:1 | `usuario_id` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_bdabb30d760af10575fff708468` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- CHECK `CHK_32e84f69f0790e999ed5e05043` · `tipo_politica IN ('terminos','privacidad','mercadeo','tratamiento_datos')`

### identity.direcciones · Direccion

Entidad `src/identity/entities/direcciones.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `usuarioId` → `usuario_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `ciudadId` → `ciudad_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `etiqueta` → `etiqueta` | `varchar(70)` · NOT NULL | `varchar(70)` · NOT NULL | `character varying(70)` · NOT NULL | `'Principal'` / `'Principal'` / `'Principal'::character varying` | Coincide |
| `direccion` → `direccion` | `varchar(240)` · NOT NULL | `varchar(240)` · NOT NULL | `character varying(240)` · NOT NULL | — / — / — | Coincide |
| `detalleDireccion` → `detalle_direccion` | `varchar(240)` · NULL | `varchar(240)` · NULL | `character varying(240)` · NULL | — / — / — | Coincide |
| `referenciasUbicacion` → `referencias_ubicacion` | `varchar(240)` · NULL | `varchar(240)` · NULL | `character varying(240)` · NULL | — / — / — | Coincide |
| `latitud` → `latitud` | `numeric(10,7)` · NULL | `numeric(10,7)` · NULL | `numeric(10,7)` · NULL | — / — / — | Coincide |
| `longitud` → `longitud` | `numeric(10,7)` · NULL | `numeric(10,7)` · NULL | `numeric(10,7)` · NULL | — / — / — | Coincide |
| `esPrincipal` → `es_principal` | `boolean` · NOT NULL | `boolean` · NOT NULL | `boolean` · NOT NULL | `false` / `false` / `false` | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `actualizadoEn` → `actualizado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `usuario` · N:1 | `usuario_id` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_1a0f2a34355a3ac2879a9756746` · Coincide |
| `ciudad` · N:1 | `ciudad_id` | `geography.ciudades` (`id`) | `NO ACTION` / `NO ACTION` | `FK_ea65786ec1ff54d88eedb0c587c` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- CHECK `CHK_f88b0527d27a4c424ca67d53f5` · `latitud IS NULL OR latitud BETWEEN -90 AND 90`
- CHECK `CHK_043b0ac714edd6a8affc16d8c4` · `longitud IS NULL OR longitud BETWEEN -180 AND 180`
- Índice parcial `unica_direccion_principal_usuario` · `usuario_id` · `es_principal`

### identity.permisos · Permiso

Entidad `src/identity/entities/permisos.entity.ts`. Migración `CreateIndependentTaykaTables1795837747558`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `codigo` → `codigo` | `varchar(100)` · NOT NULL | `varchar(100)` · NOT NULL | `character varying(100)` · NOT NULL | — / — / — | Coincide |
| `descripcion` → `descripcion` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_40d964f2742b2f4e3f379d3f460` · `codigo`

### identity.roles · Rol

Entidad `src/identity/entities/roles.entity.ts`. Migración `CreateIndependentTaykaTables1795837747558`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `codigo` → `codigo` | `varchar(50)` · NOT NULL | `varchar(50)` · NOT NULL | `character varying(50)` · NOT NULL | — / — / — | Coincide |
| `nombre` → `nombre` | `varchar(90)` · NOT NULL | `varchar(90)` · NOT NULL | `character varying(90)` · NOT NULL | — / — / — | Coincide |
| `descripcion` → `descripcion` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_5def9cb8b6a53b45e58ab82e37e` · `codigo`

### identity.roles_permisos · RolPermiso

Entidad `src/identity/entities/roles-permisos.entity.ts`. Migración `CreateIndependentTaykaTables1795837747558`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `rolId` → `rol_id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | — / — / — | Coincide |
| `permisoId` → `permiso_id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | — / — / — | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `rol` · N:1 | `rol_id` | `identity.roles` (`id`) | `CASCADE` / `NO ACTION` | `FK_dc3cfbcce511233d4bef92d7e3b` · Coincide |
| `permiso` · N:1 | `permiso_id` | `identity.permisos` (`id`) | `CASCADE` / `NO ACTION` | `FK_ef10d9983fcb45f0024cc7000d3` · Coincide |

### identity.sesiones · Sesion

Entidad `src/identity/entities/sesiones.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `usuarioId` → `usuario_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `hashTokenRenovacion` → `hash_token_renovacion` | `text` · NOT NULL | `text` · NOT NULL | `text` · NOT NULL | — / — / — | Coincide |
| `direccionIp` → `direccion_ip` | `inet` · NULL | `inet` · NULL | `inet` · NULL | — / — / — | Coincide |
| `agenteUsuario` → `agente_usuario` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |
| `venceEn` → `vence_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | — / — / — | Coincide |
| `revocadoEn` → `revocado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `usuario` · N:1 | `usuario_id` | `identity.usuarios` (`id`) | `CASCADE` / `NO ACTION` | `FK_be14eb22d2e8fbf2ca6c3fe0d56` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_6087eac44505a791160956eaae0` · `hash_token_renovacion`

### identity.usuarios · Usuario

Entidad `src/identity/entities/usuarios.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `correoElectronico` → `correo_electronico` | `varchar(254)` · NOT NULL | `varchar(254)` · NOT NULL | `character varying(254)` · NOT NULL | — / — / — | Coincide |
| `telefono` → `telefono` | `varchar(30)` · NULL | `varchar(30)` · NULL | `character varying(30)` · NULL | — / — / — | Coincide |
| `hashContrasena` → `hash_contrasena` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |
| `nombres` → `nombres` | `varchar(100)` · NOT NULL | `varchar(100)` · NOT NULL | `character varying(100)` · NOT NULL | — / — / — | Coincide |
| `apellidos` → `apellidos` | `varchar(140)` · NOT NULL | `varchar(140)` · NOT NULL | `character varying(140)` · NOT NULL | — / — / — | Coincide |
| `urlAvatar` → `url_avatar` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |
| `fechaNacimiento` → `fecha_nacimiento` | `date` · NULL | `date` · NULL | `date` · NULL | — / — / — | Coincide |
| `estado` → `estado` | `varchar(24)` · NOT NULL | `varchar(24)` · NOT NULL | `character varying(24)` · NOT NULL | `'pendiente'` / `'pendiente'` / `'pendiente'::character varying` | Coincide |
| `correoVerificadoEn` → `correo_verificado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |
| `telefonoVerificadoEn` → `telefono_verificado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |
| `ultimoAccesoEn` → `ultimo_acceso_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `actualizadoEn` → `actualizado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `eliminadoEn` → `eliminado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- CHECK `CHK_59a8b4947ab4b4b8d42e72be58` · `estado IN ('pendiente','activo','suspendido','bloqueado')`
- Índice parcial `unico_usuario_telefono_vigente` · `telefono` · `telefono IS NOT NULL AND eliminado_en IS NULL`

Índice de expresión pendiente `unico_usuario_correo_vigente` · `lower(correo_electronico)` · `eliminado_en IS NULL`.

### identity.usuarios_roles · UsuarioRol

Entidad `src/identity/entities/usuarios-roles.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `usuarioId` → `usuario_id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | — / — / — | Coincide |
| `rolId` → `rol_id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | — / — / — | Coincide |
| `asignadoPor` → `asignado_por` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `asignadoEn` → `asignado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `revocadoEn` → `revocado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `usuario` · N:1 | `usuario_id` | `identity.usuarios` (`id`) | `CASCADE` / `NO ACTION` | `FK_2c14b9e5e2d0cf077fa4dd33502` · Coincide |
| `rol` · N:1 | `rol_id` | `identity.roles` (`id`) | `NO ACTION` / `NO ACTION` | `FK_425dfd009aeeee0c08af9a67a37` · Coincide |
| `asignadoPorRelacion` · N:1 | `asignado_por` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_56ea3e3c078d05e416e7b8f80e3` · Coincide |

### identity.verificaciones_identidad · VerificacionIdentidad

Entidad `src/identity/entities/verificaciones-identidad.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `usuarioId` → `usuario_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `tipoDocumento` → `tipo_documento` | `varchar(40)` · NOT NULL | `varchar(40)` · NOT NULL | `character varying(40)` · NOT NULL | — / — / — | Coincide |
| `ultimos4Documento` → `ultimos4_documento` | `varchar(4)` · NULL | `varchar(4)` · NULL | `character varying(4)` · NULL | — / — / — | Coincide |
| `documentoCifrado` → `documento_cifrado` | `bytea` · NULL | `bytea` · NULL | `bytea` · NULL | — / — / — | Coincide |
| `codigoPais` → `codigo_pais` | `char(2)` · NOT NULL | `char(2)` · NOT NULL | `character(2)` · NOT NULL | `'BO'` / `'BO'` / `'BO'::bpchar` | Coincide |
| `estado` → `estado` | `varchar(22)` · NOT NULL | `varchar(22)` · NOT NULL | `character varying(22)` · NOT NULL | `'pendiente'` / `'pendiente'` / `'pendiente'::character varying` | Coincide |
| `verificadoPor` → `verificado_por` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `verificadoEn` → `verificado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |
| `venceEn` → `vence_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |
| `notas` → `notas` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `usuario` · N:1 | `usuario_id` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_bcbe72b3d3c7d646c4c44c9f220` · Coincide |
| `verificadoPorRelacion` · N:1 | `verificado_por` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_3a1ac7f0b6509585314ee367dd9` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- CHECK `CHK_2413f27815210550bf37920c41` · `estado IN ('pendiente','aprobado','rechazado','vencido')`

### logistics.codigos_retiro · CodigoRetiro

Entidad `src/logistics/entities/codigos-retiro.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `entregaId` → `entrega_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `hashToken` → `hash_token` | `varchar(128)` · NOT NULL | `varchar(128)` · NOT NULL | `character varying(128)` · NOT NULL | — / — / — | Coincide |
| `venceEn` → `vence_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | — / — / — | Coincide |
| `canjeadoEn` → `canjeado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |
| `canjeadoPor` → `canjeado_por` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `entrega` · 1:1 | `entrega_id` | `logistics.entregas` (`id`) | `NO ACTION` / `NO ACTION` | `FK_c0d9cb464ec886bfaeccdcbe0b7` · Coincide |
| `canjeadoPorRelacion` · N:1 | `canjeado_por` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_b4caa2f9763403ec429744bf1b2` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `REL_c0d9cb464ec886bfaeccdcbe0b` · `entrega_id`
- UNIQUE `UQ_b3d21c6d6cd55a6d87be682afbb` · `hash_token`

### logistics.entregas · Entrega

Entidad `src/logistics/entities/entregas.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `asignacionOrdenId` → `asignacion_orden_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `modalidadEntrega` → `modalidad_entrega` | `varchar(18)` · NOT NULL | `varchar(18)` · NOT NULL | `character varying(18)` · NOT NULL | — / — / — | Coincide |
| `puntoRetiroId` → `punto_retiro_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `datosDestino` → `datos_destino` | `jsonb` · NULL | `jsonb` · NULL | `jsonb` · NULL | — / — / — | Coincide |
| `transportistaId` → `transportista_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `numeroSeguimiento` → `numero_seguimiento` | `varchar(140)` · NULL | `varchar(140)` · NULL | `character varying(140)` · NULL | — / — / — | Coincide |
| `costo` → `costo` | `numeric(24,7)` · NOT NULL | `numeric(24,7)` · NOT NULL | `numeric(24,7)` · NOT NULL | `0` / `0` / `0` | Coincide |
| `estado` → `estado` | `varchar(24)` · NOT NULL | `varchar(24)` · NOT NULL | `character varying(24)` · NOT NULL | `'pendiente'` / `'pendiente'` / `'pendiente'::character varying` | Coincide |
| `entregadoEn` → `entregado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |
| `nombreReceptor` → `nombre_receptor` | `varchar(180)` · NULL | `varchar(180)` · NULL | `character varying(180)` · NULL | — / — / — | Coincide |
| `urlConstancia` → `url_constancia` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `actualizadoEn` → `actualizado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `asignacionOrden` · 1:1 | `asignacion_orden_id` | `commerce.asignaciones_orden` (`id`) | `NO ACTION` / `NO ACTION` | `FK_4cb4ae2ce6dedccf2e11a1c5f63` · Coincide |
| `puntoRetiro` · N:1 | `punto_retiro_id` | `logistics.puntos_retiro` (`id`) | `NO ACTION` / `NO ACTION` | `FK_fa6b2c5991e2843660f4d73ef63` · Coincide |
| `transportista` · N:1 | `transportista_id` | `logistics.transportistas` (`id`) | `NO ACTION` / `NO ACTION` | `FK_374e725a8046ef2dd701d0dc5b4` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `REL_4cb4ae2ce6dedccf2e11a1c5f6` · `asignacion_orden_id`
- CHECK `CHK_4c2d2389a2b85b90b055c891c2` · `modalidad_entrega <> 'retiro' OR punto_retiro_id IS NOT NULL`
- CHECK `CHK_59bff5503f3a4226f5ae6f91bd` · `modalidad_entrega IN ('retiro','envio')`
- CHECK `CHK_b753a037bc95d3e7d784d13e21` · `costo >= 0`
- CHECK `CHK_69e31b700f63c4e31fb1168a10` · `estado IN ('pendiente','preparando','en_transito','disponible','entregado','fallido','devuelto')`

### logistics.eventos_entrega · EventoEntrega

Entidad `src/logistics/entities/eventos-entrega.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `entregaId` → `entrega_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `estado` → `estado` | `varchar(24)` · NOT NULL | `varchar(24)` · NOT NULL | `character varying(24)` · NOT NULL | — / — / — | Coincide |
| `usuarioActorId` → `usuario_actor_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `ubicacion` → `ubicacion` | `varchar(250)` · NULL | `varchar(250)` · NULL | `character varying(250)` · NULL | — / — / — | Coincide |
| `detalles` → `detalles` | `jsonb` · NOT NULL | `jsonb` · NOT NULL | `jsonb` · NOT NULL | `'{}'::jsonb` / `'{}'::jsonb` / `'{}'::jsonb` | Coincide |
| `ocurridoEn` → `ocurrido_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `entrega` · N:1 | `entrega_id` | `logistics.entregas` (`id`) | `NO ACTION` / `NO ACTION` | `FK_48bfba5eb832ad0f746c8fd55ac` · Coincide |
| `usuarioActor` · N:1 | `usuario_actor_id` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_9d663e77bab4939ed0c1d1e5831` · Coincide |

### logistics.puntos_retiro · PuntoRetiro

Entidad `src/logistics/entities/puntos-retiro.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `usuarioOperadorId` → `usuario_operador_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `ciudadId` → `ciudad_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `nombre` → `nombre` | `varchar(160)` · NOT NULL | `varchar(160)` · NOT NULL | `character varying(160)` · NOT NULL | — / — / — | Coincide |
| `direccion` → `direccion` | `varchar(300)` · NOT NULL | `varchar(300)` · NOT NULL | `character varying(300)` · NOT NULL | — / — / — | Coincide |
| `latitud` → `latitud` | `numeric(10,7)` · NULL | `numeric(10,7)` · NULL | `numeric(10,7)` · NULL | — / — / — | Coincide |
| `longitud` → `longitud` | `numeric(10,7)` · NULL | `numeric(10,7)` · NULL | `numeric(10,7)` · NULL | — / — / — | Coincide |
| `horario` → `horario` | `jsonb` · NOT NULL | `jsonb` · NOT NULL | `jsonb` · NOT NULL | `'{}'::jsonb` / `'{}'::jsonb` / `'{}'::jsonb` | Coincide |
| `estaActivo` → `esta_activo` | `boolean` · NOT NULL | `boolean` · NOT NULL | `boolean` · NOT NULL | `true` / `true` / `true` | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `usuarioOperador` · N:1 | `usuario_operador_id` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_be742fa971167317406ad049e86` · Coincide |
| `ciudad` · N:1 | `ciudad_id` | `geography.ciudades` (`id`) | `NO ACTION` / `NO ACTION` | `FK_73bc62e913a5f95a69abc00d7fa` · Coincide |

### logistics.transportistas · Transportista

Entidad `src/logistics/entities/transportistas.entity.ts`. Migración `CreateIndependentTaykaTables1795837747558`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `nombre` → `nombre` | `varchar(150)` · NOT NULL | `varchar(150)` · NOT NULL | `character varying(150)` · NOT NULL | — / — / — | Coincide |
| `telefonoContacto` → `telefono_contacto` | `varchar(40)` · NULL | `varchar(40)` · NULL | `character varying(40)` · NULL | — / — / — | Coincide |
| `plantillaUrlSeguimiento` → `plantilla_url_seguimiento` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |
| `estado` → `estado` | `varchar(20)` · NOT NULL | `varchar(20)` · NOT NULL | `character varying(20)` · NOT NULL | `'activo'` / `'activo'` / `'activo'::character varying` | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- CHECK `CHK_335825f504d72d1dc347e77cd7` · `estado IN ('activo','inactivo')`

### operations.claves_idempotencia · ClaveIdempotencia

Entidad `src/operations/entities/claves-idempotencia.entity.ts`. Migración `CreateIndependentTaykaTables1795837747558`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `espacioClaves` → `espacio_claves` | `varchar(80)` · NOT NULL | `varchar(80)` · NOT NULL | `character varying(80)` · NOT NULL | — / — / — | Coincide |
| `claveIdempotencia` → `clave_idempotencia` | `varchar(180)` · NOT NULL | `varchar(180)` · NOT NULL | `character varying(180)` · NOT NULL | — / — / — | Coincide |
| `hashSolicitud` → `hash_solicitud` | `varchar(128)` · NOT NULL | `varchar(128)` · NOT NULL | `character varying(128)` · NOT NULL | — / — / — | Coincide |
| `codigoRespuesta` → `codigo_respuesta` | `integer` · NULL | `integer` · NULL | `integer` · NULL | — / — / — | Coincide |
| `contenidoRespuesta` → `contenido_respuesta` | `jsonb` · NULL | `jsonb` · NULL | `jsonb` · NULL | — / — / — | Coincide |
| `venceEn` → `vence_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_f89f55e86eb10fc16a95eeca512` · `espacio_claves`, `clave_idempotencia`

### operations.eventos_salida · EventoSalida

Entidad `src/operations/entities/eventos-salida.entity.ts`. Migración `CreateIndependentTaykaTables1795837747558`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `tipoAgregado` → `tipo_agregado` | `varchar(80)` · NOT NULL | `varchar(80)` · NOT NULL | `character varying(80)` · NOT NULL | — / — / — | Coincide |
| `agregadoId` → `agregado_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `tipoEvento` → `tipo_evento` | `varchar(100)` · NOT NULL | `varchar(100)` · NOT NULL | `character varying(100)` · NOT NULL | — / — / — | Coincide |
| `datos` → `datos` | `jsonb` · NOT NULL | `jsonb` · NOT NULL | `jsonb` · NOT NULL | — / — / — | Coincide |
| `estado` → `estado` | `varchar(16)` · NOT NULL | `varchar(16)` · NOT NULL | `character varying(16)` · NOT NULL | `'pendiente'` / `'pendiente'` / `'pendiente'::character varying` | Coincide |
| `cantidadReintentos` → `cantidad_reintentos` | `integer` · NOT NULL | `integer` · NOT NULL | `integer` · NOT NULL | `0` / `0` / `0` | Coincide |
| `proximoReintentoEn` → `proximo_reintento_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `entregadoEn` → `entregado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- CHECK `CHK_653c47c01422a3f639fbed81e4` · `estado IN ('pendiente','procesando','enviado','fallido')`
- CHECK `CHK_6ae1097cf09bbe9a1ab15714b7` · `cantidad_reintentos >= 0`

### operations.registros_auditoria · RegistroAuditoria

Entidad `src/operations/entities/registros-auditoria.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `usuarioActorId` → `usuario_actor_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `accion` → `accion` | `varchar(100)` · NOT NULL | `varchar(100)` · NOT NULL | `character varying(100)` · NOT NULL | — / — / — | Coincide |
| `tipoEntidad` → `tipo_entidad` | `varchar(80)` · NOT NULL | `varchar(80)` · NOT NULL | `character varying(80)` · NOT NULL | — / — / — | Coincide |
| `entidadId` → `entidad_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `datosAnteriores` → `datos_anteriores` | `jsonb` · NULL | `jsonb` · NULL | `jsonb` · NULL | — / — / — | Coincide |
| `datosPosteriores` → `datos_posteriores` | `jsonb` · NULL | `jsonb` · NULL | `jsonb` · NULL | — / — / — | Coincide |
| `solicitudId` → `solicitud_id` | `varchar(140)` · NULL | `varchar(140)` · NULL | `character varying(140)` · NULL | — / — / — | Coincide |
| `direccionIp` → `direccion_ip` | `inet` · NULL | `inet` · NULL | `inet` · NULL | — / — / — | Coincide |
| `ocurridoEn` → `ocurrido_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `usuarioActor` · N:1 | `usuario_actor_id` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_56f6f42d7acc7a2bb2e71a49af6` · Coincide |

### operations.webhooks_entrantes · WebhookEntrante

Entidad `src/operations/entities/webhooks-entrantes.entity.ts`. Migración `CreateIndependentTaykaTables1795837747558`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `origen` → `origen` | `varchar(80)` · NOT NULL | `varchar(80)` · NOT NULL | `character varying(80)` · NOT NULL | — / — / — | Coincide |
| `eventoExternoId` → `evento_externo_id` | `varchar(180)` · NOT NULL | `varchar(180)` · NOT NULL | `character varying(180)` · NOT NULL | — / — / — | Coincide |
| `firmaVerificada` → `firma_verificada` | `boolean` · NOT NULL | `boolean` · NOT NULL | `boolean` · NOT NULL | `false` / `false` / `false` | Coincide |
| `datos` → `datos` | `jsonb` · NOT NULL | `jsonb` · NOT NULL | `jsonb` · NOT NULL | — / — / — | Coincide |
| `estadoProcesamiento` → `estado_procesamiento` | `varchar(18)` · NOT NULL | `varchar(18)` · NOT NULL | `character varying(18)` · NOT NULL | `'recibido'` / `'recibido'` / `'recibido'::character varying` | Coincide |
| `recibidoEn` → `recibido_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `procesadoEn` → `procesado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- UNIQUE `UQ_2ef4e35fb7caf9d7df8d3f1def4` · `origen`, `evento_externo_id`
- CHECK `CHK_cdfbdef7076d6fabe08acc0342` · `estado_procesamiento IN ('recibido','procesado','ignorado','fallido')`

### support.casos_soporte · CasoSoporte

Entidad `src/support/entities/casos-soporte.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `usuarioCreadorId` → `usuario_creador_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `usuarioAsignadoId` → `usuario_asignado_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `grupoId` → `grupo_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `obligacionPagoId` → `obligacion_pago_id` | `uuid` · NULL | `uuid` · NULL | `uuid` · NULL | — / — / — | Coincide |
| `asunto` → `asunto` | `varchar(220)` · NOT NULL | `varchar(220)` · NOT NULL | `character varying(220)` · NOT NULL | — / — / — | Coincide |
| `categoria` → `categoria` | `varchar(40)` · NOT NULL | `varchar(40)` · NOT NULL | `character varying(40)` · NOT NULL | — / — / — | Coincide |
| `prioridad` → `prioridad` | `varchar(12)` · NOT NULL | `varchar(12)` · NOT NULL | `character varying(12)` · NOT NULL | `'normal'` / `'normal'` / `'normal'::character varying` | Coincide |
| `estado` → `estado` | `varchar(20)` · NOT NULL | `varchar(20)` · NOT NULL | `character varying(20)` · NOT NULL | `'abierto'` / `'abierto'` / `'abierto'::character varying` | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `actualizadoEn` → `actualizado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `cerradoEn` → `cerrado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `usuarioCreador` · N:1 | `usuario_creador_id` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_ecd5e4060c4b3f816ce356c40e5` · Coincide |
| `usuarioAsignado` · N:1 | `usuario_asignado_id` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_9ecfe442e5247ee88d45c8c55fb` · Coincide |
| `grupo` · N:1 | `grupo_id` | `commerce.grupos_compra` (`id`) | `NO ACTION` / `NO ACTION` | `FK_3b98666dd35e3602ddaf9082635` · Coincide |
| `obligacionPago` · N:1 | `obligacion_pago_id` | `finance.obligaciones_pago` (`id`) | `NO ACTION` / `NO ACTION` | `FK_e8951c26e78a38144b79c3bc59b` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- CHECK `CHK_4575afc1791c9f0c42491097b3` · `prioridad IN ('baja','normal','alta','urgente')`
- CHECK `CHK_30eb26565c08a47954bc295b38` · `estado IN ('abierto','pendiente','resuelto','cerrado')`

### support.mensajes_soporte · MensajeSoporte

Entidad `src/support/entities/mensajes-soporte.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `casoSoporteId` → `caso_soporte_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `usuarioAutorId` → `usuario_autor_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `contenido` → `contenido` | `text` · NOT NULL | `text` · NOT NULL | `text` · NOT NULL | — / — / — | Coincide |
| `urlAdjunto` → `url_adjunto` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |
| `esNotaInterna` → `es_nota_interna` | `boolean` · NOT NULL | `boolean` · NOT NULL | `boolean` · NOT NULL | `false` / `false` / `false` | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `casoSoporte` · N:1 | `caso_soporte_id` | `support.casos_soporte` (`id`) | `NO ACTION` / `NO ACTION` | `FK_3e50e20aa8bb7af75712ba9e124` · Coincide |
| `usuarioAutor` · N:1 | `usuario_autor_id` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_c8b6ba05fbb6e45e5695f94aac0` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- CHECK `CHK_776311db9769fde329470e08c8` · `length(trim(contenido)) > 0`

### support.notificaciones · Notificacion

Entidad `src/support/entities/notificaciones.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `id` → `id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `gen_random_uuid()` / `gen_random_uuid()` / `gen_random_uuid()` | Coincide |
| `usuarioId` → `usuario_id` | `uuid` · NOT NULL | `uuid` · NOT NULL | `uuid` · NOT NULL | — / — / — | Coincide |
| `canal` → `canal` | `varchar(14)` · NOT NULL | `varchar(14)` · NOT NULL | `character varying(14)` · NOT NULL | — / — / — | Coincide |
| `titulo` → `titulo` | `varchar(200)` · NOT NULL | `varchar(200)` · NOT NULL | `character varying(200)` · NOT NULL | — / — / — | Coincide |
| `contenido` → `contenido` | `text` · NULL | `text` · NULL | `text` · NULL | — / — / — | Coincide |
| `datos` → `datos` | `jsonb` · NOT NULL | `jsonb` · NOT NULL | `jsonb` · NOT NULL | `'{}'::jsonb` / `'{}'::jsonb` / `'{}'::jsonb` | Coincide |
| `estado` → `estado` | `varchar(14)` · NOT NULL | `varchar(14)` · NOT NULL | `character varying(14)` · NOT NULL | `'en_cola'` / `'en_cola'` / `'en_cola'::character varying` | Coincide |
| `leidoEn` → `leido_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |
| `creadoEn` → `creado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |
| `enviadoEn` → `enviado_en` | `timestamptz` · NULL | `timestamptz` · NULL | `timestamp with time zone` · NULL | — / — / — | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `usuario` · N:1 | `usuario_id` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_2c6341d5bd206ff522b35aa6b69` · Coincide |

Restricciones comprobadas en la migración y en el catálogo.
- CHECK `CHK_10d248c1e9696909479d7fc59e` · `canal IN ('interna','correo','sms','push')`
- CHECK `CHK_12b5f72a425d8e39853a7a5961` · `estado IN ('en_cola','enviado','fallido','leido')`

### support.preferencias_notificacion · PreferenciaNotificacion

Entidad `src/support/entities/preferencias-notificacion.entity.ts`. Migración `CreateRemainingTaykaTables1795838346286`.

| Propiedad → columna física | Entidad | Migración | PostgreSQL | DEFAULT entidad / migración / PG | Resultado |
|---|---|---|---|---|---|
| `usuarioId` → `usuario_id` | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | `uuid` · NOT NULL · PK | — / — / — | Coincide |
| `tipoNotificacion` → `tipo_notificacion` | `varchar(70)` · NOT NULL · PK | `varchar(70)` · NOT NULL · PK | `character varying(70)` · NOT NULL · PK | — / — / — | Coincide |
| `permiteCorreo` → `permite_correo` | `boolean` · NOT NULL | `boolean` · NOT NULL | `boolean` · NOT NULL | `true` / `true` / `true` | Coincide |
| `permitePush` → `permite_push` | `boolean` · NOT NULL | `boolean` · NOT NULL | `boolean` · NOT NULL | `true` / `true` / `true` | Coincide |
| `permiteSms` → `permite_sms` | `boolean` · NOT NULL | `boolean` · NOT NULL | `boolean` · NOT NULL | `false` / `false` / `false` | Coincide |
| `actualizadoEn` → `actualizado_en` | `timestamptz` · NOT NULL | `timestamptz` · NOT NULL | `timestamp with time zone` · NOT NULL | `now()` / `now()` / `now()` | Coincide |

| Navegación · cardinalidad | Unión | Destino | ON DELETE / ON UPDATE | FK física |
|---|---|---|---|---|
| `usuario` · N:1 | `usuario_id` | `identity.usuarios` (`id`) | `NO ACTION` / `NO ACTION` | `FK_6a4f6bf860e7bd9bc313676b03d` · Coincide |
