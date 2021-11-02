module.exports = app => {
    const Job = require("../controllers/Jobs.controller.js");
  
    // Create a new Customer
    app.post("/Jobs", Job.create);
  
    // Retrieve all Customers
    app.get("/Jobs", Job.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/Jobs/:JobID", Job.findOne);
  
    // Update a Customer with customerId
    app.put("/Jobs/:JobID", Job.update);
  
    // Delete a Customer with customerId
    app.delete("/Jobs/:JobID", Job.delete);
  
    // Create a new Customer
    app.delete("/Jobs", Job.deleteAll);
  };