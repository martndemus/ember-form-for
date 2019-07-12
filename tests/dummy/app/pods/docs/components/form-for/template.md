# form-for

The `{{form-for}}` component is the main component from this addon. All forms
built with this addon should start with this component.

## Syntax

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

## Parameters

### object

The object the form fields are for. It can be a js object, an ember object, an ember-data model or a changeset (see [ember-changeset](https://github.com/poteto/ember-changeset))

### update

This action is called every time a field is updated. It will pass three
arguments: `object`, `property` and `value`. By default it will automatically
update the property on the object with the new value.

### submit

This action is called when a submit button is clicked. It will pass the object
as first argument. By default it will call the `save` function on the object.
This action also supports returning a promise, which the `{{f.submit}}` component,
which uses [ember-async-button], will handle to show different states.

### reset

This action is called when a reset button is clicked. It will pass the object
as first argument. By default it will call the `rollback` function on the
object.
