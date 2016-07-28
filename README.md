# Ember Form For

[![npm version](https://badge.fury.io/js/ember-form-for.svg)](http://badge.fury.io/js/ember-form-for)
[![Build Status](https://travis-ci.org/martndemus/ember-form-for.svg?branch=master)](https://travis-ci.org/martndemus/ember-form-for)
[![Ember Observer Score](http://emberobserver.com/badges/ember-form-for.svg)](http://emberobserver.com/addons/ember-form-for)

This Ember.js addon will give you a simple way to build forms.
* Supports all HTML5 input types, textarea and select
* Is built with data down - actions up in mind
* Has basic accessibility support

__WARNING__: This addon uses __contextual helpers__ and is therefore only
compatible with apps built with Ember.js version __2.3__ and up.

## Using Ember Form For

### Quickstart example

```hbs
{{#form-for object as |f|}}
  {{f.text-field "firstName"}}
  {{f.text-field "lastName"}}
  {{f.select-field "gender" "unknown male female"}}
  {{f.date-field "birthDate"}}

  {{f.email-field "emailAddress"}}
  {{f.text-field "userName"}}
  {{f.password-field "password" hint="Must be at least six characters long and include a capital letter"}}

  {{f.checkbox-field "terms" label="I agree to the Terms of Service"}}

  {{f.reset  "Clear form"}}
  {{f.submit "Create account"}}
{{/form-for}}
```

### How to use the `{{form-for}}` component

The first parameter passed into the `{{form-for}}` component should be an
object. This should be the object which holds the properties the form fields
should edit.

For example, if I had an instance of the following Ember Data model:

```js
DS.Model.extend({
  firstName: DS.attr('string'),
  lastName:  DS.attr('string'),
  birthDate: DS.attr('date')
});
```

Then we can create following form, based on the attributes of the model.

```hbs
{{#form-for person as |f|}}
  {{f.text-field "firstName"}}
  {{f.text-field "lastName"}}
  {{f.date-field "birthDate"}}

  {{f.submit "Save"}}
{{/form-for}}
```

#### Updating properties

Also by default, if you change any values in the form, then the values on the
object are automatically updated. This can be overidden by passing in a custom
`update` action. The update action will be passed three parameters: `object`,
`propertyName` and `value`. The first param (`object`) is the object the form
describes, the second param (`propertyName`) is the property the update value is
for, the third param (`value`) is the new value.

### Available form field components

#### Text fields

* `{{color-field}}`
* `{{email-field}}`
* `{{file-field}}`
* `{{hidden-field}}`
* `{{password-field}}`
* `{{search-field}}`
* `{{tel-field}}`
* `{{text-field}}`
* `{{textarea-field}}`
* `{{url-field}}`

The `{{email-field}}` component can be passed the attribute `multiple`.

#### Numerical/Date/Time fields

* `{{date-field}}`
* `{{datetime-field}}`
* `{{datetime-local-field}}`
* `{{month-field}}`
* `{{number-field}}`
* `{{range-field}}`
* `{{time-field}}`
* `{{week-field}}`

All date/time fields can process `Date` objects.

All fields can be passed the `min`, `max` and `step` attributes.

#### Radio Field

`{{radio-field}}` should be passed a second param. This second param should be
the value the `{{radio-field}}` belongs to.

As example:

```hbs
{{f.radio-field "gender" "female"}}
```

Will render:

```html
<div>
  <label><input type="radio" value="female" />Female</label>
</div>
```

#### Checkbox Field

`{{checkbox-field}}` has no special options.

#### Select Field

`{{select-field}}` works a little bit different from other fields.

The simplest example is as follows:
```hbs
{{f.select-field "gender" "unknown male female"}}
```

This will render a select element with three options: `unknown`, `male`,
`female`. It will set the property `gender` of the object to the selected value.

The second param to `{{select-field}}` should be the options of the select box.
This may be either a space separated string or an array of strings/objects.

Set the attribute `multiple` to true, to create a multiple select box.

If the passed in options are objects, you can specify `optionValuePath` to tell
the select box to use the given path on the objects to retrieve the value for
the options. You can also specify `optionLabelPath` to tell the select box to
use that path on the object to get the value for the labels of the select box
options.

An example:

```js
options: [
  { id: 1, value: 'unknown' },
  { id: 2, value: 'male' },
  { id: 3, value: 'female' }
]
```
```hbs
{{f.select-field "gender" options optionValuePath="id" optionLabelPath="value"}}
```
```html
<select>
  <options value="1">unknown</options>
  <options value="2">male</options>
  <options value="3">female</options>
</select>
```

If you want to group the passed in objects, then you can use `groupLabelPath`.
This will sort all options by the `groupLabelPath` and then create an `optgroup`
element around all options with equal `groupLabelPath` values.

### Buttons

#### `{{f.submit}}`

By default the submit button for a form will try to call `save` on the object
passed in to the form. You can override this by passing a custom `submit` action
to the `{{form-for}}` component. The custom submit action will be passed the
object the form describes.

#### `{{f.reset}}`

By default the reset button for a form will try to call `rollback` on the object
passed in to the form. You can override this by passing a custom `reset` action
to the `{{form-for}}` component. The custom reset action will be passed the
object the form describes.

#### `{{f.button}}`

The `{{button}}` is just a simple form button, you should pass it a `click` action.

### Custom fields

If you want to use custom form controls, then your form control must at least
adhere to the following signature:

```hbs
{{my-custom-input value update=(action 'update')}}
```

Then you can use that custom input as following:

```hbs
{{#form-for myObject as |f|}}
  {{f.custom-field "myProperty" control="my-custom-input"}}
{{/form-for}}
```

If you also want to be able to control the layout of the custom field:

```hbs
{{#form-for myObject as |f|}}
  {{#f.custom-field "myProperty" control="my-custom-input" as |ff|}}
    {{#ff.label}}
      {{ff.control}}
      {{ff.labelText}}
    {{/ff.label}}
  {{/f.custom-field}}
{{/form-for}}
```

### Custom CSS classes

You can configure the following custom css classes:
+ `fieldClasses` - Classes on the field itself
+ `fieldErrorClass` - Adds this class when the field has errors
+ `errorClasses` - Errors on the field have these classes
+ `hintClasses` - The hint has these classes
+ `inputClasses` - The control has these classes
+ `labelClasses` - The label has these classes
+ `buttonClasses` - Adds these classes to buttons
+ `resetClasses` - Adds these classes to reset buttons
+ `submitClasses` - Adds these classes to submit buttons

An example:

```hbs
{{#form-for object as |f|}}
  {{f.text-field "firstName" fieldClasses=classesForField}}
{{/form-for}}
```

You can also put custom classes in your `config/environment`:

```js
module.exports = function(environment) {
 var ENV = {
   'ember-form-for': {
      buttonClasses: ['form-button'],
      fieldClasses: ['form-field'],
      fieldErrorClass: 'form-field--has-errors',
      errorClasses: ['form-field--errors'],
      hintClasses: ['form-field--hint'],
      inputClasses: ['form-field--control'],
      labelClasses: ['form-field--label'],
      resetClasses: ['form-button--reset'],
      submitClasses: ['form-button--submit']
   }
 }
};
```

## Installation

```sh
$ ember install ember-form-for
```
