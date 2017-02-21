import Ember from 'ember';
import { humanize } from '../../utils/strings';

const {
  Helper: { helper }
} = Ember;

export function formForHumanize([string]) {
  return humanize(string);
}

export default helper(formForHumanize);
