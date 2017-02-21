import Ember from 'ember';

const {
  A: emberArray,
  Helper: { helper },
  isArray
} = Ember;

export function contains([haystack, needle]) {
  if (isArray(haystack)) {
    return emberArray(haystack).includes(needle);
  } else {
    return haystack === needle;
  }
}

export default helper(contains);
