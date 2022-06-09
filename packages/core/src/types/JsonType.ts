import { Type } from './Type';
import type { Platform } from '../platforms';
import type { EntityProperty } from '../typings';

export class JsonType extends Type<unknown, string | null> {

  convertToDatabaseValue(value: unknown, platform: Platform): string | null {
    if (platform.convertsJsonAutomatically(true) || value === null) {
      return value as string;
    }

    return JSON.stringify(value);
  }

  convertToJSValue(value: string | unknown, platform: Platform): unknown {
    if (!platform.convertsJsonAutomatically() && typeof value === 'string') {
      return JSON.parse(value);
    }

    return value;
  }

  getColumnType(prop: EntityProperty, platform: Platform): string {
    return platform.getJsonDeclarationSQL();
  }

}
