import _ from 'lodash';

const getSpaces = (depth) => ' '.repeat(depth * 4 - 2);

const renderObject = (object, depth) => _.keys(object).map((key) => {
  if (typeof object[key] !== 'object') {
    return `{\n${getSpaces(depth + 1)} ${key}: ${object[key]}\n${getSpaces(depth)} }`;
  }
  const objects = renderObject(object[key], depth + 1);
  return [`${getSpaces(depth)}  ${key}: {`, objects, `${getSpaces(depth)} }`];
});

const isObject = (temp) => typeof temp === 'object';

const treeView = (tree) => {
  const iter = (diff, depth = 1) => diff.map((item) => {
    const {
      name, oldValue, newValue, state, children,
    } = item;

    switch (state) {
      case 'parent': {
        return [`${getSpaces(depth)} ${name}: {`, iter(children, depth + 1), `${getSpaces(depth)} }`];
      }
      case 'added': {
        return `${getSpaces(depth)}+${name}: ${isObject(newValue) ? renderObject(newValue, depth) : newValue}`;
      }
      case 'deleted': {
        return `${getSpaces(depth)}-${name}: ${isObject(oldValue) ? renderObject(oldValue, depth) : oldValue}`;
      }
      case 'changed': {
        return `${getSpaces(depth)}-${name}: ${isObject(oldValue) ? renderObject(oldValue, depth) : oldValue}
      +${name}: ${isObject(newValue) ? renderObject(newValue, depth) : newValue}`;
      }
      case 'unchanged': {
        return ` ${getSpaces(depth)}${name}: ${newValue}`;
      }
      default:
        return new Error('invalid state');
    }
  }, []);

  return `{\n${_.flattenDeep(iter(tree)).join('\n')}\n}`;
};

export default treeView;
