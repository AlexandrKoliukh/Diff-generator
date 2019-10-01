import fs from 'fs';
import gendiff from '../src';

const pathToFiles = `${__dirname}/__fixtures__`;
const resultData = fs.readFileSync(`${pathToFiles}/result.txt`, 'utf8');

test.each(['json', 'yml', 'ini'])('%s', (ext) => {
  const result = gendiff(`${pathToFiles}/${ext}/before.${ext}`, `${pathToFiles}/${ext}/after.${ext}`);
  expect(result).toBe(resultData);
});
