import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import registerI18n from '../../../support/register-i18n';

const { Object: EmberObject, run } = Ember;

moduleForComponent('form-fields/checkbox-group', 'Integration | Component | {{form-fields/checkbox-group}}', {
  integration: true,

  setup() {
    this.set('object', { preferences: ['dogs'] });
    this.set('options', ['dogs', 'cats']);
  }
});

test('It renders a fieldset', function(assert) {
  this.render(hbs`{{form-fields/checkbox-group "preferences" object=object}}`);
  assert.equal(this.$('fieldset').length, 1);
});

test('It adds a legend with the label text', function(assert) {
  this.render(hbs`{{form-fields/checkbox-group "preferences" object=object}}`);
  assert.equal(this.$('legend').text().trim(), 'Preferences');
});

test('It renders a list of checkboxes with label for each option', function(assert) {
  this.render(hbs`{{form-fields/checkbox-group "preferences" object=object options=options}}`);
  assert.equal(this.$('ul li label input[type="checkbox"]').length, 2);
});

test('The selected options is checked', function(assert) {
  this.render(hbs`{{form-fields/checkbox-group "preferences" object=object options=options}}`);
  assert.equal(this.$('input[type="checkbox"]:checked').length, 1);
  assert.equal(this.$('input[type="checkbox"]:checked').val(), 'dogs');
});

test('Disabled true disables all checkboxes', function(assert) {
  this.render(hbs`{{form-fields/checkbox-group "gender" disabled=true object=object options=options}}`);
  assert.equal(this.$('input[type="checkbox"]:disabled').length, 2);
});

test('Clicking a checkbox updates the property', function(assert) {
  this.render(hbs`{{form-fields/checkbox-group "preferences" object=object options=options}}`);

  run(() => this.$('input:eq(1)').click());

  assert.equal(this.$('input[type="checkbox"]:checked').length, 2);
  assert.deepEqual(this.get('object.preferences'), ['dogs', 'cats']);

  run(() => this.$('input:eq(0)').click());

  assert.equal(this.$('input[type="checkbox"]:checked').length, 1);
  assert.deepEqual(this.get('object.preferences'), ['cats']);
});

test('The labels are computed from the i18n service if available', function(assert) {
  assert.expect(2);
  registerI18n(this, EmberObject.extend({
    t(key) {
      return key;
    }
  }));

  this.render(hbs`{{form-fields/checkbox-group "preferences" object=object options=options}}`);

  assert.equal(this.$('label').eq(0).text().trim(), 'preferences.dogs');
  assert.equal(this.$('label').eq(1).text().trim(), 'preferences.cats');
});
