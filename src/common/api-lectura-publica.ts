import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiServiceUnavailableResponse,
} from '@nestjs/swagger';
import { ErrorHttpDto } from './dtos/public-api-responses.dto';

export function ApiLecturaPublica(
  model: Type<unknown>,
  summary: string,
  rule: string,
  options: { list?: boolean; idDescription?: string } = {},
): MethodDecorator {
  const { list = false, idDescription } = options;
  const descriptions = ['Acceso público de solo lectura.', rule];
  if (list)
    descriptions.push('Devuelve un arreglo paginado sin total de registros.');

  return applyDecorators(
    ApiOperation({ summary, description: descriptions.join(' ') }),
    ApiOkResponse({
      type: model,
      isArray: list,
      description: list ? 'Página de resultados' : 'Recurso visible',
    }),
    ApiBadRequestResponse({
      type: ErrorHttpDto,
      description: 'UUID o parámetros de consulta inválidos.',
    }),
    ApiServiceUnavailableResponse({
      type: ErrorHttpDto,
      description: 'Base de datos no disponible.',
    }),
    ApiInternalServerErrorResponse({
      type: ErrorHttpDto,
      description: 'Fallo interno al consultar el recurso.',
    }),
    ...(list
      ? [
          ApiQuery({
            name: 'page',
            required: false,
            description: 'Número de página desde 1.',
            schema: { type: 'integer', minimum: 1, maximum: 10000, default: 1 },
          }),
          ApiQuery({
            name: 'limit',
            required: false,
            description: 'Máximo de resultados en la página.',
            schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
          }),
        ]
      : []),
    ...(idDescription
      ? [
          ApiParam({
            name: 'id',
            description: idDescription,
            schema: { type: 'string', format: 'uuid' },
          }),
          ApiNotFoundResponse({
            type: ErrorHttpDto,
            description:
              'Recurso inexistente o fuera de la visibilidad pública.',
          }),
        ]
      : []),
  );
}
