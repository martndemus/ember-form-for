import Ember from 'ember';
import layout from '../../templates/components/form-fields/radio-group';

const {
  Component,
  set
} = Ember;

const RadioGroupComponent = Component.extend({
  tagName: '',
  layout,

  update() {
    set(...arguments);
  }
});

RadioGroupComponent.reopenClass({
  positionalParams: ['propertyName']
});

export default RadioGroupComponent;
