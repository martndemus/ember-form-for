import Ember from 'ember';
import layout from '../../../templates/components/form-fields/checkbox-group/option';

import TranslatedInput from '../../mixins/translated-input';

const {
  Component,
  String: { dasherize },
  computed,
  computed: { or },
  get,
  inject: { service },
  isPresent
} = Ember;

export default Component.extend(TranslatedInput, {
  tagName: '',
  layout,

  i18n: service(),
  config: service('ember-form-for/config'),

  modelName: or('object.modelName', 'object.constructor.modelName'),
});
