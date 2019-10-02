import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import parser from './parsers/parser';
import renderer from './render/renderer';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const gendiff = (firstConfig, secondConfig) => {
  const format = parsers[path.extname(firstConfig)];
  const data1 = format(fs.readFileSync(firstConfig, 'utf8'));
  const data2 = format(fs.readFileSync(secondConfig, 'utf8'));

  return renderer(parser(data1, data2));
};

export default gendiff;
