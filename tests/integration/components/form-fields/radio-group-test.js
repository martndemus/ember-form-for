import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('form-fields/radio-group', 'Integration | Component | {{form-fields/radio-group}}', {
  integration: true,

  setup() {
    this.set('object', { gender: 'female' });
    this.set('options', [{ value: 'male' }, { value: 'female' }, { value: 'unknown' }]);
  }
});

test('It renders a fieldset', function(assert) {
  this.render(hbs`{{form-fields/radio-group "gender" object=object}}`);
  assert.equal(this.$('fieldset').length, 1);
});

test('It adds a legend with the label text', function(assert) {
  this.render(hbs`{{form-fields/radio-group "gender" object=object}}`);
  assert.equal(this.$('legend').text().trim(), 'Gender');
});

test('It renders a list of radios with label for each option', function(assert) {
  this.render(hbs`{{form-fields/radio-group "gender" object=object options=options}}`);
  assert.equal(this.$('ul li label input[type="radio"]').length, 3);
  assert.equal(this.$('ul li:first-child label').text().trim(), 'Male');
});

test('It renders a list of radios with label for each option where each option is a string', function(assert) {
  this.set('options', ['male', 'female', 'unknown']);
  this.render(hbs`{{form-fields/radio-group "gender" object=object options=options}}`);
  assert.equal(this.$('ul li label input[type="radio"]').length, 3);
  assert.equal(this.$('ul li:first-child label').text().trim(), 'Male');
});

test('It renders a list of radios with custom labels for each option', function(assert) {
  this.set('options', [{ value: 'male', label: 'Man' }, { value: 'female', label: 'Woman' }, { value: 'unknown', label: 'Unknown' }]);
  this.render(hbs`{{form-fields/radio-group "gender" object=object options=options}}`);
  assert.equal(this.$('ul li label input[type="radio"]').length, 3);
  assert.equal(this.$('ul li:first-child label').text().trim(), 'Man');
});

test('It renders a list of radios with custom labels for each option in block mode', function(assert) {
  this.set('options', [{ value: 'male', label: 'Man' }, { value: 'female', label: 'Woman' }, { value: 'unknown', label: 'Unknown' }]);
  this.render(hbs`
    {{#form-fields/radio-group "gender" object=object options=options as |controls|}}
      {{controls.radio-field labelClasses='radio-inline'}}
    {{/form-fields/radio-group}}
  `);
  assert.equal(this.$('ul li label.radio-inline input[type="radio"]').length, 3);
  assert.equal(this.$('ul li:first-child label.radio-inline').text().trim(), 'Man');
});

test('Disabled true disables all radios', function(assert) {
  this.render(hbs`{{form-fields/radio-group "gender" disabled=true object=object options=options}}`);
  assert.equal(this.$('input[type="radio"]:disabled').length, 3);
});
