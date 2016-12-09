import Ember from 'ember';
import layout from '../templates/components/form-field';

import { humanize } from '../utils/strings';

const {
  assert,
  computed,
  computed: { notEmpty, or, reads },
  get,
  getWithDefault,
  guidFor,
  inject: { service },
  isPresent,
  mixin,
  observer,
  set,
  Component,
  String: { dasherize },
  isEmpty
} = Ember;

const FormFieldComponent = Component.extend({
  layout,

  i18n: service(),
  config: service('ember-form-for/config'),

  _defaultErrorsProperty: 'errors',
  errorsProperty: or('config.errorsProperty', '_defaultErrorsProperty'),

  errorsPath(propertyName) {
    let errorsPath = this.get('config.errorsPath');
    let errorsProperty = this.get('errorsProperty');

    if (!isPresent(errorsPath)) {
      errorsPath = `${errorsProperty}.PROPERTY_NAME`;
    }

    return errorsPath.replace('PROPERTY_NAME', propertyName);
  },

  classNameBindings: [],

  concatenatedProperties: [
    'inputClasses',
    'labelClasses',
    'hintClasses',
    'errorClasses'
  ],

  control: 'one-way-input',

  init() {
    this._super(...arguments);

    let fieldClasses = get(this, 'config.fieldClasses');

    this.classNames = (this.classNames.slice() || []).concat(fieldClasses);

    this.classNameBindings = this.classNameBindings.slice();
    this.classNameBindings.push(`hasErrors:${get(this, 'config.fieldHasErrorClasses')}`);

    [
      'inputClasses',
      'labelClasses',
      'hintClasses',
      'errorClasses'
    ].forEach((type) => {
      set(this, type, (get(this, type) || []).concat(get(this, `config.${type}`)));
    });

    this.propertyNameDidChange();
  },

  didReceiveAttrs() {
    this._super(...arguments);

    assert(`{{form-field}} requires an object property to be passed in`,
           get(this, 'object') != null);

    assert(`{{form-field}} requires the propertyName property to be set`,
           typeof get(this, 'propertyName') === 'string');

    set(this, 'modelName', getWithDefault(this, 'object.modelName', get(this, 'object.constructor.modelName')));
  },

  propertyNameDidChange: observer('propertyName', 'errorsProperty', function() {
    let propertyName = get(this, 'propertyName');
    let errorsPath = `object.${this.errorsPath(propertyName)}`;

    mixin(this, {
      rawValue: reads(`object.${propertyName}`),
      errors: reads(errorsPath),
      hasErrors: notEmpty(errorsPath)
    });
  }),

  update(object, propertyName, value) {
    set(object, propertyName, value);
  },

  labelText: computed('propertyName', 'label', function() {
    let i18n = get(this, 'i18n');
    let label = get(this, 'label');

    if (isPresent(label)) {
      return label;
    } else if (isPresent(i18n)) {
      return i18n.t(get(this, 'labelI18nKey'));
    } else {
      return humanize(get(this, 'propertyName'));
    }
  }),

  labelI18nKey: computed('config.i18nKeyPrefix', 'modelName', 'propertyName', function() {
    return [
      get(this, 'config.i18nKeyPrefix'),
      dasherize(get(this, 'modelName') || ''),
      dasherize(get(this, 'propertyName') || '')
    ].filter((x) => !!x)
     .join('.');
  }),

  fieldId: computed('object', 'form', 'propertyName', function() {
    let baseId = get(this, 'form') || get(this, 'elementId');
    return `${baseId}_${get(this, 'propertyName')}`;
  }),

  fieldName: computed('object', 'modelName', 'propertyName', function() {
    return `${this._nameForObject()}[${get(this, 'propertyName')}]`;
  }),

  describedByValue: computed('hint', 'errors.[]', 'fieldId', function() {
    let ids = [];
    let hint = get(this, 'hint');
    let errors = get(this, 'errors');
    let fieldId = get(this, 'fieldId');

    if (isPresent(hint)) {
      ids.push(`${fieldId}_hint`);
    }

    if (isPresent(errors)) {
      errors.forEach((_, index) => {
        ids.push(`${fieldId}_error-${index}`);
      });
    }

    return isEmpty(ids) ? null : ids.join(' ');
  }),

  _nameForObject() {
    return get(this, 'modelName') ||
           guidFor(get(this, 'object'));
  },

  value: computed('rawValue', function() {
    let serializeValue = getWithDefault(this, 'serializeValue', (value) => value);
    return serializeValue(get(this, 'rawValue'));
  }),

  actions: {
    processUpdate(object, propertyName, value) {
      let rawValue = get(this, 'rawValue');
      let deserializeValue = getWithDefault(this, 'deserializeValue', (value) => value);
      get(this, 'update')(object, propertyName, deserializeValue(value, rawValue));
    }
  }
});

FormFieldComponent.reopenClass({
  positionalParams: ['propertyName']
});

export default FormFieldComponent;
