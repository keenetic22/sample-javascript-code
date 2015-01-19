'use strict';
var jqueryPath;

if (((navigator.userAgent.indexOf("MSIE") !== -1)) || (!!document.documentMode === true)) {
  jqueryPath = 'libs/bower/jquery1x.min';
} else {
  jqueryPath = 'libs/bower/jquery.min';
}
/*
 Config for RequireJS
*/
require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    bootstrap: {
      deps: ['jquery']
    }
  },
  paths: {
    jquery: jqueryPath,
    backbone: 'libs/bower/backbone',
    underscore: 'libs/bower/underscore',
    bootstrap: 'libs/bower/bootstrap',
    vendor: "libs/vendor/",
    plugins: "libs/plugins/"
  }
});
/*
 Load application
*/
require(['app'], function(App) {
  window.App = App;
  return jQuery(function() {
    return App.initialize();
  });
});
