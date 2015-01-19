define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
  "use strict";
  var AbstractView;
  AbstractView = function(options) {
    return Backbone.View.apply(this, [options]);
  };
  _.extend(AbstractView.prototype, Backbone.View.prototype, {

    /*
      Executed immediately when creating a new instance.
      Hides the containing element so that we can use the transitioning methods to show it.
      @method initialize
      @return {null}
     */
    initialize: function() {},
    show: function() {
      return this.$el.fadeIn(0);
    },
    hide: function(cb, scope, params) {
      return this.$el.fadeOut(0, function() {
        if (typeof cb === 'function') {
          if (typeof params === 'undefined') {
            params = [];
          }
          return cb.apply(scope, params);
        }
      });
    },

    /*
      Cleans up the view.  Unbinds its events and removes it from the DOM.
      @method clean
      @return {null}
     */
    clean: function() {
      this.undelegateEvents();
      return this.remove();
    }
  });
  AbstractView.extend = Backbone.View.extend;
  return AbstractView;
});
