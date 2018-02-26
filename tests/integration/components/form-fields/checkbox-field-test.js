import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import registerI18n from '../../../support/register-i18n';

const { Object: EmberObject } = Ember;

moduleForComponent('form-fields/checkbox-field', 'Integration | Component | form fields/checkbox field', {
  integration: true
});

test('It renders a label and a checkbox', function(assert) {
  this.set('object', { accepted: false });
  this.render(hbs`{{form-fields/checkbox-field "accepted" object=object}}`);
  assert.equal(this.$('input[type="checkbox"]').length, 1);
  assert.equal(this.$('label').length, 1);
});

test('The label is computed from the i18n service if available', function(assert) {
  this.set('object', { accepted: true });
  registerI18n(this, EmberObject.extend({
    t(key) {
      assert.equal(key, 'accepted');
      return 'Accept Terms of Service';
    }
  }));

  this.render(hbs`{{form-fields/checkbox-field "accepted" object=object}}`);

  assert.equal(this.$('label').text().trim(), 'Accept Terms of Service');
});
