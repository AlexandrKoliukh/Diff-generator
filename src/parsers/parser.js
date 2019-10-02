import _ from 'lodash';

const getNode = (oldValue, newValue, state, children) => ({
  oldValue,
  newValue,
  state,
  children,
});

const parse = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));

  return keys.reduce((acc, key) => {
    if (_.has(data1, key) && _.has(data2, key)) {
      if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
        return {
          ...acc,
          [key]: getNode(null, null, null, parse(data1[key], data2[key])),
        };
      }
      if (data1[key] === data2[key]) {
        return { ...acc, [key]: getNode(null, data1[key], 'unchanged', null) };
      }

      return { ...acc, [key]: getNode(data1[key], data2[key], 'changed', null) };
    }

    if (_.has(data1, key)) {
      return { ...acc, [key]: getNode(data1[key], null, 'deleted', null) };
    }

    return { ...acc, [key]: getNode(null, data2[key], 'added', null) };
  }, {});
};

export default parse;
