import Ember from 'ember';
import { invokeAction } from 'ember-invoke-action';

const { set } = Ember;

const TextAreaComponent = Ember.Component.extend({
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
    'required:aria-required',
    'rows',
    'tabindex',
    'title',
    'value',
    'wrap'
  ],

  didReceiveAttrs() {
    this._super(...arguments);

    let required = this.getAttr('required');
    if (required !== true) {
      set(this, 'required', false);
    }
  },

  input() {
    invokeAction(this, 'update', this.readDOMAttr('value'));
  },

  change() {
    invokeAction(this, 'update', this.readDOMAttr('value'));
  }
});

TextAreaComponent.reopenClass({
  positionalParams: ['value']
});

export default TextAreaComponent;
