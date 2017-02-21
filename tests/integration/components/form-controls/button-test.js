import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { initialize as formForInitializer } from 'dummy/instance-initializers/form-for-initializer';
import config from 'dummy/config/environment';

moduleForComponent('form-controls/button', 'Integration | Component | {{form-controls/button}}', {
  integration: true,

  teardown() {
    delete config['ember-form-for'];
  }
});

test('It renders a button', function(assert) {
  this.render(hbs`{{form-controls/button}}`);
  assert.equal(this.$('button').length, 1, 'Button is rendered');
});

test('The type of the button is "button"', function(assert) {
  this.render(hbs`{{form-controls/button}}`);
  assert.equal(this.$('button').attr('type'), 'button', 'Type is button');
});

test('It can be passed a label value', function(assert) {
  this.render(hbs`{{form-controls/button label="TEST"}}`);
  assert.equal(this.$('button').text().trim(), 'TEST', 'The text on the button is TEST');
});

test('The label can also be a block', function(assert) {
  this.render(hbs`{{#form-controls/button}}TEST{{/form-controls/button}}`);
  assert.equal(this.$('button').text().trim(), 'TEST', 'The text on the button is TEST');
});

test('It can have a label value specified as a positional param', function(assert) {
  this.render(hbs`{{form-controls/button "Click Me"}}`);
  assert.equal(this.$('button').text().trim(), 'Click Me', 'Button has "Click Me" as label');
});

test('Clicking the button triggers the click action', function(assert) {
  assert.expect(1);
  this.on('click', () => assert.ok(true));
  this.render(hbs`{{form-controls/button click=(action 'click')}}`);
  this.$('button').trigger('click');
});

test('I can set and configure custom buttonClasses', function(assert) {
  config['ember-form-for'] = {
    buttonClasses: ['custom-class-1']
  };

  formForInitializer(this.container);

  this.set('buttonClasses', ['custom-class-2']);
  this.render(hbs`{{form-controls/button class=buttonClasses}}`);

  assert.equal(this.$('.custom-class-1').length, 1);
  assert.equal(this.$('.custom-class-2').length, 1);
});

test('I can set the disabled attribute', function(assert) {
  this.render(hbs`{{form-controls/button disabled=true}}`);
  assert.equal(this.$('button').attr('disabled'), 'disabled', 'disabled is set to true');
});

test('I can set the aria-controls attribute', function(assert) {
  this.render(hbs`{{form-controls/button aria-controls="foo"}}`);
  assert.equal(this.$('button').attr('aria-controls'), 'foo', 'aria-controls is set to foo');
});
