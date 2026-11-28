# Reporte final de APIs REST y Swagger de TAYKA

Verificación del 28 de noviembre de 2026 en America/La_Paz.

## Cobertura comprobada

**38 rutas GET públicas funcionales y probadas.** Se conservaron 37 contratos y se añadió `GET /api/v1/community/resenas/:id`. El nuevo detalle exige que la reseña esté visible y que su producto o proveedor tenga visibilidad pública. Un recurso oculto recibe `404`.

| Módulo | GET probados | Alcance |
|---|---:|---|
| geography | 5 | Departamentos, ciudades y filtrado por departamento. |
| catalog | 11 | Catálogo activo, proveedores verificados, variantes y archivos públicos. |
| commerce | 7 | Ofertas vigentes, destinos, grupos disponibles y agregados. |
| community | 4 | Comentarios y reseñas visibles con filtros por destino. |
| finance | 1 | Medios públicos habilitados para producción. |
| logistics | 4 | Puntos de retiro y transportistas activos. |
| blockchain | 6 | Metadatos de redes, activos y despliegues habilitados. |
| identity | 0 | Consultas del titular disponibles internamente. |
| support | 0 | Consultas propias de casos, mensajes y notificaciones disponibles internamente. |
| operations | 0 | Auditoría transaccional interna. |

Los siete controladores públicos describen parámetros, filtros, visibilidad y respuestas HTTP. Swagger responde en `/docs` y `/docs-json` cuando está habilitado fuera de producción. Las proyecciones de respuesta documentan UUID, campos nulables, enum, decimales como texto y fechas. Las pruebas compararon sus propiedades con las respuestas serializadas de las 38 rutas. Los listados conservan su formato de arreglo y su paginación original.

## Seguridad y dependencias

El repositorio carece de un emisor de sesiones o tokens de acceso configurado, un guard de autenticación y políticas vigentes de roles y permisos. Se retiró el esquema Bearer del documento público. Las pruebas verificaron que encabezados de identidad o rol arbitrarios no habilitan operaciones privadas. Las consultas internas de perfil excluyen el hash de contraseña. El servicio de soporte comprueba el dueño del caso y excluye notas internas de sus mensajes para el titular. Su integración HTTP continúa bloqueada mientras falte un principal autenticado.

El índice único de correo vigente sin distinguir mayúsculas sigue pendiente en la base auditada. Finanzas, inventario, logísticas de canje, Stellar/Soroban y procesos internos de mensajería quedan condicionados a los contratos y controles indicados en la matriz. No se publicaron rutas para esos procesos.

## Pruebas

| Comando o verificación | Resultado |
|---|---|
| `pnpm build` | Compilación correcta con NestJS y TypeScript. |
| `pnpm test --runInBand` | 2 pruebas unitarias aprobadas. |
| `pnpm test:e2e --runInBand` con PostgreSQL 17 local aislado | 87 pruebas aprobadas en 2 suites. Se probaron los contratos Swagger, todas las rutas públicas con datos de prueba, validación, visibilidad, privacidad interna y rollback de auditoría. |
| Migraciones en PostgreSQL aislado | Las tres migraciones se aplicaron desde cero. Una segunda llamada a `runMigrations` devolvió un arreglo vacío. |
| Comprobación de migraciones existentes | Solo se ejecutaron en el clúster temporal de pruebas. El clúster se detuvo y eliminó al terminar. |

Para repetir la integración, usa una base **vacía y descartable** en un PostgreSQL de loopback con nombre `tayka_api_test_*`. Configura `NODE_ENV=test`, `DATABASE_ENABLED=true`, las variables `DB_*` de esa base y `TAYKA_API_TEST_DATABASE` con el mismo nombre. La suite rechaza una base con el esquema geography o con historial de migraciones. Sin ese marcador, Jest ejecuta la suite OpenAPI y omite las pruebas PostgreSQL.
