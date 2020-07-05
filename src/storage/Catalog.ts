import * as path from 'https://deno.land/std/path/mod.ts';
import { Schema } from './Schema.ts';

export class Catalog {
  readonly fileName = 'catalog.json';
  private decoder = new TextDecoder('utf-8');
  private encoder = new TextEncoder();
  scheme: Schema = {
    tables: [],
  };

  load(dirPath: string): this | false {
    const catalogPath = path.join(dirPath, this.fileName);
    try {
      const text = this.decoder.decode(Deno.readFileSync(catalogPath));
      this.scheme = JSON.parse(text) as Schema;
    } catch {
      return false;
    }
    return this;
  }

  save(dirPath: string): boolean {
    const catalogPath = path.join(dirPath, this.fileName);
    try {
      Deno.writeFileSync(catalogPath, this.encoder.encode(JSON.stringify(this.scheme)));
    } catch {
      return false;
    }
    return true;
  }
}
