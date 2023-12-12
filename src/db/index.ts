import {Sequelize} from 'sequelize';
import {comments} from '../../models/comments';
import {likesdislikes} from '../../models/likesdislikes';
import {subscriptions} from '../../models/subscriptions';
import {test} from '../../models/test';
import {users} from '../../models/users';
import {videos} from '../../models/videos';
import { logger } from '../utils/logger';


export class Database {
    private sequelize: Sequelize;
  
    constructor() {
      this.sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'Colegio5',
        database: 'ytClone',
        logging: false //si lo quiero lo quito
        // logging: (msg) => logger.info(msg), //si lo quiero lindo
      });
    }
  
    public async connect() {
      try {
        await this.sequelize.authenticate();
        console.log('Connection has been established successfully.');
  
        //ALL MODELS GO HERE
        comments.initModel(this.sequelize);
        likesdislikes.initModel(this.sequelize);
        subscriptions.initModel(this.sequelize);
        test.initModel(this.sequelize);
        users.initModel(this.sequelize);
        videos.initModel(this.sequelize);

  
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    }
  
    public async close() {
      await this.sequelize.close();
    }
  }