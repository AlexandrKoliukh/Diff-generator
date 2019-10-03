import { union, keys as objKeys, has } from 'lodash';

const getNode = (name, oldValue, newValue, state, children) => ({
  name,
  oldValue,
  newValue,
  state,
  children,
});

const parse = (data1, data2) => {
  const keys = union(objKeys(data1), objKeys(data2));

  return keys.reduce((acc, key) => {
    if (has(data1, key) && has(data2, key)) {
      if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
        return [
          ...acc,
          getNode(key, null, null, 'parent', parse(data1[key], data2[key])),
        ];
      }
      if (data1[key] === data2[key]) {
        return [...acc, getNode(key, null, data1[key], 'unchanged', null)];
      }

      return [...acc, getNode(key, data1[key], data2[key], 'changed', null)];
    }

    if (has(data1, key)) {
      return [...acc, getNode(key, data1[key], null, 'deleted', null)];
    }

    return [...acc, getNode(key, null, data2[key], 'added', null)];
  }, []);
};

export default parse;
