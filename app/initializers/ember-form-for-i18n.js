import Ember from 'ember';

export function initialize(app) {
  let owner = app.__container__ || Ember.getOwner(app);
  let i18n = owner.lookup('service:i18n');
  if (i18n) {
    app.inject('component', 'i18n', 'service:i18n');
  }
}

export default {
  name: 'ember-form-for-i18n',
  initialize
};

