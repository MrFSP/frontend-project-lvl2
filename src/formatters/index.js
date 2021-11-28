import renderStylish from './stylish.js';
import renderPlain from './plain.js';

const formatter = {
  stylish: renderStylish,
  plain: renderPlain,
};

export default (format) => formatter[format];
