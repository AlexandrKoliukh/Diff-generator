import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import parser from './parsers/parser';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const gendiff = (firstConfig, secondConfig) => {
  const format = parsers[path.extname(firstConfig)];
  const data1 = format(fs.readFileSync(firstConfig, 'utf8'));
  const data2 = format(fs.readFileSync(secondConfig, 'utf8'));

  const result = parser(data1, data2);

  return `{\n${result.map((i) => `\t${i}`).join(',\n')}\n}`;
};

export default gendiff;
