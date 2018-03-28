import Ember from 'ember';
import DynamicAttributeBindings from 'ember-one-way-controls/-private/dynamic-attribute-bindings';
import layout from '../../templates/components/form-controls/button';

const { Component, get, set, inject: { service } } = Ember;

const Button = Component.extend(DynamicAttributeBindings, {
  layout,
  tagName: 'button',
  type: 'button',
  attributeBindings: ['type'],
  config: service('ember-form-for/config'),

  NON_ATTRIBUTE_BOUND_PROPS: [
    'click'
  ],

  init() {
    this._super(...arguments);

    let type = get(this, 'type');
    let buttonClasses = get(this, `config.${type}Classes`);
    // @todo: this is bad practice, it should be fixed
    let classNames = get(this, 'classNames');
    set(this, 'classNames', (classNames || []).concat(buttonClasses));
  }
});

Button.reopenClass({
  positionalParams: ['label']
});

export default Button;
