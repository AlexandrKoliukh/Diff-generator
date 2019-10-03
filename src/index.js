import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import parser from './parsers/parser';
import { jsonView, plainView } from './formatters';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const formats = {
  plain: plainView,
  json: jsonView,
};

const gendiff = (firstConfig, secondConfig, format = 'json') => {
  console.log(format);

  const extParser = parsers[path.extname(firstConfig)];
  const data1 = extParser(fs.readFileSync(firstConfig, 'utf8'));
  const data2 = extParser(fs.readFileSync(secondConfig, 'utf8'));

  return formats[format](parser(data1, data2));
};

export default gendiff;
