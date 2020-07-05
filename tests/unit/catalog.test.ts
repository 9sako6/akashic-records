import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { Catalog } from '../../src/storage/Catalog.ts';

const testCatalogDir = './tests/fixtures';

Deno.test({
  name: 'should load a valid path catalog.json',
  fn(): void {
    const catalog = new Catalog();
    catalog.load(testCatalogDir);
    assertEquals(
      catalog.scheme,
      JSON.parse((new TextDecoder('utf-8')).decode(Deno.readFileSync(`${testCatalogDir}/${catalog.fileName}`))),
    );
  },
});

Deno.test({
  name: 'should fail to load an invalid path catalog.json',
  fn(): void {
    const catalog = new Catalog();
    assertEquals(catalog.load('./tests/fixtures_not_found'), false);
  },
});

Deno.test({
  name: 'should save a valid path catalog.json',
  fn(): void {
    const catalog = new Catalog();
    catalog.load(testCatalogDir);
    assertEquals(catalog.save(testCatalogDir), true);
  },
});

Deno.test({
  name: 'should fail to save an invalid path catalog.json',
  fn(): void {
    const catalog = new Catalog();
    assertEquals(catalog.save('./tests/fixtures_not_found'), false);
  },
});
