# Ember Form For

![Download count all time](https://img.shields.io/npm/dt/ember-form-for.svg)
[![npm version](https://badge.fury.io/js/ember-form-for.svg)](http://badge.fury.io/js/ember-form-for)
[![CircleCI](https://circleci.com/gh/martndemus/ember-form-for.svg?style=shield)](https://circleci.com/gh/martndemus/ember-form-for)
[![Ember Observer Score](http://emberobserver.com/badges/ember-form-for.svg)](http://emberobserver.com/addons/ember-form-for)

This Ember.js addon will give you an easy way to build good forms:
  * Supports all HTML5 input types, textarea and select, backed by [`ember-one-way-controls`](https://github.com/DockYard/ember-one-way-controls)
  * Automatically adds labels, hints and errors to the form controls
  * Is built with data down - actions up in mind
  * Standard markup has built-in accessibility support
  * Compatible with [`ember-changeset`](https://github.com/DockYard/ember-changeset) (see [instructions](#ember-changeset))
  * Compatible with [`ember-i18n`](https://github.com/jamesarosen/ember-i18n) (see [instructions](#i18n))

__WARNING__: This addon uses __contextual helpers__ and is therefore only
compatible with apps built with Ember.js version __2.3__ and up.

__NOTE__: I'm working on rewriting docs, [click here](https://github.com/martndemus/ember-form-for/tree/1.4.1) for the old docs!

## Installation

```
ember install ember-form-for
```

## Quickstart Example

```hbs
{{#form-for newUser as |f|}}
  {{f.text-field "firstName"}}
  {{f.text-field "lastName"}}

  {{#fields-for newUser.address as |fa|}}
    {{fa.text-field "street"}}
    {{fa.text-field "city"}}
    {{fa.text-field "state"}}
    {{fa.text-field "zipCode"}}
  {{/fields-for}}

  {{f.select-field "gender" "unknown male female"}}

  {{f.date-field "birthDate"}}

  {{f.email-field "emailAddress"}}
  {{f.text-field "userName"}}
  {{f.password-field "password" hint="Must be atleast six characters long and include a capital letter"}}

  {{f.checkbox-field "terms" label="I agree to the Terms of Service"}}

  {{f.reset  "Clear form"}}
  {{f.submit "Create account"}}
{{/form-for}}
```

See this example in action: http://martndemus.github.io/ember-form-for/

### Breaking down the quickstart example

Let's first take a look at the `form-for` component itself:

```hbs
{{#form-for newUser as |f|}}
  {{! form fields go here }}
{{/form-for}}
```

The `{{form-for}}` component takes an object as first parameter, `newUser` in
this case, this is the object where the form fields will be created for.

It then yields `f`, `f` contains all form controls as [contextual components](http://emberjs.com/blog/2016/01/15/ember-2-3-released.html#toc_contextual-components).
This means that the components rendered with `f` already have `form-for`'s
context applied to it, you don't have to pass the target object to each
form control, `form-for` takes care of that.

For example `{{f.text-field "firstName"}}` will render an input that will update
the `firstName` property of the `newUser` object you have passed to the
`form-for` component. You didn't have to pass `newUser` again, because it's taken
from `form-for`'s context.

Next you see the `{{fields-for}}` component. This component is similar to
`form-for`, except it doesn't render a `<form>` element as outer element, this
is ideal to embed subsections to your form that operate on a different object.

Lastly there are the `{{f.reset}}` and `{{f.submit}}` button components. These
are getting passed the `reset` and `submit` action from the `form-for` component
respectively. By default the `reset` action will call the `rollback` function on
the object, the `submit` action will call the `save` function on the object.

## Table of Contents

- [Installation](#installation)
- [Quickstart Example](#quickstart-example)
- [Table of Contents](#table-of-contents)
- [Reference](#reference)
  + [`form-for`](#form-for)
  + [`form-fields`](#form-fields)
- [Integrations](#integrations)
  + [`i18n`](#i18n)
  + [`ember-changeset`](#ember-changeset)
- [Customizing/Extending](#customizing-extending) (Coming Soon™)
  + [Adding Class Names](#adding-class-names) (Coming Soon™)
  + [Using Custom Form Controls](#using-custom-form-controls) (Coming Soon™)
  + [Injecting Custom Fields Into Form For](#injecting-custom-fields-into-form-for) (Coming Soon™)

## Reference

## form-for

The `{{form-for}}` component is the main component from this addon. All forms
built with this addon should start with this component.

### Syntax

```hbs
{{#form-for object
    update=(action update)
    submit=(action submit)
    reset=(action reset)
    as |f|
}}
  {{! block content }}
{{/form-for}}
```

### Parameters

#### object

The object the form fields are for

#### update

This action is called every time a field is updated. It will pass three
arguments: `object`, `property` and `value`. By default it will automatically
update the property on the object with the new value.

#### submit

This action is called when a submit button is clicked. It will pass the object
as first argument. By default it will call the `save` function on the object.
This action also supports returning a promise, which the `{{f.submit}}` component,
which uses [ember-async-button], will handle to show different states.

#### reset

This action is called when a reset button is clicked. It will pass the object
as first argument. By default it will call the `rollback` function on the
object.

### Yields

#### formControls

An object containing form controls as [contextual components](http://emberjs.com/blog/2016/01/15/ember-2-3-released.html#toc_contextual-components).
The form controls have the `object` and the `update` action pre-bound to it.

The default form controls are:

 - checkbox-field
 - color-field
 - date-field
 - datetime-local-field
 - email-field
 - file-field
 - hidden-field
 - month-field
 - number-field
 - password-field
 - radio-field
 - radio-group
 - range-field
 - search-field
 - select-field
 - tel-field
 - text-field
 - textarea-field
 - time-field
 - url-field
 - week-field
 - custom-field

Additionally these buttons are also available:

 - button
 - reset
 - submit (uses [ember-async-button] so supports those options as well).

## form-fields

The form-field components are yielded from the `{{form-for}}` component. All the
available form-field components are described in the [`form-for`](#formControls) section.

### Syntax

```hbs
{{#form-for object as |f|}}
  {{f.text-field "propertyName"}}
{{/form-for}}
```

### Parameters

#### object

The object the form field is for. By default `object` is the object passed to
the `{{form-for}}` component, but you can override it if you want to.

#### propertyName

This tells the form field which property of the object to use as value. Can be
passed as the first positional param.

#### update

The action that handles updates to the value of the form-field by the user. By
default this action is passed down from the `{{form-for}}` component.

#### label

The text value for the label of the form-field. By default is inferred from the
`propertyName` attribute or lookup up from the i18n service if available.

#### hint

Text to be displayed along the control as a hint to the user.

#### required

If set to `true` it will mark the field as required.

## Integrations

## i18n

Ember Form For has out of the box support for
[ember-i18n](https://github.com/jamesarosen/ember-i18n). If your project has
this addon installed, it will automatically lookup the translation with the
following key algorithm:

  - By default it will use `property-name` as key. (e.g. `'first-name'`).
  - If `modelName` is set, or deducable from the object, then it will be
    prefixed to the key. (e.g. `'user.first-name'`)
  - If `i18nKeyPrefix` is set on the config, then this will be prefixed before
    `modelName` and `propertyName`. (e.g. `'my.arbitrary.key.user.first-name'`)

### Polyfilling i18n

The project does not have a hard dependency on ember-i18n, you can easily
drop-in your own implementation. All you need is a service called `i18n` that
has a function called `t`.

## ember-changeset

It's easy to integrate
[ember-changeset](https://github.com/DockYard/ember-changeset) and
[ember-changeset-validations](https://github.com/DockYard/ember-changeset-validations/)
with Ember Form For. All you have to do is to pass the changeset into the
`{{form-for}}` helper instead of the raw object:

```hbs
{{#form-for (changeset model validations) as |f|}}
  {{! form fields }}
{{/form-for}}
```

### Errors

To be able to use the errors generated by ember-changeset you need to configure
the following thing in your `config/environment.js` file:

```js
module.exports = function(environment) {
  var ENV = {
    'ember-form-for': {
      errorsPath: 'error.PROPERTY_NAME.validation',
    }
  };

  return ENV;
};
```

This is because ember-changeset stores it's errors on the `error.PROPERTY_NAME.validation` property,
while Ember Form For expects them (by default) to be on the `errors` property.

For those still using the old configuration of setting `errorsProperty`, this method will still work.
However, if both are defined then `errorsPath` will take precedence.

[ember-async-button]: https://github.com/DockYard/ember-async-button
