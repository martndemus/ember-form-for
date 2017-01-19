import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { initialize as formForInitializer } from 'dummy/instance-initializers/form-for-initializer';
import config from 'dummy/config/environment';
import FormForComponent from 'ember-form-for/components/form-for';

const { run } = Ember;

moduleForComponent('form-for', 'Integration | Component | {{form-for}}', {
  integration: true,

  beforeEach() {
    this.set('object', { name: 'Peter' });
  },

  afterEach() {
    delete config['ember-form-for'];
    FormForComponent.reopen({
      customFormFields: null
    });
  }
});

test('It renders a form element', function(assert) {
  this.render(hbs`{{form-for}}`);

  assert.equal(this.$('form').length, 1);
});

test('The form attribute sets the id of the form element', function(assert) {
  this.render(hbs`{{form-for form="the-form"}}`);

  assert.equal(this.$('form').attr('id'), 'the-form');
});

test('It yields an helper for rendering form components', function(assert) {
  this.render(hbs`
    {{#form-for object as |f|}}
      {{f.text-field "name"}}
    {{/form-for}}
  `);

  assert.equal(this.$('form input[type="text"]').length, 1);
});

test('It puts the given attribute\'s value in the input', function(assert) {
  this.render(hbs`
    {{#form-for object as |f|}}
      {{f.text-field "name"}}
    {{/form-for}}
  `);

  let $input = this.$('form input[type="text"]');

  assert.equal($input.val(), 'Peter');
});

test('By default object properties are updated on typing', function(assert) {
  this.render(hbs`
    {{#form-for object as |f|}}
      {{f.text-field "name"}}
    {{/form-for}}
  `);

  let $input = this.$('form input[type="text"]');

  run(() => {
    $input.val('Robert');
    $input.trigger('input');
  });

  assert.equal(this.get('object.name'), 'Robert');
});

test('It passes an update action to the fields', function(assert) {
  assert.expect(1);
  this.on('update', (object, propertyName, value) => {
    assert.equal(value, 'Robert');
  });

  this.render(hbs`
    {{#form-for object update=(action 'update') as |f|}}
      {{f.text-field "name"}}
    {{/form-for}}
  `);

  let $input = this.$('form input[type="text"]');
  $input.val('Robert');
  $input.trigger('input');
});

test('Adding a custom field', function(assert) {
  this.render(hbs`
    {{#form-for object as |f|}}
      {{f.custom-field "name" control="one-way-search"}}
    {{/form-for}}
  `);

  assert.equal(this.$('form input[type="search"]').length, 1);
});

test('Adding a custom field with template', function(assert) {
  this.render(hbs`
    {{#form-for object as |f|}}
      {{#f.custom-field "name" as |ff|}}
        {{ff.control}}
      {{/f.custom-field}}
    {{/form-for}}
  `);

  assert.equal(this.$('form input').length, 1);
});

test('It\'s helper can render a submit button', function(assert) {
  assert.expect(1);
  this.on('submit', (object) => assert.equal(object, this.get('object')));
  this.render(hbs`
    {{#form-for object submit=(action 'submit') as |f|}}
      {{f.submit}}
    {{/form-for}}
  `);

  this.$('button[type="submit"]').click();
});

test('Submit calls object#save by default', function(assert) {
  assert.expect(1);
  this.set('object', { save: () => assert.ok(true) });

  this.render(hbs`
    {{#form-for object as |f|}}
      {{f.submit}}
    {{/form-for}}
  `);

  this.$('button[type="submit"]').click();
});

test('It\'s helper can render a reset button', function(assert) {
  assert.expect(1);
  this.on('reset', (object) => assert.equal(object, this.get('object')));
  this.render(hbs`
    {{#form-for object reset=(action 'reset') as |f|}}
      {{f.reset}}
    {{/form-for}}
  `);

  this.$('button[type="reset"]').click();
});

test('Reset calls object#rollback by default', function(assert) {
  assert.expect(1);
  this.set('object', { rollback: () => assert.ok(true) });

  this.render(hbs`
    {{#form-for object as |f|}}
      {{f.reset}}
    {{/form-for}}
  `);

  this.$('button[type="reset"]').click();
});

test('Form is focused when submit action is triggered and object contains errors', function(assert) {
  this.set('object', {
    save: () => undefined,
    errors: {
      foo: [{ message: 'error' }]
    }
  });

  this.render(hbs`
    {{#form-for object as |f|}}
      {{f.submit}}
    {{/form-for}}
  `);

  run(() => this.$('button[type="submit"]').click());
  assert.equal(document.activeElement, this.$('form').get(0));
});

test('I can set and configure custom formClasses', function(assert) {
  config['ember-form-for'] = {
    formClasses: ['custom-form-class-1']
  };

  formForInitializer(this.container);

  this.render(hbs`{{form-for}}`);

  assert.equal(this.$('.custom-form-class-1').length, 1);
});

test('It passes down the form attribute to fields', function(assert) {
  this.render(hbs`
    {{#form-for object form="user" as |f|}}
      {{f.text-field "name"}}
    {{/form-for}}
  `);

  assert.equal(this.$('form input').attr('name'), 'user[name]');
});
