const sql = require("./db.js");

// constructor
const Match = function(match) {
  this.ApplicantID = match.ApplicantID;
  this.JobID = match.JobID;
  this.Status = match.Status;
  this.Percentage = match.Percentage;
};

Match.create = (newMatch, result) => {
  sql.query("INSERT INTO Matches SET ?", newMatch, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created match: ", { MatchID: res.insertId, ...newMatch });
    result(null, { MatchID: res.insertId, ...newMatch });
  });
};

Match.findById = (id, result) => {
    console.log(id);

  sql.query(`SELECT * FROM Matches WHERE MatchID = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found match: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Match with the MatchID
    result({ kind: "not_found" }, null);
  });
};

Match.getAll = result => {
  sql.query("SELECT * FROM Matches", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Match: ", res);
    result(null, res);
  });
};

Match.updateById = (MatchID, match, result) => {
  sql.query(
    "UPDATE Matches SET ApplicantID = ?, JobID = ?, Status = ?,Percentage = ? WHERE MatchID = ?",
    [match.ApplicantID, match.JobID, match.Status, match.Percentage, MatchID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Match with the MatchID
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated match: ", { MatchID: MatchID, ...match });
      result(null, { MatchID: MatchID, ...match });
    }
  );
};

Match.remove = (MatchID, result) => {
  sql.query("DELETE FROM Matches WHERE MatchID = ?", MatchID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Match with the MatchID
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted match with MatchID: ", MatchID);
    result(null, res);
  });
};

Match.removeAll = result => {
  sql.query("DELETE FROM Matches", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Match`);
    result(null, res);
  });
};

module.exports = Match;