app.config(function($routeProvider) {
	$routeProvider
		.when('/login', {
			templateUrl: 'templates/login.html',
			controller: 'LoginController'
		})
		.when('/playlist', {
			templateUrl: 'templates/main.html',
			controller: 'MainController'
		})
		.otherwise({
			redirectTo: '/login'
		});
});
app.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (event) {

        if (!Auth.isLoggedIn()) {
           // console.log('DENY');
           // event.preventDefault();
          //  $location.path('/login');
        }
        
    });
}]);