import _ from 'lodash';

export default (data1, data2) => {
  const keys = _.uniq([..._.keys(data1), ..._.keys(data2)]);

  return keys.reduce((acc, key) => {
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] === data2[key]) return [...acc, `  ${key}: ${data1[key]}`];
      return [...acc, `- ${key}: ${data1[key]}`, `+ ${key}: ${data2[key]}`];
    }
    if (_.has(data1, key)) return [...acc, `- ${key}: ${data1[key]}`];
    return [...acc, `+ ${key}: ${data2[key]}`];
  }, []);
};
