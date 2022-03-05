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
          sequelize.query(`
                           CREATE TABLE banks(
                               bank_id SERIAL PRIMARY KEY,
                               bank_name VARCHAR(20) NOT NULL,
                               img_url TEXT
                           );

                           CREATE TABLE services(
                               service_id SERIAL PRIMARY KEY,
                               service_name VARCHAR(15)
                           );

                           CREATE TABLE bank_services(
                               bankservice_id SERIAL PRIMARY KEY,
                               bank_id INT NOT NULL REFERENCES banks(bank_id),
                               service_id INT NOT NULL REFERENCES services(service_id)
                           );

                           
                           CREATE TABLE clients(
                               client_id SERIAL PRIMARY KEY,
                               fname VARCHAR(20) NOT NULL,
                               lname VARCHAR(20) NOT NULL,
                               email VARCHAR(25) NOT NULL,
                               phone_number VARCHAR(12) NOT NULL,
                               zipcode INT NOT NULL
                           );

                           CREATE TABLE bank_rep(
                               rep_id SERIAL PRIMARY KEY,
                               bank_id INT REFERENCES banks(bank_id),
                               rep_name VARCHAR(25) NOT NULL,
                               phone_number VARCHAR(14) NOT NULL,
                               ranking FLOAT
                           );

                           `).then(dbres => {
                               res.status(200).send('done');
                           }).catch(err => console.log(err));
      },

      seedBanks: (req,res) => {
          sequelize.query(`
          INSERT INTO banks(bank_name,img_url)
          VALUES ('Rocky Mountain Union','https://bloximages.chicago2.vip.townnews.com/belgrade-news.com/content/tncms/assets/v3/classifieds/f/ae/fae0c425-2692-5970-9cb9-f5812a1b2d92/59ccf2afb75f4.image.jpg'),
          ('Chase Bank','https://thumbs.dreamstime.com/b/chase-bank-night-image-32897216.jpg'),
          ('Bank of America','https://image.cnbcfm.com/api/v1/image/103258050-IMG_8888r.jpg?v=1474949399&w=929&h=523'),
          ('Zions Bank','https://mallmaverick.imgix.net/web/property_managers/1/properties/709/stores/zions_bank/20191017165530/_asset_get_33494'),
          ('Alpine Credit Union','https://alpinecu.wpengine.com/wp-content/uploads/2016/11/alpineCU-logo.png');


          INSERT INTO bank_rep(bank_id,rep_name,       phone_number,ranking)
          VALUES (2,'Tom Sawyer','1-800-342-9081',4.3),(3,'Samwise Gamgee','1-800-0GO-LLUM',4.5),(4,'Jake from stateFarm','1-800-12S-HARK',4.3),(5,'John Cena','1-800-WWE-SMCK', 4.0),(6,'Riley Freeman','1-347-000-1234',4.8);
                        
          INSERT INTO bank_services(bank_id,service_id)
           VALUES (2,1),(2,2),(3,1),(3,2),(3,4),(4,2),(4,4),(5,4),(5,3),(6,3),(6,4);
          `).then(dbres => {
            res.status(200).send('Done');
          }).catch(err => console.log(err))
      }
  }