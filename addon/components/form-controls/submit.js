import Ember from 'ember';
import ButtonComponent from './button';
import { invokeAction } from 'ember-invoke-action';

const { get, set } = Ember;

export default ButtonComponent.extend({
  type: 'submit',

  init() {
    this._super(...arguments);

    let submitClasses = get(this, 'config.submitClasses');
    let classNames = get(this, 'classNames');
    set(this, 'classNames', (classNames || []).concat(submitClasses));
  },

  click(e) {
    e.preventDefault();
    invokeAction(this, 'submit', ...arguments);
  }
});
