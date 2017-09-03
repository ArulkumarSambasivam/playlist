var UserProfileModel = function(cnf) {
    this.email = cnf.email;
    this.firstName = cnf.firstName;
    this.lastName = cnf.lastName;
    this.token = cnf.token;
};

module.exports = UserProfileModel;
