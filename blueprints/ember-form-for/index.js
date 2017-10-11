var VersionChecker = require('ember-cli-version-checker');

module.exports = {

  name: 'ember-form-for',

  normalizeEntityName: function() {},

  afterInstall: function() {
    var addon = this;
    var checker = new VersionChecker(addon);
    var addonPackages = [];

    if (checker.for('ember', 'bower').satisfies('>= 2.3')) {
      addonPackages.push({name: 'ember-getowner-polyfill', target: '^2.0.1'});

      return addon.addAddonsToProject({ packages: addonPackages });
    }

  }
};
