const Sequelize = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(process.env.CONNECTION_STRING,{
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
  });


  module.exports = {
      seed: (req,res) => {
          sequelize.query(`DROP TABLE client;

                           CREATE TABLE client(
                           client_id SERIAL PRIMARY KEY,
                           first_name VARCHAR(20) NOT NULL,
                           last_name VARCHAR(20) NOT NULL,
                           email VARCHAR(25) NOT NULL,
                           zipcode INT NOT NULL);`
                           ).then(dbres => {
                               res.status(200).send('done');
                           }).catch(err => console.log(err));
      }
  }