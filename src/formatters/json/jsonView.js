import _ from 'lodash';

const getKeys = (obj1, obj2) => _.union(_.keys(obj1), _.keys(obj2));

const getSpaces = (depth) => ' '.repeat(depth * 4 - 2);

const renderObject = (object, depth) => _.keys(object).map((key) => {
  if (typeof object[key] !== 'object') {
    return `{\n${getSpaces(depth + 1)} ${key}: ${object[key]}\n${getSpaces(depth)} }`;
  }
  const objects = renderObject(object[key], depth + 1);
  return [`${getSpaces(depth)}  ${key}: {`, objects, `${getSpaces(depth)} }`];
});

const isObject = (temp) => typeof temp === 'object';

const rendersByState = {
  added: (acc, depth, diff, key) => [...acc, `${getSpaces(depth)}+${key}: ${isObject(diff[key].newValue)
    ? renderObject(diff[key].newValue, depth) : diff[key].newValue}`],

  deleted: (acc, depth, diff, key) => [...acc, `${getSpaces(depth)}-${key}: ${isObject(diff[key].oldValue)
    ? renderObject(diff[key].oldValue, depth) : diff[key].oldValue}`],

  changed: (acc, depth, diff, key) => [...acc,
    `${getSpaces(depth)}-${key}: ${isObject(diff[key].oldValue)
      ? renderObject(diff[key].oldValue, depth) : diff[key].oldValue}`,
    `${getSpaces(depth)}+${key}: ${isObject(diff[key].newValue)
      ? renderObject(diff[key].newValue, depth) : diff[key].newValue}`,
  ],

  unchanged: (acc, depth, diff, key) => [...acc, ` ${getSpaces(depth)}${key}: ${diff[key].newValue}`],
};

const jsonView = (tree) => {
  const iter = (diff, depth = 1) => getKeys(diff).reduce((acc, key) => {
    switch (diff[key].state) {
      case 'parent': {
        return [
          ...acc,
          `${getSpaces(depth)} ${key}: {`, iter(diff[key].children, depth + 1), `${getSpaces(depth)} }`,
        ];
      }
      default: return rendersByState[diff[key].state](acc, depth, diff, key);
    }
  }, []);

  return `{\n${_.flattenDeep(iter(tree)).join('\n')}\n}`;
};

export default jsonView;
