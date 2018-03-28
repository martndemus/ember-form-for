import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

const { run, RSVP } = Ember;

moduleForComponent('form-controls/submit', 'Integration | Component | {{form-controls/submit}}', {
  integration: true
});

test('It renders a submit button', function(assert) {
  this.render(hbs`{{form-controls/submit}}`);
  assert.equal(this.$('button').attr('type'), 'submit', 'Submit button is rendered');
});

test('Clicking the submit button triggers the "submit" action', function(assert) {
  assert.expect(1);
  this.on('submit', () => assert.ok(true));
  this.render(hbs`{{form-controls/submit submit=(action 'submit')}}`);
  this.$('button').trigger('click');
});

test('Clicking the submit button triggers the "action" action', function(assert) {
  assert.expect(1);
  this.on('submit', () => assert.ok(true));
  this.render(hbs`{{form-controls/submit action=(action 'submit')}}`);
  this.$('button').trigger('click');
});

test('Clicking the submit button supports returning a promise', function(assert) {
  assert.expect(4);
  let promise = new RSVP.Promise((resolve) => {
    run.later(this, () => {
      resolve();
    }, 500);
  });

  this.on('submit', () => {
    return promise;
  });
  this.render(hbs`{{form-controls/submit action=(action 'submit')}}`);
  let $button = this.$('button');

  $button.trigger('click');
  assert.equal($button.text().trim(), 'Submitting...', 'Button state changes on pending promise');
  assert.equal(true, $button[0].disabled, 'Button should be disabled when promise is pending');

  return wait().then(() => {
    promise.then(() => {
      assert.ok(true);
      assert.equal($button.text().trim(), 'Submit', 'Button state returns on fulfilled promise');
    });
  });
});

test('It renders custom text', function(assert) {
  this.render(hbs`{{form-controls/submit 'Test'}}`);
  assert.equal(this.$('button').text().trim(), 'Test', 'Submit button shows label');
});

test("it's possible to bind 'formaction'", function(assert) {
  this.render(hbs`{{form-controls/submit formaction="http://example.com/form"}}`);
  assert.equal(this.$('button').attr('formaction'), 'http://example.com/form', 'attribute formaction is set');
});

test("it's possible to bind 'formenctype'", function(assert) {
  this.render(hbs`{{form-controls/submit formenctype="text/plain"}}`);
  assert.equal(this.$('button').attr('formenctype'), 'text/plain', 'attribute formenctype is set');
});

test("it's possible to bind 'formmethod'", function(assert) {
  this.render(hbs`{{form-controls/submit formmethod="POST"}}`);
  assert.equal(this.$('button').attr('formmethod'), 'POST', 'attribute formmethod is set');
});

test("it's possible to bind 'formtarget'", function(assert) {
  this.render(hbs`{{form-controls/submit formtarget="_blank"}}`);
  assert.equal(this.$('button').attr('formtarget'), '_blank', 'attribute formtarget is set');
});

test("it's possible to bind 'formnovalidate'", function(assert) {
  this.render(hbs`{{form-controls/submit formnovalidate="formnovalidate"}}`);
  assert.equal(this.$('button').attr('formnovalidate'), 'formnovalidate', 'attribute formnovalidate is set');
});
