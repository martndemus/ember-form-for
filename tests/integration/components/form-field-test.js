import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { Object: EmberObject, guidFor, run } = Ember;

moduleForComponent('form-field', 'Integration | Component | {{form-field}}', {
  integration: true,

  beforeEach() {
    this.set('object', { givenName: 'Albert' });
  }
});

test('It requires an object', function(assert) {
  assert.throws(() => {
    this.render(hbs`{{form-field}}`);
  }, /{{form-field}} requires an object property to be passed in/);
});

test('It requires a propertyName', function(assert) {
  assert.throws(() => {
    this.render(hbs`{{form-field object=object}}`);
  }, /{{form-field}} requires the propertyName property to be set/);
});

test('It adds a label based on propertyName', function(assert) {
  this.render(hbs`
    {{#form-field "givenName" object=object as |f|}}{{f.label}}{{/form-field}}
  `);
  assert.equal(this.$('label').text().trim(), 'Given name');
});

test('If the i18n service is available, compute the label from there', function(assert) {
  assert.expect(2);
  this.registry.register('service:i18n', EmberObject.extend({
    t(key) {
      assert.equal(key, 'given-name');
      return 'Your name';
    }
  }));

  this.render(hbs`
    {{#form-field "givenName" object=object as |f|}}{{f.label}}{{/form-field}}
  `);

  assert.equal(this.$('label').text().trim(), 'Your name');
});

test('When modelName is present, use it for i18n labels', function(assert) {
  assert.expect(2);
  this.registry.register('service:i18n', EmberObject.extend({
    t(key) {
      assert.equal(key, 'user.given-name');
      return 'Your name';
    }
  }));

  this.set('object.modelName', 'user');

  this.render(hbs`
    {{#form-field "givenName" object=object as |f|}}{{f.label}}{{/form-field}}
  `);

  assert.equal(this.$('label').text().trim(), 'Your name');
});

test('An arbitrary prefix can be used for the i18n key', function(assert) {
  this.register('service:ember-form-for/config', Ember.Service.extend({
    i18nKeyPrefix: 'arbitrary'
  }));

  assert.expect(2);
  this.registry.register('service:i18n', EmberObject.extend({
    t(key) {
      assert.equal(key, 'arbitrary.given-name');
      return 'Your name';
    }
  }));

  this.render(hbs`
    {{#form-field "givenName" object=object as |f|}}{{f.label}}{{/form-field}}
  `);

  assert.equal(this.$('label').text().trim(), 'Your name');
});

test('It yields a text input as a default control', function(assert) {
  this.render(hbs`
    {{#form-field "givenName" object=object as |f|}}{{f.control}}{{/form-field}}
  `);
  assert.equal(this.$('input[type="text"]').length, 1);
});

test('A custom form control can be specified', function(assert) {
  this.render(hbs`
    {{#form-field "givenName" object=object control="one-way-search" as |f|}}
      {{f.control}}
    {{/form-field}}
  `);
  assert.equal(this.$('input[type="search"]').length, 1);
});

test('It sets the "for" attr of the label and the "id" attr of the input', function(assert) {
  let expectedId = `test123_givenName`;
  this.render(hbs`
    {{#form-field "givenName" id="test123" object=object as |f|}}
      {{f.label}}{{f.control}}
    {{/form-field}}
  `);
  assert.equal(this.$('label').attr('for'), expectedId);
  assert.equal(this.$('input').attr('id'), expectedId);
});

test('It uses the form property as fieldId if possible', function(assert) {
  let expectedId = `form123_givenName`;
  this.render(hbs`
    {{#form-field "givenName" object=object form="form123" as |f|}}
      {{f.label}}{{f.control}}
    {{/form-field}}
  `);
  assert.equal(this.$('label').attr('for'), expectedId);
  assert.equal(this.$('input').attr('id'), expectedId);
});

test('It sets the "name" attribute of input', function(assert) {
  let expectedName = `${guidFor(this.get('object'))}[givenName]`;
  this.render(hbs`
    {{#form-field "givenName" object=object as |f|}}{{f.control}}{{/form-field}}
  `);
  assert.equal(this.$('input').attr('name'), expectedName);
});

test('Property modelName is used in the "name" attribute if present on object', function(assert) {
  this.set('object.constructor', { modelName: 'person' });
  this.render(hbs`
    {{#form-field "givenName" object=object as |f|}}{{f.control}}{{/form-field}}
  `);
  assert.equal(this.$('input').attr('name'), 'person[givenName]');
});

