export class UsersSchemas {
	public RegisterSchema: any;
	public LoginSchema: any;
	public updateSchema: any;
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

		this.updateSchema = {
			type: 'object',
			//additionalProperties: true, //si quiero el white list off (no lo quiero)
			properties: {
				username: { type: 'string' },
				password: { type: 'string' },
				email: { type: 'string' },
				bio: { type: 'string' },
				profilePicUrl: { type: 'string' }
			}
		};
	}
}

export class VideosSchemas {
	public VideoSchema: any;
	constructor() {
		this.VideoSchema = {
			type: 'object',
			required: ['title','content'],
			properties: {
				// title: { type: 'string', maxLength: 255 },
				title: {  },
				description: {  },
				tags: {  },
				uploadDate: { type: 'string', format: 'date-time' },
				processingStatus: {  },
				fileUrl: {  },
				thumbnailUrl: {  },
				content: {}
				// content: {type: 'string'}

			}
		};

	}
}

