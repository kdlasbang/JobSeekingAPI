const Match = require("../Match.model.js");

// Create and Save a new Match
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Match
    const match = new Match({
      ApplicantID: req.body.ApplicantID,
      JobID: req.body.JobID,
      Status: req.body.Status,
      Percentage: req.body.Percentage
    });
  
    // Save Match in the database
    Match.create(match, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Match."
        });
      else res.send(data);
    });
  };

// Retrieve all Matchs from the database.
exports.findAll = (req, res) => {
    Match.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Matchs."
          });
        else res.send(data);
      });
};

// Find a single Match with a MatchID
exports.findOne = (req, res) => {
    Match.findById(req.params.MatchID, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Match with MatchID ${req.params.MatchID}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Match with MatchID " + req.params.MatchID
            });
          }
        } else res.send(data);
      });
};

// Update a Match identified by the MatchID in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Match.updateById(
    req.params.MatchID,
    new Match(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Match with MatchID ${req.params.MatchID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Match with MatchID " + req.params.MatchID
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Match with the specified MatchID in the request
exports.delete = (req, res) => {
    Match.remove(req.params.MatchID, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Match with MatchID ${req.params.MatchID}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Match with MatchID " + req.params.MatchID
            });
          }
        } else res.send({ message: `Match was deleted successfully!` });
      });
};

// Delete all Matchs from the database.
exports.deleteAll = (req, res) => {
    Match.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Matchs."
          });
        else res.send({ message: `All Matchs were deleted successfully!` });
      });
};