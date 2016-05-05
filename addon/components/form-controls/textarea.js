import Ember from 'ember';
import { invokeAction } from 'ember-invoke-action';

const { set } = Ember;

export default Ember.Component.extend({
  tagName: 'textarea',

  attributeBindings: [
    'accesskey',
    'autocomplete',
    'autofocus',
    'cols',
    'describedBy:aria-describedby',
    'dir',
    'disabled',
    'form',
    'hidden',
    'invalid:aria-invalid',
    'lang',
    'maxlength',
    'name',
    'placeholder',
    'readonly',
    'required',
    'aria-required',
    'rows',
    'tabindex',
    'title',
    'value',
    'wrap'
  ],

  didReceiveAttrs() {
    this._super(...arguments);

    let required = this.get('required');
    set(this, 'aria-required', !!required);
  },

  input() {
    invokeAction(this, 'update', this.readDOMAttr('value'));
  },

  change() {
    invokeAction(this, 'update', this.readDOMAttr('value'));
  }
});
