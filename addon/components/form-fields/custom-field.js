import FormField from '../form-field';

export default FormField.extend({
  classNames: 'custom-field',

  fieldTemplate: 'form-fields/custom-field',

  control: 'one-way-input'
});