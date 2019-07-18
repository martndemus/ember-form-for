/*jshint node:true*/
'use strict';

module.exports = function(/* environment, appConfig */) {
  return {

    'ember-form-for': {
      errorsPath: 'error.PROPERTY_NAME.validation'
    }
  };
};
