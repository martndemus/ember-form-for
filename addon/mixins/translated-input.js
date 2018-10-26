import Ember from 'ember';
import { humanize } from '../utils/strings';

const {
  String: { camelize },
  computed,
  isPresent,
  get
} = Ember;

export default Ember.Mixin.create({
  i18n: Ember.inject.service(),

  labelText: computed('propertyName', 'label', function() {
    let i18n = get(this, 'i18n');
    let text = get(this, 'label');
    let key  = get(this, 'labelI18nKey');

    if (isPresent(text)) {
      return text;
    } else if (isPresent(i18n) && i18n.exists(key)) {
      return i18n.t(key);
    } else {
      return humanize(get(this, 'propertyName'));
    }
  }),

  hintText: computed('propertyName', 'hint', function() {
    let i18n = get(this, 'i18n');
    let text = get(this, 'hint');
    let key  = get(this, 'hintI18nKey');

    if (isPresent(text)) {
      return text;
    } else if (isPresent(i18n) && i18n.exists(key)) {
      return i18n.t(key);
    }
  }),

  placeholderText: computed('propertyName', 'placeholder', function() {
    let i18n = get(this, 'i18n');
    let text = get(this, 'placeholder');
    let key  = get(this, 'placeholderI18nKey');

    if (isPresent(text)) {
      return text;
    } else if (isPresent(i18n) && i18n.exists(key)) {
      return i18n.t(key);
    }
  }),

  labelI18nKey: computed('config.i18nKeyPrefix', 'modelName', 'propertyName', function() {
    return this.generateI18nKey('attributes');
  }),

  hintI18nKey: computed('config.i18nKeyPrefix', 'modelName', 'propertyName', function() {
    return this.generateI18nKey('hints');
  }),

  placeholderI18nKey: computed('config.i18nKeyPrefix', 'modelName', 'propertyName', function() {
    return this.generateI18nKey('placeholders');
  }),

  generateI18nKey(type) {
    return [
      get(this, 'config.i18nKeyPrefix'),
      camelize(get(this, 'modelName') || ''),
      type,
      camelize(get(this, 'propertyName') || '')
    ].filter((x) => !!x)
     .join('.');
  },
});
