import Ember from 'ember';
import layout from '../../templates/components/form-fields/radio-field';

import TranslatedInput from '../../mixins/translated-input';

const {
  Component,
  String: { dasherize },
  computed,
  computed: { or },
  get,
  inject: { service },
  isPresent,
  set
} = Ember;

const RadioFieldComponent = Component.extend(TranslatedInput, {
  tagName: '',
  layout,

  control: 'one-way-radio',

  i18n: service(),
  config: service('ember-form-for/config'),

  modelName: or('object.modelName', 'object.constructor.modelName'),

  update(object, propertyName, value) {
    set(object, propertyName, value);
  },
});

RadioFieldComponent.reopenClass({
  positionalParams: ['propertyName', 'value']
});

export default RadioFieldComponent;
