import fs from 'fs';
import _ from 'lodash';

const gendiff = (firstConfig, secondConfig) => {
  const data1 = JSON.parse(fs.readFileSync(firstConfig, 'utf8'));
  const data2 = JSON.parse(fs.readFileSync(secondConfig, 'utf8'));

  const keys = _.uniq([..._.keys(data1), ..._.keys(data2)]);

  const result = keys.reduce((acc, key) => {
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] === data2[key]) return [...acc, `  ${key}: ${data1[key]}`];
      return [...acc, `- ${key}: ${data1[key]}`, `+ ${key}: ${data2[key]}`];
    }
    if (_.has(data1, key)) return [...acc, `- ${key}: ${data1[key]}`];
    return [...acc, `+ ${key}: ${data2[key]}`];
  }, []);

  return `{\n${result.map((i) => `\t${i}`).join(',\n')}\n}`;
};

export default gendiff;
