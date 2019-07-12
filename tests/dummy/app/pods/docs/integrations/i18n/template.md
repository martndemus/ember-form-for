# i18n

Ember Form For has out of the box support for
[ember-i18n](https://github.com/jamesarosen/ember-i18n). If your project has
this addon installed, it will automatically lookup the translation with the
following key algorithm:

- By default it will use `property-name` as key. (e.g. `'first-name'`).
- If `modelName` is set, or deducable from the object, then it will be
  prefixed to the key. (e.g. `'user.first-name'`)
- If `i18nKeyPrefix` is set on the config, then this will be prefixed before
  `modelName` and `propertyName`. (e.g. `'my.arbitrary.key.user.first-name'`)

## Polyfilling i18n

The project does not have a hard dependency on ember-i18n, you can easily
drop-in your own implementation. All you need is a service called `i18n` that
has a function called `t`.
