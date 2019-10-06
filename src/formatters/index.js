import plainView from './plainView';
import treeView from './treeView';
import jsonView from './jsonView';

const formats = {
  plain: plainView,
  tree: treeView,
  json: jsonView,
};

export default (format) => formats[format];
