import Ember from 'ember';

const {
  Helper: { helper }
} = Ember;

export function formForMergeCustomFormField([formFieldsHash], { name, component }) {
  formFieldsHash[name] = component;
}

export default helper(formForMergeCustomFormField);
