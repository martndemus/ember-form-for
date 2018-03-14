import Ember from 'ember';
import layout from '../../templates/components/form-fields/hidden-field';

const {
  Component,
  set
} = Ember;

const HiddenFieldComponent = Component.extend({
  tagName: '',
  layout,

  control: 'one-way-hidden',

  update(object, propertyName, value) {
    set(object, propertyName, value);
  }
});

HiddenFieldComponent.reopenClass({
  positionalParams: ['propertyName']
});

export default HiddenFieldComponent;
