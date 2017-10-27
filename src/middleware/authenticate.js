const auth = require('basic-auth');

const {User} = require('./../models/user');


//middleware for auth tokens for users
let authenticate = (req, res, next) => {
	//grab & store authorization from request header
	let credentials = auth(req);

	if(credentials){
		//look in db for user with these credentials
		User.findByCredentials(credentials.name, credentials.pass).then(user => {
			//if no user reject the promise
			if (!user) {
				//valid email, but no user
				return Promise.reject();
			}

			//found valid user, set the request params to user found info
			req.user = user;
			//continue to rest of routes - next is required in middleware
			next();
		})
	} else {
		//catch error when no authenticate
		let err = new Error();
    err.message = 'You are not authorized to be here';
		return res.status(401).send(err);
	}
};

module.exports = {authenticate};
