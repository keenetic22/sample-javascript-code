define(["jquery", "underscore", "backbone", "router"], function($, _, Backbone, Router) {
  "use strict";
  var Application;
  /*
   Main application class
  */ 	
  Application = (function() {
    /*
      Application user
      @property _user 
      @type {object} 
    */
    Application.prototype._user = {
      authorized: true
    };
    
    /*
      Application router
      @property _router
      @type {Backbone.Router} 
    */		
    Application.prototype._router = null;
    
    /*
      Constructor   
    */
    function Application() {
      return;
    }
    
    /*
      @method getUser
      @return {Object} 
    */	
    Application.prototype.getUser = function() {
      return this._user;
    };

    Application.prototype.initialize = function() {
      this._router = Router.initialize();
    };

    return Application;

  })();
  return new Application;
});
