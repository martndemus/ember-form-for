import Ember from 'ember';
import layout from '../templates/components/form-errors';

const {
  computed,
  computed: { notEmpty },
  get
} = Ember;

export default Ember.Component.extend({
  layout,
  tagName: '',

  showErrors: notEmpty('errors'),

  joinedErrorClasses: computed('errorClasses', function() {
    return (get(this, 'errorClasses') || []).join(' ');
  })
});
