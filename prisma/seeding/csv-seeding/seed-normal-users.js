import fs from 'node:fs';
import { csvToObj } from 'csv-to-js-parser'

const file = fs.readFileSync('prisma/seeding/seeding-files/normal.csv', 'utf8');

let obj = JSON.stringify(csvToObj(file, ';'), null, 2); // Convert the array of objects into JSON format
console.log(obj)

