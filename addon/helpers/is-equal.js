import Ember from 'ember';
import isEqual from '../utils/is-equal';

const {
  Helper: { helper }
} = Ember;

export default helper(([a, b]) => isEqual(a, b));
