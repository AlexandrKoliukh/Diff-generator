import _ from 'lodash';

const getKeys = (obj1, obj2) => _.union(_.keys(obj1), _.keys(obj2));

const types = {
  object: () => '[complex value]',
  number: (value) => value,
  boolean: (value) => value,
  string: (value) => (_.isNaN(+value) ? `'${value}'` : value),
};

const getTypeValue = (value) => types[typeof value](value);

const getStartString = (property, name) => `Property '${property}${name}' was`;

const plainView = (data) => {
  const iter = (diff, property = '') => getKeys(diff).reduce((acc, key) => {
    const startString = getStartString(property, key);

    switch (diff[key].state) {
      case 'parent': return [...acc, iter(diff[key].children, `${property}${key}.`)];
      case 'unchanged': return '';
      case 'added': return [...acc, `${startString} added with value: ${getTypeValue(diff[key].newValue)}`];
      case 'deleted': return [...acc, `${startString} removed`];
      case 'changed': return [...acc,
        `${startString} updated. From ${getTypeValue(diff[key].oldValue)} to ${getTypeValue(diff[key].newValue)}`];
      default: return new Error('Invalid state');
    }
  }, []);

  return iter(data);
};

export default (data) => _.flattenDeep(plainView(data)).join('\n');
