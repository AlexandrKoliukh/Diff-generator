import _ from 'lodash';

const getKeys = (obj1, obj2) => _.union(_.keys(obj1), _.keys(obj2));

const renderer = (diff) => {
  console.log(diff);
  const a = getKeys(diff).map((key) => {
    if (!diff[key].children) {

    }
  });
  console.log(a);
};

export default renderer;
