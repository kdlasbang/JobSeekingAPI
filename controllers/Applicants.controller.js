const Applicant = require("../Applicants.model.js");

// Create and Save a new Applicant
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Applicant
    const customer = new Applicant({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
    Birth : req.body.Birth,
    Phone : req.body.Phone,
    Address : req.body.Address

    });
  
    // Save Applicant in the database
    Applicant.create(customer, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Applicant."
        });
      else res.send(data);
    });
  };

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Applicant.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
          });
        else res.send(data);
      });
};

// Find a single Applicant with a ApplicantID
exports.findOne = (req, res) => {
    Applicant.findById(req.params.ApplicantID, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Applicant with id ${req.params.ApplicantID}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Applicant with id " + req.params.ApplicantID
            });
          }
        } else res.send(data);
      });
};

// Update a Applicant identified by the ApplicantID in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Applicant.updateById(
    req.params.ApplicantID,
    new Applicant(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Applicant with id ${req.params.ApplicantID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Applicant with id " + req.params.ApplicantID
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Applicant with the specified ApplicantID in the request
exports.delete = (req, res) => {
    Applicant.remove(req.params.ApplicantID, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Applicant with id ${req.params.ApplicantID}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Applicant with id " + req.params.ApplicantID
            });
          }
        } else res.send({ message: `Applicant was deleted successfully!` });
      });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Applicant.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all customers."
          });
        else res.send({ message: `All Customers were deleted successfully!` });
      });
};