import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent(
  'form-fields/hidden-field',
  'Integration | Component | form fields/hidden field',
  {
    integration: true,

    setup() {
      this.set('object', { givenName: 'Albert' });
      this.set('propertyName', 'givenName');
    }
  }
);

test('It does not renders a label for a hidden field', function(assert) {
  this.render(hbs`{{form-fields/hidden-field propertyName object=object}}`);
  assert.equal(this.$('input[type="hidden"]').length, 1);
  assert.equal(this.$('label').length, 0);
});
