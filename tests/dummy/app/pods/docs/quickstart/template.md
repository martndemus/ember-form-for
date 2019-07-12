# QuickStart

## Example

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
  {{f.password-field "password" hint="Must be at least six characters long and include a capital letter"}}

  {{f.checkbox-field "terms" label="I agree to the Terms of Service"}}

  {{f.reset  "Clear form"}}
  {{f.submit "Create account"}}
{{/form-for}}
```

## Breaking down the quickstart example

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
