import Ember  from 'ember';
import layout from '../templates/components/form-label';

const {
  Component
} = Ember;

const FormLabelComponent = Component.extend({
  tagName: 'label',
  layout,

  attributeBindings: [
    'for',
    'form'
  ]
});

FormLabelComponent.reopenClass({
  positionalParams: ['label']
});

export default FormLabelComponent;
