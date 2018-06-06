import Ember from 'ember';
const { getOwner } = Ember;

export function initialize(app) {
  // HACK: This can be undefined in the FastBoot environment.
  const owner = getOwner(app) || app.__container__;
  if (!owner) {
    return;
  }

  const i18n = owner.lookup('service:i18n');
  if (!i18n) {
    return;
  }

  app.inject('component', 'i18n', 'service:i18n');
}

export default {
  name: 'ember-form-for-i18n',
  initialize
};