test('It sets the value of the input to the value of the propertyName on object', function(assert) {
  this.render(hbs`
    {{#form-field "givenName" object=object as |f|}}{{f.control}}{{/form-field}}
  `);
  assert.equal(this.$('input').val(), this.get('object.givenName'));
});

test('It passes the form attribute to the label and control', function(assert) {
  this.render(hbs`
    {{#form-field "givenName" object=object form="form123" as |f|}}
      {{f.label}}{{f.control}}
    {{/form-field}}
  `);
  assert.equal(this.$('label').attr('form'), 'form123');
  assert.equal(this.$('input').attr('form'), 'form123');
});

test('It can display errors', function(assert) {
  this.set('object.errors', { givenName: [{ message: 'can\'t be blank' }] });

  this.render(hbs`
    {{#form-field "givenName" object=object form="form123" as |f|}}
      {{f.errors}}
    {{/form-field}}
  `);

  assert.ok(this.$().text().trim().indexOf('can\'t be blank') !== -1);
});

test('It exposes hasErrors', function(assert) {
  this.set('object.errors', { givenName: [{ message: 'can\'t be blank' }] });

  this.render(hbs`
    {{#form-field "givenName" object=object form="form123" as |f|}}
      {{#if f.hasErrors}}
        I HAZ ERRORS
      {{/if}}
    {{/form-field}}
  `);

  assert.ok(this.$().text().trim().indexOf('I HAZ ERRORS') !== -1);
});

test('I can configure on which property errors are found', function(assert) {
  this.register('service:ember-form-for/config', Ember.Service.extend({
    errorsProperty: ['error']
  }));

  this.set('object.error', { givenName: [{ message: 'can\'t be blank' }] });

  this.render(hbs`
    {{#form-field "givenName" object=object form="form123" as |f|}}
      {{f.errors}}
    {{/form-field}}
  `);

  assert.ok(this.$().text().trim().indexOf('can\'t be blank') !== -1);
});

test('The errors messages are linked to the control by aria-describedby', function(assert) {
  this.set('object.errors', {
    givenName: [
      { message: 'can\'t be blank' },
      { message: 'is required' }
    ]
  });

  this.render(hbs`
    {{#form-field "givenName" object=object form="form123" as |f|}}
      {{f.control}}
      {{f.errors}}
    {{/form-field}}
  `);

  assert.equal(this.$('[role="alert"]:eq(0)').attr('id'), 'form123_givenName_error-0');
  assert.equal(this.$('[role="alert"]:eq(1)').attr('id'), 'form123_givenName_error-1');
  assert.equal(this.$('input').attr('aria-describedby'), 'form123_givenName_error-0 form123_givenName_error-1');
});

test('Required is passed down to the control and hint', function(assert) {
  this.render(hbs`
    {{#form-field "givenName" object=object required=true as |f|}}
      {{f.label}}
      {{f.control}}
    {{/form-field}}
  `);

  assert.equal(this.$('input').attr('required'), 'required', 'Required is set');
  assert.ok(this.$('label').text().indexOf('*') !== -1, 'Star is added to label');
});

test('By default changing the input updates the value', function(assert) {
  this.render(hbs`
    {{#form-field "givenName" object=object as |f|}}
      {{f.label}}{{f.control}}
    {{/form-field}}
  `);
  this.$('input').val('Mark').trigger('change');
  assert.equal(this.get('object.givenName'), 'Mark');
});

test('A custom update action can be passed', function(assert) {
  assert.expect(1);
  this.on('update', (object, propertyPath, value) => assert.equal(value, 'Mark'));
  this.render(hbs`
    {{#form-field "givenName" object=object update=(action 'update') as |f|}}
      {{f.label}}{{f.control}}
    {{/form-field}}
  `);
  this.$('input').val('Mark').trigger('change');
});

test('It can yield the labelText', function(assert) {
  this.render(hbs`
    {{#form-field "givenName" object=object as |f|}}
      {{f.labelText}}
    {{/form-field}}
  `);
  assert.equal(this.$().text().trim(), 'Given name');
});

test('It can yield a hint', function(assert) {
  this.render(hbs`
    {{#form-field "givenName" object=object hint="This is a hint" as |f|}}
      {{f.hint}}
    {{/form-field}}
  `);
  assert.equal(this.$('span').text().trim(), 'This is a hint');
});

test('It sets the describedBy of the control to the id of the hint', function(assert) {
  this.render(hbs`
    {{#form-field "givenName" id="test123" object=object hint="This is a hint" as |f|}}
      {{f.control}}
      {{f.hint}}
    {{/form-field}}
  `);
  let expectedId = `test123_givenName_hint`;
  assert.equal(this.$('span').attr('id'), expectedId);
  assert.equal(this.$('input').attr('aria-describedby'), expectedId);
});

