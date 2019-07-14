exports.up = function (knex) {
	return knex.schema
		.createTable('user', (table) => {
			table.uuid('id').notNullable().primary();
			table.string('email').notNullable();
			table.boolean('confirmed').notNullable().defaultTo(false);
			table.string('first_name').notNullable();
			table.string('last_name').notNullable();
			table.string('nick_name').nullable();
			table.dateTime('dob').nullable();
		})
		.createTable('user_login', (table) => {
			table.string('login_provider').notNullable();
			table.string('provider_key').notNullable();
			table.uuid('user_id').notNullable().references('id').inTable('user').index().onDelete('CASCADE');
		})
		.createTable('sessions', (table) => {
			table.string('sid', 255).notNullable().primary();
			table.json('sess').notNullable();
			table.timestamp('expired', {useTz: true}).notNullable();
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('user_login')
		.dropTableIfExists('user')
		.dropTableIfExists('sessions');
};
