const Customer = require('./model');
const Validation = require('../ValidationService');
const HTTP_STATUS = require('../config/httpcodes.config');

//Create customer object
const customerObj = new Customer();

//Create and save new customer
function create(req,res){
  //Validate request
  if (!req.body){
    res.status(HTTP_STATUS.BAD_REQUEST).send({
      message: "Content can't be empty."
    });
  }
  //Parse data out from request body
  let data = {
    "firstName": req.body.firstName,
    "lastName": req.body.lastName,
    "email": req.body.email,
    "geburtstag": req.body.geburtstag,
    "adress": req.body.adress,
    "zipcode": req.body.zipcode,
    "city": req.body.city,
    "phone": req.body.phone,
    "registered": (new Date())
  };

  console.log(`Following data parsed from body ..`);
  console.log(data);

  let result = Validation.validateContact(data);
  if (result.isNotValid) {
    res.status(HTTP_STATUS.NOT_ACCEPTABLE).send(result.msg);
  } else {
    // Save Customer in the database
    customerObj.create(data, (err, result) => {
      if (err)
        res.status(HTTP_STATUS.SERVER_ERROR).send({
          message:
              err.message || "Some error occurred while creating the Customer."
        });
      else res.status(HTTP_STATUS.SUCCESSFUL_CREATED).send(result);
      //or
      //else res.status(201).send(`New Contact from ${data.email} has been inserted!`);
    });
  }
}

//Lesen Sie alle Kunden/Daten aus der Tabelle customer aus
function findAll(req,res){
  customerObj.getAll((err,result) => {
    if (err) {
      res.status(HTTP_STATUS.SERVER_ERROR).send({
        message:
            err.message || "Some error occurred while retrieving customers."
      });
    } else {
      res.send(result);
    }
  })
}

function findOne(req,res){

  customerObj.selectById(req.params.id, (err,result) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(HTTP_STATUS.NOT_FOUND).send({
          message: `Not found customer with id ${req.params.id}.`
        });
      } else {
        res.status(HTTP_STATUS.SERVER_ERROR).send({
          message:  `Error selecting customer with id ${req.params.id}.`
        })
      }
    } else res.send(result);
  })
}

function deleteAll(req,res){
  customerObj.deleteAll((err,result) => {
    if (err) {
      res.status(HTTP_STATUS.SERVER_ERROR).send({
        message:
            err.message || "Some error occurred while retrieving customers."
      });
    } else {
      res.send(result);
    }
  })
}


// Update a Customer identified by the customerId in the request
function update(req, res){
  // Validate Request
  if (!req.body) {
    res.status(HTTP_STATUS.BAD_REQUEST).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  customerObj.updateById(req.params.id, req.body,
      (err, result) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(HTTP_STATUS.NOT_FOUND).send({
              message: `Not found Customer with id ${req.params.id}.`
            });
          } else {
            res.status(HTTP_STATUS.SERVER_ERROR).send({
              message: `Error updating Customer with id ${req.params.id}.`
            });
          }
        } else res.send(result);
      }
  );
}

function deleteById(req,res){

  customerObj.deleteById(req.params.id, (err,result) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(HTTP_STATUS.NOT_FOUND).send({
          message: `Not found customer with id ${req.params.id}.`
        });
      } else {
        res.status(HTTP_STATUS.SERVER_ERROR).send({
          message:  `Error deleting customer with id ${req.params.id}.`
        })
      }
    } else res.send(result);
  })
}


module.exports = {
  create,
  findAll,
  findOne,
  deleteAll,
  update,
  deleteById,

}