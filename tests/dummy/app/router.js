import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from './config/environment';

const Router = AddonDocsRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  docsRoute(this, function() {
    this.route('usage');
    this.route('quickstart');

    this.route('components', function() {
      this.route('form-for');
      this.route('form-fields');
    });

    this.route('integrations', function() {
      this.route('i18n');
      this.route('ember-changeset');
    });

    this.route('examples', function() {
      this.route('basic');
      this.route('complex');
      this.route('ember-changeset');
      this.route('i18n');
    });
  });
});

export default Router;
