import FormField from '../form-field';

export default FormField.extend({
  classNames: 'textarea-field',

  fieldTemplate: 'form-fields/base-layout',

  control: 'one-way-textarea'
});