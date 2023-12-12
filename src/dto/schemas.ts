export class UsersSchemas {
    public RegisterSchema: any;

    constructor() {
        this.RegisterSchema = {
            type: 'object',
            required: ['username', 'password','email'],
            //additionalProperties: true, //si quiero el white list off (no lo quiero)
            properties: {
              username: { type: 'string' },
              password: { type: 'string' },
              email: { type: 'string' },
              bio:{ type: 'string' },
              profilePicUrl: {type: 'string'}
            }
          };



    }
}
