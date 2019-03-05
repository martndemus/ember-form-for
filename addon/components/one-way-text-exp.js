import Component from '@ember/component';

const attributeBlacklist = {
  update: true,
  _sanitizeInput: true
};

export default Component.extend({
  tagName: 'input',
  attributeBindings: undefined,

  /** based on https://github.com/dockyard/ember-one-way-controls/issues/21 **/
  init() {
    this._super(...arguments);

    // @todo: fix eslint warning
    const attrs = this.attrs;

    // Dynamically pass all attributes to <input> with the exception of blacklisted ones
    this.attributeBindings = [];

    for (let key in attrs) {
      let value;

      // Get value from MutableCells if needed
      if (typeof attrs[key] === 'object' && 'value' in attrs[key]) {
        value = attrs[key].value;
      } else {
        value = attrs[key];
      }

      // Do not add attribute if the value is empty
      // @todo: should be in didReceiveAttr?
      if (value && !attributeBlacklist[key]) {
        this.attributeBindings.push(key);
      }
    }
  }
});
