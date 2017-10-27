import Ember from 'ember';
import FormField from '../form-field';
import { invokeAction } from 'ember-invoke-action';

const { get } = Ember;

export default FormField.extend({
  tagName: 'fieldset',

  classNames: 'fieldset',

  fieldTemplate: 'form-fields/checkbox-group',

  actions: {
    updateSelection(value, object, propertyName, include) {
      let selection = get(object, propertyName);
      if (include && !selection.contains(value)) {
        selection.pushObject(value);
      } else {
        selection.removeObject(value);
      }

      invokeAction(this, 'update', object, propertyName, selection);
    }
  }
});