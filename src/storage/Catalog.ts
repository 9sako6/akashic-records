import * as fs from 'fs';
import * as path from 'path';
import { Schema } from './Schema';

export class Catalog {
  readonly fileName = 'catalog.json';
  scheme: Schema = {
    tables: [],
  };

  load(dirPath: string): this | false {
    const catalogPath = path.join(dirPath, this.fileName);
    try {
      const text = fs.readFileSync(catalogPath, { encoding: 'utf-8' });
      this.scheme = JSON.parse(text) as Schema;
    } catch {
      return false;
    }
    return this;
  }

  save(dirPath: string): boolean {
    const catalogPath = path.join(dirPath, this.fileName);
    try {
      fs.writeFileSync(catalogPath, JSON.stringify(this.scheme), { encoding: 'utf-8' });
    } catch {
      return false;
    }
    return true;
  }
}
