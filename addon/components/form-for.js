import Ember from 'ember';
import layout from '../templates/components/form-for';

const {
  Component,
  get,
  inject: { service },
  isPresent,
  run: { schedule },
  set
} = Ember;

const FormForComponent = Component.extend({
  layout,

  tagName: 'form',

  config: service('ember-form-for/config'),

  attributeBindings: ['tabindex', 'form:id'],

  init() {
    this._super(...arguments);

    let formClasses = get(this, 'config.formClasses');
    let classNames = get(this, 'classNames');
    set(this, 'classNames', (classNames || []).concat(formClasses));

    this.propertyDidChange();
  },

  submit: (object) => object.save(),
  reset: (object) => object.rollback(),

  update(object, propertyName, value) {
    set(object, propertyName, value);
  },

  handleErrors(object) {
    let errors = get(object, 'errors');

    if (errors) {
      for (let propertyName in errors) {
        if (isPresent(get(errors, propertyName))) {
          set(this, 'tabindex', -1);
          schedule('afterRender', () => {
            if (this.isDestroyed || this.isDestroying) {
              return;
            }
            this.$().focus();
          });
          break;
        }
      }
    }
  },

  actions: {
    submit(object) {
      let promise = get(this, 'submit')(object);

      set(this, 'tabindex', undefined);

      if (promise && typeof promise.finally === 'function') {
        promise.finally(() => this.handleErrors(object));
      } else {
        this.handleErrors(object);
      }

      return promise;
    }
  }
});

FormForComponent.reopenClass({
  positionalParams: ['object']
});

export default FormForComponent;
