# Matriz de APIs y Swagger de TAYKA

Las 38 consultas de dominio se probaron por HTTP con datos de prueba en PostgreSQL 17 aislado. La columna DTO indica la entrada validada y la proyección de salida. Los prefijos de ejemplo corresponden a `API_PREFIX=api/v1`. Las entidades indicadas son las principales de cada consulta.

| Módulo | Método | Endpoint | Servicio | DTO | Entidad | Seguridad | Swagger | Prueba | Estado |
|---|---|---|---|---|---|---|---|---|---|
| geography | GET | `/api/v1/geography/departamentos` | `GeographyService.departamentos` | `DepartamentoQuery` → `DepartamentoPublicoDto`[] | `geography.departamentos` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| geography | GET | `/api/v1/geography/departamentos/:id` | `GeographyService.departamento` | `id (UUID)` → `DepartamentoPublicoDto` | `geography.departamentos` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| geography | GET | `/api/v1/geography/departamentos/:id/ciudades` | `GeographyService.ciudadesDeDepartamento` | `id (UUID)` · `PageQuery` → `CiudadPublicoDto`[] | `geography.ciudades` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| geography | GET | `/api/v1/geography/ciudades` | `GeographyService.ciudades` | `CiudadQuery` → `CiudadPublicoDto`[] | `geography.ciudades` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| geography | GET | `/api/v1/geography/ciudades/:id` | `GeographyService.ciudad` | `id (UUID)` → `CiudadPublicoDto` | `geography.ciudades` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| catalog | GET | `/api/v1/catalog/categorias` | `CatalogService.categorias` | `PageQuery` → `CategoriaPublicoDto`[] | `catalog.categorias` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| catalog | GET | `/api/v1/catalog/categorias/:id` | `CatalogService.categoria` | `id (UUID)` → `CategoriaPublicoDto` | `catalog.categorias` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| catalog | GET | `/api/v1/catalog/marcas` | `CatalogService.marcas` | `PageQuery` → `MarcaPublicoDto`[] | `catalog.marcas` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| catalog | GET | `/api/v1/catalog/marcas/:id` | `CatalogService.marca` | `id (UUID)` → `MarcaPublicoDto` | `catalog.marcas` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| catalog | GET | `/api/v1/catalog/productos` | `CatalogService.productos` | `ProductoQuery` → `ProductoPublicoDto`[] | `catalog.productos` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| catalog | GET | `/api/v1/catalog/productos/:id` | `CatalogService.producto` | `id (UUID)` → `ProductoPublicoDto` | `catalog.productos` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| catalog | GET | `/api/v1/catalog/proveedores` | `CatalogService.proveedores` | `PageQuery` → `ProveedorPublicoDto`[] | `catalog.proveedores` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| catalog | GET | `/api/v1/catalog/proveedores/:id` | `CatalogService.proveedor` | `id (UUID)` → `ProveedorPublicoDto` | `catalog.proveedores` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| catalog | GET | `/api/v1/catalog/productos/:id/variantes` | `CatalogService.variantes` | `id (UUID)` · `PageQuery` → `VariantePublicoDto`[] | `catalog.variantes_producto` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| catalog | GET | `/api/v1/catalog/variantes/:id` | `CatalogService.variante` | `id (UUID)` → `VariantePublicoDto` | `catalog.variantes_producto` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| catalog | GET | `/api/v1/catalog/productos/:id/archivos` | `CatalogService.archivos` | `id (UUID)` · `PageQuery` → `ArchivoProductoPublicoDto`[] | `catalog.archivos_producto` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| commerce | GET | `/api/v1/commerce/ofertas` | `CommerceService.ofertas` | `OfertaQuery` → `OfertaPublicoDto`[] | `commerce.ofertas` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| commerce | GET | `/api/v1/commerce/ofertas/:id` | `CommerceService.oferta` | `id (UUID)` → `OfertaPublicoDto` | `commerce.ofertas` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| commerce | GET | `/api/v1/commerce/ofertas/:id/destinos` | `CommerceService.destinos` | `id (UUID)` · `PageQuery` → `DestinoOfertaPublicoDto`[] | `commerce.destinos_oferta` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| commerce | GET | `/api/v1/commerce/grupos` | `CommerceService.grupos` | `PageQuery` → `GrupoCompraPublicoDto`[] | `commerce.grupos_compra` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| commerce | GET | `/api/v1/commerce/grupos/:id` | `CommerceService.grupo` | `id (UUID)` → `GrupoCompraPublicoDto` | `commerce.grupos_compra` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| commerce | GET | `/api/v1/commerce/grupos/:id/progreso` | `CommerceService.progreso` | `id (UUID)` → `ProgresoGrupoPublicoDto` | `commerce.grupos_compra + participantes_grupo` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| commerce | GET | `/api/v1/commerce/grupos/:id/participantes` | `CommerceService.progreso` | `id (UUID)` → `ProgresoGrupoPublicoDto` | `commerce.grupos_compra + participantes_grupo` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| community | GET | `/api/v1/community/comentarios` | `CommunityService.comentarios` | `ComentarioQuery` → `ComentarioPublicoDto`[] | `community.comentarios` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| community | GET | `/api/v1/community/comentarios/:id` | `CommunityService.comentario` | `id (UUID)` → `ComentarioPublicoDto` | `community.comentarios` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| community | GET | `/api/v1/community/resenas` | `CommunityService.resenas` | `ResenaQuery` → `ResenaPublicoDto`[] | `community.resenas` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| community | GET | `/api/v1/community/resenas/:id` | `CommunityService.resena` | `id (UUID)` → `ResenaPublicoDto` | `community.resenas` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| logistics | GET | `/api/v1/logistics/puntos-retiro` | `LogisticsService.puntosRetiro` | `PuntoRetiroQuery` → `PuntoRetiroPublicoDto`[] | `logistics.puntos_retiro` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| logistics | GET | `/api/v1/logistics/puntos-retiro/:id` | `LogisticsService.puntoRetiro` | `id (UUID)` → `PuntoRetiroPublicoDto` | `logistics.puntos_retiro` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| logistics | GET | `/api/v1/logistics/transportistas` | `LogisticsService.transportistas` | `PageQuery` → `TransportistaPublicoDto`[] | `logistics.transportistas` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| logistics | GET | `/api/v1/logistics/transportistas/:id` | `LogisticsService.transportista` | `id (UUID)` → `TransportistaPublicoDto` | `logistics.transportistas` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| blockchain | GET | `/api/v1/blockchain/redes` | `BlockchainService.redes` | `PageQuery` → `RedPublicoDto`[] | `blockchain.redes` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| blockchain | GET | `/api/v1/blockchain/redes/:id` | `BlockchainService.red` | `id (UUID)` → `RedPublicoDto` | `blockchain.redes` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| blockchain | GET | `/api/v1/blockchain/activos` | `BlockchainService.activos` | `PageQuery` → `ActivoPublicoDto`[] | `blockchain.activos` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| blockchain | GET | `/api/v1/blockchain/activos/:id` | `BlockchainService.activo` | `id (UUID)` → `ActivoPublicoDto` | `blockchain.activos` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| blockchain | GET | `/api/v1/blockchain/despliegues` | `BlockchainService.despliegues` | `PageQuery` → `DesplieguePublicoDto`[] | `blockchain.despliegues_contrato` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| blockchain | GET | `/api/v1/blockchain/despliegues/:id` | `BlockchainService.despliegue` | `id (UUID)` → `DesplieguePublicoDto` | `blockchain.despliegues_contrato` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |
| finance | GET | `/api/v1/finance/medios-pago` | `FinanceService.mediosPago` | `PageQuery` → `MedioPagoPublicoDto`[] | `finance.medios_pago` | Público con filtros de visibilidad | Sí | HTTP y PG 17 aislado | Funcional y probado |

