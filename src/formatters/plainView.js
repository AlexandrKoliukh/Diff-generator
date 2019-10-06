import { isNaN, flattenDeep } from 'lodash';

const types = {
  object: () => '[complex value]',
  number: (value) => value,
  boolean: (value) => value,
  string: (value) => (isNaN(+value) ? `'${value}'` : value),
};

const getTypeValue = (value) => types[typeof value](value);

const getStartString = (property, name) => `Property '${property}${name}' was`;

const plainView = (data) => {
  const iter = (diff, property = '') => diff.map((item) => {
    const {
      name, oldValue, newValue, state, children,
    } = item;
    const startString = getStartString(property, name);

    switch (state) {
      case 'parent': return iter(children, `${property}${name}.`);
      case 'unchanged': return null;
      case 'added': return `${startString} added with value: ${getTypeValue(newValue)}`;
      case 'deleted': return `${startString} removed`;
      case 'changed': {
        return `${startString} updated. From ${getTypeValue(oldValue)} to ${getTypeValue(newValue)}`;
      }
      default: return new Error('Invalid state');
    }
  }, []);

  return iter(data);
};

export default (data) => flattenDeep(plainView(data))
  .filter((i) => i)
  .join('\n');
