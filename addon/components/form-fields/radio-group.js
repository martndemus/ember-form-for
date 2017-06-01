import Ember from 'ember';
import layout from '../../templates/components/form-fields/radio-group';

const {
  set,
  computed,
  Component
} = Ember;

const RadioGroupComponent = Component.extend({
  tagName: '',
  layout,

  hashOptions: computed('options', function() {
    let options = this.get('options') || [];

    return options.map((option) => {
      let value = option && option.value ? option.value : option;
      let label = option && option.label;

      return {
        value,
        label
      };
    });
  }),

  update() {
    set(...arguments);
  }
});

RadioGroupComponent.reopenClass({
  positionalParams: ['propertyName']
});

export default RadioGroupComponent;
