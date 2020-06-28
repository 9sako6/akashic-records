import * as fs from 'fs';
import { Log } from './src/storage/Log';
import { Page } from './src/storage/Page';

const log = new Log('INSERT', 2, '1すし');
console.log(log);
const page = new Page();
page.insertLog(log);
page.insertLog(log);
page.encode();
console.log(page);
fs.writeFileSync('./fuga', page.buffer);
