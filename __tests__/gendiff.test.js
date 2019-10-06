import fs from 'fs';
import { capitalize } from 'lodash';
import gendiff from '../src';

const pathToFixtures = `${__dirname}/__fixtures__`;

const getPathsToFiles = (ext, format) => ({
  resultPath: `${pathToFixtures}/result${capitalize(format)}.txt`,
  afterPath: `${pathToFixtures}/${ext}/after.${ext}`,
  beforePath: `${pathToFixtures}/${ext}/before.${ext}`,
});

test.each(
  [
    ['tree', 'yml'], ['tree', 'ini'], ['tree', 'json'],
    ['json', 'yml'], ['json', 'ini'], ['json', 'json'],
    ['plain', 'yml'], ['plain', 'ini'], ['plain', 'json'],
  ],
)('Format %s, ext %s', (format, ext) => {
  const { afterPath, beforePath, resultPath } = getPathsToFiles(ext, format);
  const resultData = fs.readFileSync(resultPath, 'utf8');

  expect(gendiff(beforePath, afterPath, format)).toBe(resultData);
});
