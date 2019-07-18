// BEGIN-SNIPPET demo-ember-changeset-component.js
import Component from '@ember/component';
import Changeset from 'ember-changeset';
import { get } from '@ember/object';
import {
  validatePresence,
  validateFormat
} from 'ember-changeset-validations/validators';
import lookupValidator from 'ember-changeset-validations';

const validator = {
  firstname: validatePresence(true),
  lastname: validatePresence(true),
  email: [
    validatePresence(true),
    validateFormat({ type: 'email' })
  ]
};

export default Component.extend({
  init() {
    this._super(...arguments);
    let model = {
      firstname: null,
      lastname: null,
      email: null
    };
    this.user = new Changeset(model, lookupValidator(validator), validator);
  },
  actions: {
    async submit() {
      await this.user.validate();
      console.log(get(this.user, 'isValid'))
      // debugger;
    }
  }
});

// END-SNIPPET
