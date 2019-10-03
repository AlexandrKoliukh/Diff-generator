import fs from 'fs';
import gendiff from '../src';

const pathToFiles = `${__dirname}/__fixtures__`;

describe('Json like format ', () => {
  const resultData = fs.readFileSync(`${pathToFiles}/resultJson.txt`, 'utf8');
  test.each(['json', 'yml', 'ini'])('%s', (ext) => {
    const result = gendiff(
      `${pathToFiles}/${ext}/before.${ext}`,
      `${pathToFiles}/${ext}/after.${ext}`,
      'json',
    );
    expect(result).toBe(resultData);
  });
});

describe('Plain like format ', () => {
  const resultData = fs.readFileSync(`${pathToFiles}/resultPlain.txt`, 'utf8');
  test.each(['json', 'yml', 'ini'])('%s', (ext) => {
    const result = gendiff(
      `${pathToFiles}/${ext}/before.${ext}`,
      `${pathToFiles}/${ext}/after.${ext}`,
      'plain',
    );
    expect(result).toBe(resultData);
  });
});
