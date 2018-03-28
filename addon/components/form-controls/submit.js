import Ember from 'ember';
import Button from './button';
import layout from 'ember-form-for/templates/components/form-controls/submit';

const { computed: { alias }, PromiseProxyMixin, Object, RSVP, computed } = Ember;

const SubmitButton = Button.extend({
  layout,
  tagName: 'button',
  type: 'submit',

  activePromise: undefined,

  classNames: ['async-button'],
  attributeBindings: ['disabled', 'type'],

  submit: alias('action'),
  default: 'Submit',
  pending: 'Submitting...',

  NON_ATTRIBUTE_BOUND_PROPS: [
    'click'
  ],

  init() {
    this._super(...arguments);
  },

  click() {
    // PromiseProxyMixin allows us to use .isPending in the templates
    // RSVP.Promise is required to handle situation when submit function
    // returns non-promise.
    this.set('activePromise', Object.extend(PromiseProxyMixin).create({
      promise: new RSVP.Promise((resolve) => {
        resolve(this.get('submit')());
      })
    }));
    return false;
  },

  disabled: computed('activePromise.isPending', function() {
    if (this.get('activePromise.isPending') === true) {
      return true;
    } else {
      return false;
    }
  })
});

SubmitButton.reopenClass({
  positionalParams: ['default']
});

export default SubmitButton;
