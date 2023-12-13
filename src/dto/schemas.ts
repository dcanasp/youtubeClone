export class UsersSchemas {
	public RegisterSchema: any;
	public LoginSchema: any;
	constructor() {
		this.RegisterSchema = {
			type: 'object',
			required: ['username', 'password', 'email'],
			//additionalProperties: true, //si quiero el white list off (no lo quiero)
			properties: {
				username: { type: 'string' },
				password: { type: 'string' },
				email: { type: 'string' },
				bio: { type: 'string' },
				profilePicUrl: { type: 'string' }
			}
		};

		this.LoginSchema = {
			type: 'object',
			required: ['password'],
			//additionalProperties: true, //si quiero el white list off (no lo quiero)
			properties: {
				username: { type: 'string' },
				password: { type: 'string' },
				email: { type: 'string' },
			}
		};

	}
}
