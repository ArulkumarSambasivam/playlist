app.factory('Auth', function(){
var _isLoggedin = false;
var _token = "";
var _user = null;
return{
    setUser : function(aUser,loggedin){
    	_user = aUser;
        _isLoggedin = loggedin;
    },
    setToken : function(token){
		_token = token;
    },
    getToken : function(){
    	return _token;
    },
    isLoggedIn : function(){
        return (_isLoggedin)? _isLoggedin : false;
    },
    getUser : function(){
    	return _user;
    }
  }
})

app.service('dataService', function($http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    this.getDataWithToken = function(url,param,callbackFunc) {
        $http({
            method: 'GET',
            url: url,
            params: param,
            headers: {'x-access-token': "token"}
        }).success(function(data){
            // With the data succesfully returned, call our callback
            callbackFunc(data);
        }).error(function(){
            alert("error");
        });
     }
     this.postDataWithToken  = function(url,param,callbackFunc) {
        $http({
            method: 'POST',
            url: url,
            params: param,
            headers: {'x-access-token': "token"}
        }).success(function(data){
            // With the data succesfully returned, call our callback
            callbackFunc(data);
        }).error(function(){
            alert("error");
        });
     }

      this.getDataWithoutToken = function(url,param,callbackFunc) {
        $http({
            method: 'GET',
            url: url,
            params: param
            }).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
      callbackFunc(response);
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
     callbackFunc(response);
  });
     }
     this.postDataWithoutToken  = function(url,param,callbackFunc) {
        $http({
            method: 'POST',
            url: url,
            params: param
        }).success(function(data){
            // With the data succesfully returned, call our callback
            callbackFunc(data);
        }).error(function(){
            alert("error");
        });
     }
});