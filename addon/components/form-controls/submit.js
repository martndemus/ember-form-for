import Ember from 'ember';
import AsyncButton from 'ember-async-button/components/async-button';
import layout from 'ember-async-button/templates/components/async-button';
import DynamicAttributeBindings from 'ember-one-way-controls/-private/dynamic-attribute-bindings';

const { get, set, inject: { service }, computed: { alias } } = Ember;

const SubmitButton = AsyncButton.extend(DynamicAttributeBindings, {
  layout,

  config: service('ember-form-for/config'),
  submit: alias('action'),
  default: 'Submit',
  pending: 'Submitting...',

  NON_ATTRIBUTE_BOUND_PROPS: [
    'click'
  ],

  init() {
    this._super(...arguments);

    let type = get(this, 'type');
    let buttonClasses = get(this, `config.${type}Classes`);
    let classNames = get(this, 'classNames');
    set(this, 'classNames', (classNames || []).concat(buttonClasses));
  }
});

SubmitButton.reopenClass({
  positionalParams: ['default']
});

export default SubmitButton;
