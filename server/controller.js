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

    storeClient: (req,res) => {
        sequelize.query(`

        INSERT INTO client(first_name,last_name,email,phone_number,zipcode)
        VALUES ('${req.body.first_name}','${req.body.last_name}','${req.body.email}','${req.body.phone_number}',${req.body.zipcode});
        
        SELECT bank_name,rep_name,bank_rep.phone_number AS rep_num,ranking,img_url
        FROM banks
        JOIN bank_services
        ON banks.bank_id = bank_services.bank_id
        JOIN services
        ON bank_services.service_id = services.service_id
        JOIN bank_rep
        ON banks.bank_id = bank_rep.bank_id
        WHERE service_name = '${req.body.loan_type}';

        `).then(dbres => {
            res.status(200).send(dbres[0]);
        }).catch(err => console.log(err));
    }
  }