import Ember from 'ember';
import layout from '../templates/components/form-errors';

const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend({
  layout,
  tagName: '',

  joinedErrorClasses: computed('errorClasses', function() {
    return (get(this, 'errorClasses') || []).join(' ');
  })
});
