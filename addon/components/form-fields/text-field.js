import Ember from 'ember';
import layout from '../../templates/components/form-fields/text-field';

const {
  Component,
  set
} = Ember;

const TextFieldComponent = Component.extend({
  tagName: '',
  layout,

  control: 'one-way-text',

  update(object, propertyName, value) {
    set(object, propertyName, value);
  }
});

TextFieldComponent.reopenClass({
  positionalParams: ['propertyName']
});

export default TextFieldComponent;
