const customer = require('./controller');
module.exports = app => {
  //erstellen von neuem customer (SQL-Insert)
  app.post("/customer", customer.create);

  //Abrufen alle customers (SQL-SELECT)
  app.get('/customers', customer.findAll);

  //Abrufen ein customers (SQL-SELECT)
  app.get('/customer/:id', customer.findOne);

  //Löschen alle customers (SQL-SELECT)
  app.delete('/customers', customer.deleteAll);

  //Updaten vom customer mit customerId (SQL-UPDATE)
  app.put('/customer/:id', customer.update);

  //Löschen vom customer mit customerId (SQL-UPDATE)
  app.delete('/customer/:id', customer.deleteById);
};
