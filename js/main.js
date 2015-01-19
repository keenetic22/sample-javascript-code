define(["templates", "libs/vendor/i18n!nls/locales", "views/base", "bootstrap"], function(templates, locales, BaseView) {
  var MainView;
  MainView = BaseView.extend({
    /*
     Template functions
     @property templates
     @type {object}
    */
    templates: templates,
    
    /*
     Translation strings
     @property locales
     @type {object}
    */
    locales: locales,
    
    /*
     Loads custom libs for bootstrap template
     @inheritdoc
    */
    afterRender: function() {
      BaseView.prototype.afterRender.apply(this, arguments);
      this.$el.removeClass('login-layout');
      this.$el.addClass('no-skin');
      this.$el.css("background-color", "");
      
      require(["vendor/ace-elements.min"]);
      require(["vendor/ace.min"]);
      if ('ontouchstart' in document.documentElement) {
        require(["plugins/jquery.mobile.custom.min"]);
      }
    }
  });
  return MainView;
});
