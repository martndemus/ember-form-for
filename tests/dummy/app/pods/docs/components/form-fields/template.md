# form-fields

The form-field components are yielded from the `{{form-for}}` component. All the
available form-field components are:

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

All those components are [contextual components](http://emberjs.com/blog/2016/01/15/ember-2-3-released.html#toc_contextual-components).
The form controls have the `object` and the `update` action pre-bound to it.

## Syntax

```hbs
{{#form-for object as |f|}}
  {{f.text-field "propertyName"}}
{{/form-for}}
```

## Parameters

### object

The object the form field is for. By default `object` is the object passed to
the `{{form-for}}` component, but you can override it if you want to.

### propertyName

This tells the form field which property of the object to use as value. Can be
passed as the first positional param.

### update

The action that handles updates to the value of the form-field by the user. By
default this action is passed down from the `{{form-for}}` component.

### label

The text value for the label of the form-field. By default is inferred from the
`propertyName` attribute or lookup up from the i18n service if available.

### hint

Text to be displayed along the control as a hint to the user.

### required

If set to `true` it will mark the field as required.
