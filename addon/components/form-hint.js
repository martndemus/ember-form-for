import Ember from 'ember';
import layout from '../templates/components/form-hint';

const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend({
  tagName: '',
  layout,

  joinedHintClasses: computed('hintClasses', function() {
    return (get(this, 'hintClasses') || []).join(' ');
  })
});
