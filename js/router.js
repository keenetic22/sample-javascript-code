define(['jquery', 'underscore', 'backbone', 'components/loader'], function($, _, Backbone, Loader) {
  "use strict";
  var Router, currentView, initialize, newView;
  newView = null;
  currentView = null;
  
  /*
   Overrides method loadUrl. Trigger 'routeNotFound' event when route does not matched.
  */
  (function() {
    var oldLoadUrl;
    oldLoadUrl = Backbone.History.prototype.loadUrl;
    _.extend(Backbone.History.prototype, {
      loadUrl: function() {
        var matched;
        matched = oldLoadUrl.apply(this, arguments);
        if (!matched) {
          this.trigger("routeNotFound", arguments);
        }
        return matched;
      }
    });
  }).call(this);
  
  /*
   Application router
  */ 
  Router = Backbone.Router.extend({
    /*
     Index action for the application  
     @property indexAction
     @type {string}
    */
    indexAction: '/admin/main',
    
    /*
     Login action for the application  
     @property indexAction
     @type {string}
    */
    loginAction: '/admin/login',
    
    /*
     Main view (navbar, sidebar, content, etc.) loaded state. Defaults to false.  
     @property mainViewLoaded
     @type {boolean}
    */
    mainViewLoaded: false,
    
    /*
     Main view (navbar, sidebar, content, etc.) loaded state. Defaults to false.  
     @property mainViewLoaded
     @type {boolean}
    */
    routes: {
      "": "index",
      "dashboard": "index",
      "404": "404"
    },
    
    /*
     Initialize method. Sets handlers for the routes.
     @method initialize
     @return {null}
    */ 
    initialize: function() {
      var handler, route, _ref;
      if (App.getUser().authorized) {
        _ref = this.routes;
        for (route in _ref) {
          handler = _ref[route];
          if (this.customRoute(route, handler) === false) {
            this.route(route, handler, this._load.bind(this, '.page-content-area', route));
          }
        }
      } else {
        this.mainViewLoaded = false;
        Loader.load('body', this.loginAction);
      }
      this.listenTo(Backbone.history, 'routeNotFound', this.onRouteNotFound);
    },
    
    /*
     Loads view by route
     @method _load
     @return {null}
    */ 
    _load: function(className, route) {
      if (this.mainViewLoaded !== false) {
        return Loader.load(className, route);
      } else {
        return Loader.load('body', this.indexAction, (function(_this) {
          return function() {
            _this.mainViewLoaded = true;
            return Loader.load(className, route);
          };
        })(this));
      }
    },
    
    /*
     Handles custom routes.
     @method customRoute
     @return {null}
    */
    customRoute: function(route, handler) {
      switch (handler) {
        case 'index':
          return this.route(route, handler, (function(_this) {
            return function() {
              return _this._load('.page-content-area', '/admin/blank');
            };
          })(this));
        case '404':
          return this.route(route, handler, (function(_this) {
            return function() {
              return _this._load('.page-content-area', '/admin/404');
            };
          })(this));
        default:
          return false;
      }
    },
    
    /*
     Handler when route is not found.
     @method onRouteNotFound
     @return {null}
    */
    onRouteNotFound: function() {
      return this.navigate('404', {
        trigger: true
      });
    }
  });

  initialize = function() {
    var router;
    router = new Router();
    Backbone.history.start();
    return router;
  };
  
  return {
    initialize: initialize
  };
});
