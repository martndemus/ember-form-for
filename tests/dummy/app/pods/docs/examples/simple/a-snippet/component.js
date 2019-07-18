import Component from '@ember/component';

    // BEGIN-SNIPPET demo-simple-component.js
export default Component.extend({
  init() {
    this._super(...arguments);
    this.user = {
      name: ''
    };
  },
  actions: {
    submit() {
      window.alert(`You submitted "${this.user.name}"`);
    }
  }
});

// END-SNIPPET
