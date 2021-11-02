module.exports = app => {
    const Match = require("../controllers/Match.controller.js");
  
    // Create a new Match
    app.post("/Match", Match.create);
  
    // Retrieve all Match
    app.get("/Match", Match.findAll);
  
    // Retrieve a single Match with MatchID
    app.get("/Match/:MatchID", Match.findOne);
  
    // Update a Match with MatchID
    app.put("/Match/:MatchID", Match.update);
  
    // Delete a Match with MatchID
    app.delete("/Match/:MatchID", Match.delete);
  
    // Create a new Match
    app.delete("/Match", Match.deleteAll);
  };