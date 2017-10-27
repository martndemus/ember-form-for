import FormField from '../form-field';

const SelectFieldComponent = FormField.extend({
  classNames: 'select-field',

  fieldTemplate: 'form-fields/base-layout',

  control: 'one-way-select'
});

SelectFieldComponent.reopenClass({
  positionalParams: ['propertyName', 'options']
});

export default SelectFieldComponent;