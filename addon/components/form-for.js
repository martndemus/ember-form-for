import Ember from 'ember';
import layout from '../templates/components/form-for';

const {
  computed: { reads },
  get,
  inject: { service },
  isPresent,
  set,
  run: { schedule },
  Component
} = Ember;

const FormForComponent = Component.extend({
  layout,

  tagName: 'form',

  config: service('ember-form-for/config'),
  customFormFields: reads('config.customFormFields'),

  attributeBindings: ['tabindex'],

  init() {
    this._super(...arguments);

    let formClasses = get(this, 'config.formClasses');
    let classNames = get(this, 'classNames');
    set(this, 'classNames', (classNames || []).concat(formClasses));

    this.propertyDidChange();
  },

  submit: (object) => object.save(),
  reset:  (object) => object.rollback(),

  update(object, propertyName, value) {
    set(object, propertyName, value);
  },

  actions: {
    submit(object) {
      get(this, 'submit')(object);
      set(this, 'tabindex', undefined);

      let errors = get(object, 'errors');
      if (errors) {
        for (let propertyName in errors) {
          if (isPresent(get(errors, propertyName))) {
            set(this, 'tabindex', -1);
            schedule('afterRender', () => this.$().focus());
            break;
          }
        }
      }
    }
  }
});

FormForComponent.reopenClass({
  positionalParams: ['object']
});

export default FormForComponent;
