import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('form-controls/select', 'Integration | Component | {{form-controls/select}}', {
  integration: true,

  setup() {
    this.set('value', 'female');
    this.set('options', ['unknown', 'male', 'female']);
  }
});

test('It renders a select box with options', function(assert) {
  this.render(hbs`
    {{form-controls/select value=value options=options}}
  `);
  assert.equal(this.$('option').length, 3);
});

test('A value is selected', function(assert) {
  this.render(hbs` {{form-controls/select value=value options=options}} `);
  assert.equal(this.$('option:selected').val(), 'female');
});

test('Selecting a value updates the selected value', function(assert) {
  this.on('update', (value) => this.set('value', value));
  this.render(hbs`{{form-controls/select value=value options=options update=(action 'update')}}`);
  this.$('select').val('male');
  this.$('select').trigger('change');
  assert.equal(this.$('option:selected').val(), 'male');
  assert.equal(this.get('value'), 'male');
});

test('Accepts a space seperated string for options', function(assert) {
  this.render(hbs`{{form-controls/select value=value options="male female"}}`);
  assert.equal(this.$('option').length, 2);
});

test('Can include a blank value', function(assert) {
  this.render(hbs`{{form-controls/select value=value options=options includeBlank=true}}`);
  assert.equal(this.$('option').length, 4);
});

test('Blank value can be given a text', function(assert) {
  this.render(hbs`{{form-controls/select value=value options=options includeBlank="Select one"}}`);
  assert.equal(this.$('option:eq(0)').text().trim(), 'Select one');
});

test('Prompt is an alias for includeBlank', function(assert) {
  this.render(hbs`{{form-controls/select value=value options=options prompt="Select one"}}`);
  assert.equal(this.$('option:eq(0)').text().trim(), 'Select one');
});

test('With prompt selection still works properly', function(assert) {
  this.on('update', (value) => this.set('value', value));
  this.render(hbs`{{form-controls/select
    value=value
    options=options
    prompt="Select one"
    update=(action 'update')
  }}`);
  this.$('select').val('male');
  this.$('select').trigger('change');
  assert.equal(this.$('option:selected').val(), 'male');
  assert.equal(this.get('value'), 'male');
});

test('optionLabelPath', function(assert) {
  let [male, female] = [{ id: 1, value: 'male' }, { id: 2, value: 'female' }];
  this.set('value', female);
  this.set('options', [male, female]);

  this.render(hbs`{{form-controls/select
    value=value options=options optionValuePath="id"}}`);

  assert.equal(this.$('option').text().replace(/\s/g, ''), '12');
  assert.equal(this.$('option:selected').val(), 2);
});

test('optionValuePath', function(assert) {
  let [male, female] = [{ id: 1, value: 'male' }, { id: 2, value: 'female' }];
  this.set('value', female);
  this.set('options', [male, female]);

  this.render(hbs`{{form-controls/select
    value=value options=options optionValuePath="id" optionLabelPath="value"}}`);

  assert.equal(this.$('option').text().replace(/\s/g, ''), 'malefemale');
});

test('groupLabelPath', function(assert) {
  let [dubbel, tripel, ipa, saison] = [
    { id: 1, label: 'Dubbel', type: 'Trappist' },
    { id: 2, label: 'Tripel', type: 'Trappist' },
    { id: 3, label: 'IPA', type: 'IPA' },
    { id: 4, label: 'Saison', type: 'Saison' }
  ];
  this.set('value', saison);
  this.set('options', [dubbel, tripel, ipa, saison]);

  this.render(hbs`{{form-controls/select value=value options=options
      optionValuePath="id" optionLabelPath="label" groupLabelPath="type"}}`);

  assert.equal(this.$('optgroup').eq(0).attr('label'),  'Trappist');
  assert.equal(this.$('optgroup').length, 3);
});

test('multiple select', function(assert) {
  let [dubbel, tripel, ipa, saison] = [
    { id: 1, label: 'Dubbel', type: 'Trappist' },
    { id: 2, label: 'Tripel', type: 'Trappist' },
    { id: 3, label: 'IPA', type: 'IPA' },
    { id: 4, label: 'Saison', type: 'Saison' }
  ];

  this.set('value', [saison, ipa]);
  this.set('options', [dubbel, tripel, ipa, saison]);

  this.render(hbs`{{form-controls/select value=value options=options multiple=true
      optionValuePath="id" optionLabelPath="label" groupLabelPath="type"}}`);

  assert.equal(this.$('option:selected:eq(0)').val(), 3);
  assert.equal(this.$('option:selected:eq(1)').val(), 4);
});

