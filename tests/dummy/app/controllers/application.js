import Ember from 'ember';

const {
  Controller,
  Object: EmberObject,
  set,
  run,
  RSVP,
  isEmpty
} = Ember;

function createEmptyObject(attrs) {
  return EmberObject.create(attrs, {
    errors: {}
  });
}

function blankUser() {
  return createEmptyObject({ address: createEmptyObject() });
}

export default Controller.extend({
  submit() {
    return new RSVP.Promise((resolve) => {
      run.later(this, () => {
        window.alert('Saved!');
        resolve();
      }, 1500);
    });
  },

  reset() {
    set(this, 'user', blankUser());
  },

  update(object, propertyName, value) {
    let errors;
    if (isEmpty(value)) {
      errors = [{ message: "can't be blank" }];
    }

    set(object, `errors.${propertyName}`, errors);

    set(object, propertyName, value);
  },

  user: blankUser()
});
