import fs from 'fs';
import gendiff from '../src';

test('json', () => {
  const testsFilesPath = `${__dirname}/__fixtures__/json`;
  const resultData = fs.readFileSync(`${testsFilesPath}/result.txt`, 'utf8');
  const result = gendiff(`${testsFilesPath}/before.json`, `${testsFilesPath}/after.json`);
  expect(result).toBe(resultData);
});

test('yml', () => {
  const testsFilesPath = `${__dirname}/__fixtures__/yml`;
  const resultData = fs.readFileSync(`${testsFilesPath}/result.txt`, 'utf8');
  const result = gendiff(`${testsFilesPath}/before.yml`, `${testsFilesPath}/after.yml`);
  expect(result).toBe(resultData);
});