test('multiple select a value', function(assert) {
  let [dubbel, tripel, ipa, saison] = [
    { id: 1, label: 'Dubbel', type: 'Trappist' },
    { id: 2, label: 'Tripel', type: 'Trappist' },
    { id: 3, label: 'IPA', type: 'IPA' },
    { id: 4, label: 'Saison', type: 'Saison' }
  ];

  this.on('update', (value) => this.set('value', value));
  this.set('value', [saison, ipa]);
  this.set('options', [dubbel, tripel, ipa, saison]);

  this.render(hbs`{{form-controls/select value=value options=options multiple=true
      update=(action 'update') optionValuePath="id" optionLabelPath="label"
      groupLabelPath="type"}}`);

  this.$('select').val(['1', '3', '4']);
  this.$('select').trigger('change');

  assert.equal(this.$('option:selected:eq(0)').val(), 1);
  assert.deepEqual(this.get('value'), [dubbel, ipa, saison]);
});

test('multiple select de-select all options', function(assert) {
  let [dubbel, tripel, ipa, saison] = [
    { id: 1, label: 'Dubbel', type: 'Trappist' },
    { id: 2, label: 'Tripel', type: 'Trappist' },
    { id: 3, label: 'IPA', type: 'IPA' },
    { id: 4, label: 'Saison', type: 'Saison' }
  ];

  this.on('update', (value) => this.set('value', value));
  this.set('value', [saison, ipa]);
  this.set('options', [dubbel, tripel, ipa, saison]);

  this.render(hbs`{{form-controls/select value=value options=options multiple=true
      update=(action 'update') optionValuePath="id" optionLabelPath="label"
      groupLabelPath="type"}}`);

  this.$('select').val(['1', '3', '4']);
  this.$('select').trigger('change');
  this.$('select').val('');
  this.$('select').trigger('change');

  assert.deepEqual(this.get('value'), []);
});

test(`it's possible to bind 'size'`, function(assert) {
  this.render(hbs`{{form-controls/select size=5}}`);
  assert.equal(this.$('select').attr('size'), 5, 'attribute size is set');
});

test(`it's possible to bind 'accesskey'`, function(assert) {
  this.render(hbs`{{form-controls/select accesskey="x"}}`);
  assert.equal(this.$('select').attr('accesskey'), 'x', 'attribute accesskey is set');
});

test(`It's possible to bind 'autofocus'`, function(assert) {
  this.render(hbs`{{form-controls/select autofocus=true}}`);
  assert.equal(this.$('select').attr('autofocus'), 'autofocus', 'Attribute autofocus is set');
});

test(`it's possible to bind 'dir'`, function(assert) {
  this.render(hbs`{{form-controls/select dir="rtl"}}`);
  assert.equal(this.$('select').attr('dir'), 'rtl', 'attribute dir is set');
});

test(`It's possible to bind 'disabled'`, function(assert) {
  this.render(hbs`{{form-controls/select disabled=true}}`);
  assert.equal(this.$('select').attr('disabled'), 'disabled', 'Attribute disabled is set');
});

test(`It's possible to bind 'form'`, function(assert) {
  this.render(hbs`{{form-controls/select form='form_one'}}`);
  assert.equal(this.$('select').attr('form'), 'form_one', 'Attribute form is set');
});

test(`it's possible to bind 'hidden'`, function(assert) {
  this.render(hbs`{{form-controls/select hidden="hidden"}}`);
  assert.equal(this.$('select').attr('hidden'), 'hidden', 'attribute hidden is set');
});

test(`it's possible to bind 'lang'`, function(assert) {
  this.render(hbs`{{form-controls/select lang="en-US"}}`);
  assert.equal(this.$('select').attr('lang'), 'en-US', 'attribute lang is set');
});

test(`It's possible to bind 'name'`, function(assert) {
  this.render(hbs`{{form-controls/select name='username'}}`);
  assert.equal(this.$('select').attr('name'), 'username', 'Attribute name is set');
});

test(`It's possible to bind 'required'`, function(assert) {
  this.render(hbs`{{form-controls/select required=true}}`);
  assert.equal(this.$('select').attr('required'), 'required', 'attribute required is set');
});

test(`It's possible to bind 'tabindex'`, function(assert) {
  this.render(hbs`{{form-controls/select tabindex=4}}`);
  assert.equal(this.$('select').attr('tabindex'), 4, 'attribute tabindex is set');
});

test(`it's possible to bind 'title'`, function(assert) {
  this.render(hbs`{{form-controls/select title="A Title"}}`);
  assert.equal(this.$('select').attr('title'), 'A Title', 'attribute title is set');
});

test('Required also sets aria-required', function(assert) {
  this.render(hbs`{{form-controls/select required=true}}`);
  assert.equal(this.$('select').attr('aria-required'), 'true', 'attribute aria-required is set');
});

test('If not required, set aria-require=false', function(assert) {
  this.render(hbs`{{form-controls/select}}`);
  assert.equal(this.$('select').attr('aria-required'), 'false', 'attribute aria-required is set');
});

test('Invalid=true sets araia-invalid="true"', function(assert) {
  this.render(hbs`{{form-controls/select invalid=true}}`);
  assert.equal(this.$('select').attr('aria-invalid'), 'true', 'attribute aria-invalid is set');
});

test('It is possible to set describedBy', function(assert) {
  this.render(hbs`{{form-controls/select describedBy="element-one"}}`);
  assert.equal(this.$('select').attr('aria-describedby'), 'element-one', 'attribute aria-describedby is set');
});
