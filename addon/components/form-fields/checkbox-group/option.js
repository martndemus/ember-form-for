import Ember from 'ember';
import FormField from '../../form-field';

import { humanize } from '../../../utils/strings';

const {
  String: { dasherize },
  computed,
  computed: { or },
  get,
  inject: { service },
  isPresent
} = Ember;

export default FormField.extend({
  tagName: 'li',

  fieldTemplate: 'form-fields/checkbox-group/option',

  control: 'one-way-checkbox',

  config: service('ember-form-for/config'),

  modelName: or('object.modelName', 'object.constructor.modelName'),

  labelText: computed('value', 'label', 'labelI18nKey', 'i18n.locale', function() {
    let i18n = get(this, 'i18n');
    let label = get(this, 'label');

    if (isPresent(label)) {
      return label;
    } else if (isPresent(i18n)) {
      return i18n.t(get(this, 'labelI18nKey'));
    } else {
      return get(this, 'label') || humanize(get(this, 'value'));
    }
  }),

  labelI18nKey: computed('config.i18nKeyPrefix', 'modelName', 'propertyName', 'value', function() {
    let value = get(this, 'value');

    if (isPresent(value)) {
      value = dasherize(value.toString());
    }

    return [
      get(this, 'config.i18nKeyPrefix'),
      dasherize(get(this, 'modelName') || ''),
      dasherize(get(this, 'propertyName') || ''),
      value
    ].filter((x) => !!x)
     .join('.');
  })
});
