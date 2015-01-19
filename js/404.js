define(["templates", "libs/vendor/i18n!nls/locales", "views/base"], function(templates, locales, BaseView) {
  var Error404View;
  Error404View = BaseView.extend({
    templates: templates,
    locales: locales
  });
  return Error404View;
});
