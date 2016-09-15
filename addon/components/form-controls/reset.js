import Ember from 'ember';
import ButtonComponent from './button';
import { invokeAction } from 'ember-invoke-action';

const { get, set } = Ember;

export default ButtonComponent.extend({
  type: 'reset',

  init() {
    this._super(...arguments);

    let resetClasses = get(this, 'config.resetClasses');
    let classNames = get(this, 'classNames');
    set(this, 'classNames', (classNames || []).concat(resetClasses));
  },

  click(e) {
    e.preventDefault();
    invokeAction(this, 'reset', ...arguments);
  }
});
