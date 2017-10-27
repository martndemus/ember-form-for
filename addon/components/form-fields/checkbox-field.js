import FormField from '../form-field';

export default FormField.extend({
  classNames: 'checkbox-field',

  fieldTemplate: 'form-fields/checkbox-field',

  control: 'one-way-checkbox'
});