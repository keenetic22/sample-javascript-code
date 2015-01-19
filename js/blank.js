define(["templates", "libs/vendor/i18n!nls/locales", "views/base"], function(templates, locales, BaseView) {
  var BlankView;
  BlankView = BaseView.extend({
    templates: templates,
    locales: locales
  });
  return BlankView;
});
