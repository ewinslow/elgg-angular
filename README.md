elgg-angular
============

Integrates AngularJS into Elgg


How it works
------------

The ng/init view bootstraps

Modules, directives, filters, etc. are mapped to standard locations in the views system:

 * Modules: `js/ng/modules/{moduleName}.js`
 * Directives: `js/ng/directives/{directiveName}/factory.js`
 * Filters: `js/ng/filters/{filterName}.js`

The `ng/init` asynchronously bootstraps the current document using the required
AngularJS modules for that page.

As of 0.0.1, this list of modules included on any given page is hardcoded,
but this will likely become customizable soon as we will want to support:

  * Plugins defining their own modules to be loaded onto the page
  * Only loading the minimum set of modules needed for any given page


