const {Model} = require('objection');
const User = require('./user');

class Userlogin extends Model {
	static get tableName() {
		return 'user_login';
	}

	static relationshipMappings() {
		return {
			user: {
				relation: Model.HasOneRelation,
				modelClass: User,
				join: {
					from: 'user.id',
					to: 'user_login.user_id'
				}
			}
		};
	}
}

module.exports = Userlogin;