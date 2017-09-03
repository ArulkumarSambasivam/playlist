app.factory('LoginValidation', function(){
var user = true;

return{
    setUser : function(aUser){
        user = aUser;
    },
    isLoggedIn : function(){
        return (user)? user : false;
    }
  }
})