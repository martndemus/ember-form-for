import FormField from '../form-field';

export default FormField.extend({
  classNames: 'text-field',

  fieldTemplate: 'form-fields/base-layout',

  control: 'one-way-text'
});