## Operaciones pendientes y servicios internos

Estas operaciones no figuran como rutas en Swagger. Las funciones de sesión, roles y permisos requieren una fuente confiable para identificar al actor y reglas verificadas para autorizarlo.

| Módulo | Funcionalidad | Estado | Dependencia concreta |
|---|---|---|---|
| geography | Crear, editar y eliminar departamentos o ciudades | Bloqueado por dependencia | Autenticación y permisos administrativos. El borrado también necesita una política explícita para referencias existentes. |
| identity | Sesiones, perfil, direcciones y consentimientos | Bloqueado por dependencia | Emisión y validación de sesiones, vínculo de la identidad autenticada con `Usuario.id` y estado de la cuenta. Las consultas propias ya existen como métodos internos. |
| identity | Altas y cambios de correo, administración de roles y permisos | Bloqueado por dependencia | Flujo de credenciales, protección contra enumeración, índice de correo pendiente y política de asignaciones privilegiadas. |
| catalog | Escrituras de proveedores, productos, categorías, marcas, variantes y archivos | Bloqueado por dependencia | Permisos administrativos o relación vigente del actor con el proveedor, según la operación. |
| catalog | Almacenes, existencias y movimientos | Bloqueado por dependencia | Propiedad del proveedor, comando de ajuste y política de concurrencia e inventario. |
| commerce | Cambios de ofertas y destinos, grupos, adhesión, lista de espera y órdenes | Bloqueado por dependencia | Autenticación, membresía, DTOs de comandos y políticas de cupo, precios fijados, cierre, idempotencia y reserva. |
| community | Crear o actualizar contenido, reacciones, favoritos y reportes | Bloqueado por dependencia | Autor autenticado, dueño del recurso, elegibilidad de reseñas y reglas de moderación. |
| finance | Consultas privadas, cobros, conciliación y reembolsos | Bloqueado por dependencia | Titularidad, contratos de pago y fuente de confirmación verificable. |
| logistics | Escritos de catálogo, entregas, seguimiento y canje | Bloqueado por dependencia | Actor autorizado, reglas de transición, propiedad de entrega y canje atómico de un solo uso. |
| blockchain | Administración, billeteras e invocaciones Stellar/Soroban | Bloqueado por dependencia | Roles verificados, prueba de posesión, infraestructura RPC real y política de firma. |
| support | Casos, mensajes, notificaciones y preferencias por HTTP | Bloqueado por dependencia | Sesión confiable y acceso por propietario o asignación. Las consultas internas de casos comprueban propiedad y excluyen notas internas. |
| operations | Auditoría | No requerido como API REST | Servicio interno. Se probó el rollback con la operación auditada en PostgreSQL. |
| operations | Idempotencia, outbox y webhooks | Bloqueado por dependencia | Contratos de consumidor y proveedor, firma verificable, reintentos y deduplicación. |
| operations | CRUD público de tablas internas | No requerido | Los datos se gestionan mediante servicios y procesos internos. |
