import Ember from 'ember';
import layout from '../../templates/components/form-controls/select';

import { invokeAction } from 'ember-invoke-action';

const {
  computed,
  computed: { alias },
  get,
  set,
  String: { w }
} = Ember;

const SelectComponent =  Ember.Component.extend({
  layout,
  tagName: 'select',

  attributeBindings: [
    'accesskey',
    'autofocus',
    'describedBy:aria-describedby',
    'dir',
    'disabled',
    'form',
    'hidden',
    'invalid:aria-invalid',
    'lang',
    'multiple',
    'name',
    'required',
    'required:aria-required',
    'size',
    'tabindex',
    'title'
  ],

  didReceiveAttrs() {
    this._super(...arguments);

    let required = this.getAttr('required');
    if (required !== true) {
      set(this, 'required', false);
    }

    let options = this.getAttr('options');
    if (typeof options === 'string') {
      options = w(options);
    }

    set(this, 'options', Ember.A(options));
  },

  optionGroups: computed('options.[]', function() {
    let groupLabelPath = get(this, 'groupLabelPath');
    let options        = get(this, 'options');
    let groups         = Ember.A();

    if (!groupLabelPath) {
      return;
    }

    options.forEach((item) => {
      let label = get(item, groupLabelPath);

      if (label) {
        let group = groups.findBy('groupName', label);

        if (group == null) {
          group = Ember.Object.create({
            groupName: label,
            options:   Ember.A()
          });

          groups.pushObject(group);
        }

        get(group, 'options').pushObject(item);
      } else {
        groups.pushObject(item);
      }
    });

    return groups;
  }),

  change() {
    let value;

    if (get(this, 'multiple') === true) {
      value = this._selectedMultiple();
    } else {
      value = this._selectedSingle();
    }

    invokeAction(this, 'update', value);
  },

  prompt: alias('includeBlank'),

  promptText: computed('prompt', function() {
    let includeBlank = get(this, 'includeBlank');
    if (typeof includeBlank === 'string') {
      return includeBlank;
    }
  }),

  _selectedMultiple() {
    let selectedValues = this.$().val();

    return selectedValues.map((selectedValue) => {
      return this._findOption(selectedValue);
    });
  },

  _selectedSingle() {
    let selectedValue = this.$().val();
    return this._findOption(selectedValue);
  },

  _findOption(value) {
    let options = get(this, 'options');
    let optionValuePath = get(this, 'optionValuePath');
    let optionSelectedPath = get(this, 'optionSelectedPath');

    let selectedItem = options.find((item) => {
      if (optionValuePath) {
        return `${get(item, optionValuePath)}` === value;
      } else {
        return `${item}` === value;
      }
    });

    if (optionSelectedPath && selectedItem) {
      return selectedItem[optionSelectedPath];
    }
    return selectedItem;
  }
});

SelectComponent.reopenClass({
  positionalParams: ['value']
});

export default SelectComponent;
