define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
  "use strict";
  var _checkElement, _createElement, _parseParams, _parseUrl, _renderView, _setElementData;
  
  /*
   Parces url.
   @method _parseUrl
   @param url {string}
   @return {object} 
  */
  _parseUrl = function(url) {
    var parts;
    parts = url.split('/');
    return {
      module: parts[1],
      action: parts[2] ? parts[2] : 'main',
      params: parts[3] === void 0 ? '' : parts[3]
    };
  };

  /*
   Parces string param to object.
   @method _parseUrl
   @param params {string}
   @return {object} 
  */
  _parseParams = function(params) {
    var c, error, i, _i, _len;
    if (!params || params === null || params.length === 0) {
      return {};
    }
    try {
      params = JSON.parse(params);
    } catch (_error) {
      error = _error;
      c = params.split(';');
      params = {};
      for (_i = 0, _len = c.length; _i < _len; _i++) {
        i = c[_i];
        params['p' + i] = c[i];
      }
    }
    return params;
  };
  
  /*
   Sets data attributes for DOM object.
   @method _setElementData
   @param element {mixin}
   @param url {mixin}
   @return {object} 
  */
  _setElementData = function(element, url) {
    var opt, opts, value;
    opts = _parseUrl(url);
    for (opt in opts) {
      value = opts[opt];
      $(element).data('ms-' + opt, value);
    }
    return opts;
  };
 
  /*
   Requires and renders Backbone view.
   @method _setElementData
   @param element {mixin}
   @param url {mixin}
   @return {object} 
  */
  _renderView = function(element, opts, callback) {
    var error, key, url, view;
    url = '/static/' + opts.module + '/v2/js/' + opts.action + '.js';
    try {
      key = opts.module + ':' + opts.action;
        try {
          return require([url], (function(_this) {
            return function(viewClass) {
              var view = new viewClass({
                el: element
              });
              view.module = opts.module;
              view.action = opts.action;
              $(element).data("widget", view);
              view.once('render', function() {
                if (callback !== undefined) {
                  return callback.call();
                }
              });
              view.params = _parseParams(opts.params);
              return view.render();
            };
          })(this));
        } catch (_error) {
          error = _error;
          return console.log(error);
        }
      
    } catch (_error) {
      error = _error;
      console.log('Loading module error:', error);
      return false;
    }
  };

  /*
   Checks if element exists in the view
   @method _checkElement
   @param className {string}
   @return {boolean} 
  */
  _checkElement = function(className) {
    if ($(className)[0]) {
      return true;
    } else {
      return false;
    }
  };
  
  /*
   Creates DOM element for the Backbone view
   @method _checkElement
   @param className {string}
   @return {DOM element} 
  */ 
  _createElement = function(className) {
    var div;
    if (_checkElement(className) === false) {
      div = document.createElement('div');
      div.className = className.replace('.', '');
      return $('.page-content')[0].appendChild(div);
    }
  };
  /*
  Public functions 
  */
  return {
    /*
     Load Backbone.View to DOM element
     @method load
     @param element {string}
     @param url {string}
     @param callback {function}
     @return {DOM element} 
    */
    load: function(element, url, callback) {
      var currentView, key, opts, view;
      opts = _setElementData(element, url);
      key = opts.module + ':' + opts.action;
      if ($(element).data('loaded') !== key) {
        currentView = $(element).data('widget');
        if (currentView) {
          currentView.clean();
          element = _createElement(element);
        }
        view = _renderView(element, opts, callback);
        if (view !== false) {
          $(element).data('loaded', key);
        }
        return view;
      } else {
        if (callback !== undefined) {
          callback.call();
        }
      }
    },
    
    renderView: _renderView
  };
});
