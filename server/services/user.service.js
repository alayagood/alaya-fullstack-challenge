const User = require('models/user');

async function findUser({id, email}) {
	const query = {};
	id ? query._id = id : null;
	email ? query.email = email : null;

	const data = await User.findOne(query);

	if (!data) { throw new Error(`User not found: ${query}`) }

	return data;
}

async function createUser({
	name,
	email,
	password
}) {
	const newUser = new User({
		name,
		email,
	});
	const data = await newUser.saveWithoutPass(password)

	if (!data) {
		throw new Error(`Error creating a user by email: ${email}`);
	}

	return  cleanUser(data)
}

function cleanUser(data) {
	return data.toJSON({
		transform: (doc, ret) => {
			delete ret.salt;
			delete ret.hash;
			return ret;
		}
	});
}

module.exports = {
	findUser,
	createUser,
	cleanUser,
}