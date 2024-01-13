import dotenv from 'dotenv';
dotenv.config();
import { Database } from "./db/index";
import {App} from './app'
const main = async () => {
  // instance ORM and start the Database Conecction
  const db = new Database();
  await db.connect();
  // instance fastify web service
  await new App().startApp(+process.env.PORT! || 3005);

    

    // try {
    //     const testData = await test.findAll();
    //     const rowValues = testData.map(data => data.dataValues);
    //     console.log(testData[0].dataValues.id);
    //     console.log(rowValues);
    //     const comment = await users.findAll();
    //     console.log(comment)
    // } catch (error) {
    //     console.error('Error fetching data:', error);
    // }
  
    // Optionally close the connection when done
    // await db.close();
  }
  
  main();