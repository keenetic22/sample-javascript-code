define(["jquery", "underscore", "backbone", "views/abstract", "components/loader"], function($, _, Backbone, AbstractView, Loader) {
  "use strict";
  var BaseView;
  BaseView = AbstractView.extend({
    events: {},

    /*
    @method initialize
    @return {null}
     */
    initialize: function(opts) {
      AbstractView.prototype.initialize.apply(this, arguments);
      this.module = this.$el.data('module');
      if (this.$el.data('action')) {
        this.action = this.$el.data('action');
      }
      this.params = this.$el.data('params');
    },

    /*
      Returns html content for the view.
      @method afterRender. 
      @return {string}
     */
    template: function() {
      if (this.templates && this.locales) {
        return this.templates[this.action](this.locales);
      } else {
        return '';
      }
    },

    /*
      Renders view.
      @method render. 
      @return {BaseView}
     */
    render: function() {
      this.$el.html(this.template());
      this.afterRender();
      return this;
    },

    /*
      @method afterRender
      @return {null}
     */
    afterRender: function() {
      this.trigger('render');
      this.renderWidgets();
    },

    /*
      Finds widgets in view and renders them.
      @method renderWidgets.
      @return {null}
     */
    renderWidgets: function() {
      var opts, widget, widgets, _i, _len;
      widgets = this.$el.find('div.widget');
      for (_i = 0, _len = widgets.length; _i < _len; _i++) {
        widget = widgets[_i];
        opts = {
          module: $(widget).data('ms-module'),
          action: $(widget).data('ms-action'),
          params: $(widget).data('ms-params')
        };
        Loader.renderView(widget, opts);
      }
    }
  });
  return BaseView;
});
