app.controller('LoginController', function($scope,$location,dataService,Auth) {	
	$scope.loginValidation = function(){
//$location.path("/playlist");
console.log($scope.user);
		dataService.getDataWithoutToken(ApiConstants.Logon,{email:$scope.user,passwordHash:$scope.pass},$scope.validateLogin)
	};

	$scope.validateLogin = function(res){
		console.log(res);
		if(res.status ==  200){
			if(res.data.success){
				$location.path("/playlist");
				Auth.setUser(res.data.extras.userProfileModel,true);
				Auth.setToken(res.data.extras.userProfileModel.token);
				$scope.loginfailed =  false;

			}else{
				$scope.loginfailed =  true;
				Auth.setUser(null,false);
				Auth.setToken("");
				$location.path("/login");
				
			}
			

		}else{
			$scope.loginfailed =  true;
			Auth.setUser(null,false);
			Auth.setToken("");
			$location.path("/login");

		}
	};
	//$scope.loginValidation();
	$scope.loginfailed =  false;
});

