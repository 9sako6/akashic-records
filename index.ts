import { Log } from './src/storage/Log.ts';
import { Page } from './src/storage/Page.ts';

const log = new Log('INSERT', 2, '1すし');
console.log(log);
const page = new Page();
page.insertLog(log);
page.insertLog(log);
page.encode();
console.log(page);
Deno.writeFileSync('./fuga', page.buffer);
