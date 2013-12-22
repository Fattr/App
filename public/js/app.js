angular.module('mean', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.articles', 'mean.dashboard', 'nvd3ChartDirectives']);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.dashboard', []);
angular.module('nvd3ChartDirectives', []);
// You have to download the directive manually since it's not available on bower
// http://cmaurer.github.io/angularjs-nvd3-directives/stacked.area.chart.html
// rename the unzipped folder to nvd3-directive and put it in the lib folder