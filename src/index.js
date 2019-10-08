import fs from 'fs';
import path from 'path';
import treeBuilder from './treeBuilder';
import formatBuilder from './formatters';
import parse from './parser';

const gendiff = (firstConfig, secondConfig, format = 'tree') => {
  const data1 = fs.readFileSync(firstConfig, 'utf8');
  const data2 = fs.readFileSync(secondConfig, 'utf8');
  const ext1 = path.extname(firstConfig);
  const ext2 = path.extname(secondConfig);

  const parsedData1 = parse(ext1, data1);
  const parsedData2 = parse(ext2, data2);

  const ast = treeBuilder(parsedData1, parsedData2);

  return formatBuilder(format)(ast);
};

export default gendiff;