test('It passes invalid to the control when errors are present', function(assert) {
  this.set('object.errors', { givenName: [{ message: 'can\'t be blank' }] });

  this.render(hbs`
    {{#form-field "givenName" object=object form="form123" as |f|}}
      {{f.control}}
    {{/form-field}}
  `);

  assert.equal(this.$('input').attr('aria-invalid'), 'true');
});

test('I can set and configure custom fieldClasses', function(assert) {
  this.register('service:ember-form-for/config', Ember.Service.extend({
    fieldClasses: ['custom-class-1']
  }));

  this.set('fieldClasses', ['custom-class-2']);
  this.render(hbs`
    {{#form-field "givenName" object=object class=fieldClasses as |f|}}
      {{f.control}}
    {{/form-field}}
  `);

  assert.equal(this.$('.custom-class-1').length, 1);
  assert.equal(this.$('.custom-class-2').length, 1);
});

test('I can set and configure custom inputClasses', function(assert) {
  this.register('service:ember-form-for/config', Ember.Service.extend({
    inputClasses: ['custom-class-1']
  }));

  this.set('inputClasses', ['custom-class-2']);
  this.render(hbs`
    {{#form-field "givenName" object=object inputClasses=inputClasses as |f|}}
      {{f.control}}
    {{/form-field}}
  `);

  assert.ok(this.$('input').hasClass('custom-class-1'));
  assert.ok(this.$('input').hasClass('custom-class-2'));
});

test('I can set and configure custom labelClasses', function(assert) {
  this.register('service:ember-form-for/config', Ember.Service.extend({
    labelClasses: ['custom-class-1']
  }));

  this.set('labelClasses', ['custom-class-2']);
  this.render(hbs`
    {{#form-field "givenName" object=object labelClasses=labelClasses as |f|}}
      {{f.label}}
    {{/form-field}}
  `);

  assert.ok(this.$('label').hasClass('custom-class-1'));
  assert.ok(this.$('label').hasClass('custom-class-2'));
});

test('I can set and configure custom hintClasses', function(assert) {
  this.register('service:ember-form-for/config', Ember.Service.extend({
    hintClasses: ['custom-class-1']
  }));

  this.set('hintClasses', ['custom-class-2']);
  this.render(hbs`
    {{#form-field "givenName" object=object hint="test" hintClasses=hintClasses as |f|}}
      {{f.hint}}
    {{/form-field}}
  `);

  assert.ok(this.$('span').hasClass('custom-class-1'));
  assert.ok(this.$('span').hasClass('custom-class-2'));
});

test('I can set custom errorClasses', function(assert) {
  this.register('service:ember-form-for/config', Ember.Service.extend({
    errorClasses: ['custom-error-1']
  }));

  this.set('object.errors', { givenName: [{ message: 'can\'t be blank' }] });
  this.set('errorClasses', ['custom-error-2']);
  this.render(hbs`
    {{#form-field "givenName" object=object errorClasses=errorClasses as |f|}}
      {{f.errors}}
    {{/form-field}}
  `);

  assert.equal(this.$('.custom-error-1').length, 1);
  assert.equal(this.$('.custom-error-2').length, 1);
});

test('I can set a custom fieldHasErrorClasses', function(assert) {
  this.register('service:ember-form-for/config', Ember.Service.extend({
    fieldHasErrorClasses: ['has-errors-custom']
  }));

  this.set('object.errors', { givenName: [{ message: 'can\'t be blank' }] });
  this.render(hbs`
    {{#form-field "givenName" object=object as |f|}}
      {{f.errors}}
    {{/form-field}}
  `);

  assert.equal(this.$('.has-errors-custom').length, 1);
});

test('I can pass a serializeValue function', function(assert) {
  this.set('serializeValue', (value) => {
    return value.toUpperCase();
  });
  this.render(hbs`
    {{#form-field "givenName" object=object serializeValue=serializeValue as |f|}}
      {{f.control}}
    {{/form-field}}
  `);
  assert.equal(this.$('input').val(), 'ALBERT', 'Value is uppercased');
});

test('I can pass a deserializeValue function', function(assert) {
  this.set('deserializeValue', (value) => {
    return value.toUpperCase();
  });
  this.render(hbs`
    {{#form-field "givenName" object=object deserializeValue=deserializeValue as |f|}}
      {{f.control}}
    {{/form-field}}
  `);
  run(() => this.$('input').val('John').trigger('change'));
  assert.equal(this.get('object.givenName'), 'JOHN', 'Value is uppercased');
});
