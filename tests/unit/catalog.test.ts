import * as fs from 'fs';
import { Catalog } from '@/src/storage/Catalog';

describe('read/write', () => {
  const testCatalogDir = './tests/fixtures';
  test('should load a valid path catalog.json', () => {
    const catalog = new Catalog();
    catalog.load(testCatalogDir);
    expect(catalog.scheme).toEqual(
      JSON.parse(
        fs.readFileSync(`${testCatalogDir}/${catalog.fileName}`, { encoding: 'utf-8' }),
      ),
    );
  });

  test('should fail to load an invalid path catalog.json', () => {
    const catalog = new Catalog();
    expect(catalog.load('./tests/fixtures_not_found')).toBe(false);
  });

  test('should save a valid path catalog.json', () => {
    const catalog = new Catalog();
    catalog.load(testCatalogDir);
    expect(catalog.save(testCatalogDir)).toBe(true);
  });

  test('should fail to save an invalid path catalog.json', () => {
    const catalog = new Catalog();
    expect(catalog.save('./tests/fixtures_not_found')).toBe(false);
  });
});
