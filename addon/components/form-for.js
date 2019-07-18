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

const isChangeset = function(object) {
  return get(object, '_content') !== undefined;
};

const FormForComponent = Component.extend({
  layout,

  tagName: 'form',

  config: service('ember-form-for/config'),

  attributeBindings: ['tabindex', 'form:id', 'novalidate'],
  novalidate: false,

  init() {
    this._super(...arguments);

    let formClasses = get(this, 'config.formClasses');
    let classNames = get(this, 'classNames');
    set(this, 'classNames', (classNames || []).concat(formClasses));

    this.notifyPropertyChange();
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
            this.element.focus();
          });
          break;
        }
      }
    }
  },

  __isFormValid(object) {
    let promise = new Promise((resolve) => {

      let _isChangeset = isChangeset(object);

      if (_isChangeset) {
        object.validate()
          .then(() => resolve(get(object, 'isValid')));
      }
      return resolve(this.element.checkValidity());
    });
    return promise;
  },

  __submit(object) {
    let promise = get(this, 'submit')(object);

    set(this, 'tabindex', undefined);

    if (promise && typeof promise.finally === 'function') {
      promise.finally(() => {
        if (this.isDestroyed || this.isDestroying) {
          return;
        }
        this.handleErrors(object);
      });
    } else {
      this.handleErrors(object);
    }

    return promise;
  },

  actions: {
    submit(object) {
      if (get(this, 'novalidate') === false) {
        return this.__isFormValid(object).then((isValid) => {
          if (isValid === false) {
            return isChangeset(object) ? null : this.element.reportValidity();
          }
          return this.__submit(object);
        });
      }
      return this.__submit(object);
    }
  }
});

FormForComponent.reopenClass({
  positionalParams: ['object']
});

export default FormForComponent;
