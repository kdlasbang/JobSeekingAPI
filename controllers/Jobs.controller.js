const Job = require("../Jobs.model.js");

// Create and Save a new Job
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Job
    const customer = new Job({
      Company: req.body.Company,
      Title: req.body.Title,
      Location: req.body.Location,
    Skill : req.body.Skill,
    Description : req.body.Description,
    Salary : req.body.Salary,
    Info : req.body.Info

    });
  
    // Save Job in the database
    Job.create(customer, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Job."
        });
      else res.send(data);
    });
  };

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Job.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
          });
        else res.send(data);
      });
};

// Find a single Job with a JobID
exports.findOne = (req, res) => {
    Job.findById(req.params.JobID, (err, data) => {
        console.log(req.params.JobID);

        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Job with id ${req.params.JobID}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Job with id " + req.params.JobID
            });
          }
        } else res.send(data);
      });
};

// Update a Job identified by the JobID in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Job.updateById(
    req.params.JobID,
    new Job(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Job with id ${req.params.JobID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Job with id " + req.params.JobID
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Job with the specified JobID in the request
exports.delete = (req, res) => {
    Job.remove(req.params.JobID, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Job with id ${req.params.JobID}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Job with id " + req.params.JobID
            });
          }
        } else res.send({ message: `Job was deleted successfully!` });
      });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Job.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all customers."
          });
        else res.send({ message: `All Customers were deleted successfully!` });
      });
};