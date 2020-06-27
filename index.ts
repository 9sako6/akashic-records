import * as fs from 'fs';
import { Log } from './src/storage/Log';
import { Page } from './src/storage/Page';
// let buffer = new ArrayBuffer(16);
// let dv = new DataView(buffer);
// // dv.setUint8(0, 0);
// // dv.setUint8(1, 0);
// // dv.setUint8(2, 0);
// dv.setUint8(3, 4);
// fs.writeFileSync('./hoge', dv);

// console.log('1'.charCodeAt(0));
// console.log('2'.charCodeAt(0));
const log = new Log('INSERT', 1, 'Sushi', 16);
const log2 = new Log('INSERT', 1, 'Sute-ki', 16);
const log3 = new Log('INSERT', 2, '12345', 16);
const page = new Page();
console.log(log);
console.log(log.decode());
console.log(log3.decode());
page.insertLog(log);
page.insertLog(log2);
page.insertLog(log3);
page.encode();
console.log(page);
fs.writeFileSync('./fuga', page.buffer);
// console.log([...Array('hogehoge'.length).keys()])
