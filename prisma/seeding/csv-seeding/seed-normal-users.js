import fs from 'node:fs';
import { csvToObj } from 'csv-to-js-parser'

const file = fs.readFileSync('prisma/seeding/seeding-files/normal.csv', 'utf8');
console.log(file)

let obj = JSON.stringify(csvToObj(file, ';'), null, 2);
console.log(obj)








