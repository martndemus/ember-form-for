export function initialize(app) {
  let i18n = app.__container__.lookup('service:i18n');
  if (i18n) {
    app.inject('component', 'i18n', 'service:i18n');
  }
}

export default {
  name: 'ember-form-for-i18n',
  initialize: initialize,
};

