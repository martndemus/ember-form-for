import Ember from 'ember';
import config from '../config/environment';

const { merge, set } = Ember;

const DEFAULT_CONFIG = {
  buttonClasses: ['form-button'],
  fieldClasses: ['form-field'],
  fieldHasErrorClasses: ['form-field--has-errors'],
  errorClasses: ['form-field--errors'],
  hintClasses: ['form-field--hint'],
  inputClasses: ['form-field--control'],
  labelClasses: ['form-field--label'],
  resetClasses: ['form-button--reset'],
  submitClasses: ['form-button--submit']
};

export function initialize(application) {
  let formForConfig = merge(DEFAULT_CONFIG, config['ember-form-for']);
  let configService = application.lookup('service:ember-form-for/config');

  Object.keys(formForConfig).forEach((key) => {
    set(configService, key, formForConfig[key]);
  });
}

export default {
  name: 'form-for-initializer',
  initialize
};
