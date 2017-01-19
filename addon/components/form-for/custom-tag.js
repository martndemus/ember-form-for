import Ember from 'ember';
import layout from '../../templates/components/form-for/custom-tag';

const {
  Component
} = Ember;

export default Component.extend({
  layout,
  attributeBindings: ['id', 'role']
});
