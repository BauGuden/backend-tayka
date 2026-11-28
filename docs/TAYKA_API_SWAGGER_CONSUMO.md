# Consumo de la API pública de TAYKA

Con el servidor local activo y `SWAGGER_ENABLED=true`, abre Swagger UI en `http://localhost:3000/docs` o descarga la especificación en `http://localhost:3000/docs-json`. Las rutas de negocio usan el valor de `API_PREFIX`, que por defecto es `api/v1`. En producción la aplicación deja Swagger desactivado.

```powershell
pnpm start:dev

$api = 'http://localhost:3000/api/v1'
Invoke-RestMethod "$api/geography/departamentos?page=1&limit=20"
Invoke-RestMethod "$api/catalog/productos?nombre=arroz&limit=10"
```

## Parámetros y respuestas

- Los listados devuelven un arreglo JSON. La paginación empieza en `page=1` y usa `limit=20` por defecto. Se aceptan páginas hasta `10000` y límites hasta `100`. El JSON no incluye un campo de total ni un encabezado de cantidad total.
- Los parámetros de ruta `id` y los filtros por identificador son UUID. En comentarios se exige exactamente uno de `productoId`, `ofertaId` o `grupoId`. En reseñas se exige exactamente uno de `productoId` o `proveedorId`. Ese requisito aplica al listado.
- Los filtros de texto buscan una parte literal del nombre sin distinguir mayúsculas. Los nombres de parámetros desconocidos se rechazan en las consultas con DTO.
- Los precios, las cantidades y las coordenadas con precisión decimal se devuelven como texto. Para cálculos conserva esa precisión. Los totales de compradores también son texto. Las fechas de los contratos públicos se serializan como ISO 8601. Un campo nulable aparece como `null` cuando carece de valor.
- Las rutas de detalle devuelven un objeto. Un ejemplo de departamento es `{"id":"550e8400-e29b-41d4-a716-446655440000","nombre":"La Paz","abreviatura":"LP"}`. Los ejemplos no identifican registros reales del destino.

```powershell
$producto = '550e8400-e29b-41d4-a716-446655440000'
Invoke-RestMethod "$api/community/resenas?productoId=$producto"
```

| Estado | Cómo interpretarlo |
|---:|---|
| 200 | Consulta correcta. Un listado vacío devuelve `[]`. |
| 400 | UUID, paginación o filtro inválido. `message` puede ser texto o arreglo de mensajes. |
| 404 | El recurso solicitado no existe o queda fuera de la visibilidad pública. |
| 500 | Error interno del servicio. El contrato no incluye detalles de PostgreSQL. |
| 503 | PostgreSQL no está disponible, la conexión está desactivada o falta una parte del esquema. |

Las consultas publicadas admiten acceso anónimo. Los recursos privados y las escrituras requieren infraestructura de autenticación y autorización antes de publicarse. Las operaciones de participación expuestas en Commerce son agregados y omiten identidades individuales.
