import fs from 'fs';
import gendiff from '../src';

const testsFilesPath = '__tests__/__fixtures__';

test('gendiff', () => {
  const resultData = fs.readFileSync(`${testsFilesPath}/result.txt`, 'utf8');
  const result = gendiff(`${testsFilesPath}/before.json`, `${testsFilesPath}/after.json`);
  expect(result).toEqual(resultData);
});