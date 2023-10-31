import { EntitySchema } from 'typeorm';
import { SetMetadata } from '@nestjs/common';

export const TYPEORM_ENTITY_REPOSITORY = 'TYPEORM_ENTITY_REPOSITORY';

export function TypeOrmEntityRepository(
  // eslint-disable-next-line @typescript-eslint/ban-types
  entity: EntitySchema<any> | Function
): ClassDecorator {
  return SetMetadata(TYPEORM_ENTITY_REPOSITORY, entity);
}
