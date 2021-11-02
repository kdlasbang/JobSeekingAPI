module.exports = app => {
    const Applicant = require("../controllers/Applicants.controller.js");
  
    // Create a new Customer
    app.post("/Applicants", Applicant.create);
  
    // Retrieve all Customers
    app.get("/Applicants", Applicant.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/Applicants/:ApplicantID", Applicant.findOne);
  
    // Update a Customer with customerId
    app.put("/Applicants/:ApplicantID", Applicant.update);
  
    // Delete a Customer with customerId
    app.delete("/Applicants/:ApplicantID", Applicant.delete);
  
    // Create a new Customer
    app.delete("/Applicants", Applicant.deleteAll);
  };