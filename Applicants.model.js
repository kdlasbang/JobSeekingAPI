const sql = require("./db.js");

// constructor
const Applicant = function(customer) {
  this.FirstName = customer.FirstName;
  this.LastName = customer.LastName;
  this.Email = customer.Email;
  this.Resume = customer.Resume;
  this.Skill= customer.Skill;
  this.Exp= customer.Exp;
  this.Info= customer.Info;
};

Applicant.create = (newCustomer, result) => {
  sql.query("INSERT INTO Applicants SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { ApplicantID: res.insertId, ...newCustomer });
    result(null, { ApplicantID: res.insertId, ...newCustomer });
  });
};

Applicant.findById = (customerId, result) => {
  sql.query(`SELECT * FROM Applicants WHERE ApplicantID = ${customerId}`, (err, res) => {
    if (err) {
        
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Applicant with the ApplicantID
    result({ kind: "not_found" }, null);
  });
};

Applicant.getAll = result => {
  sql.query("SELECT * FROM Applicants", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Applicants: ", res);
    result(null, res);
  });
};

Applicant.updateById = (ApplicantID, customer, result) => {
  sql.query(
    "UPDATE Applicants SET FirstName = ?, LastName = ?, Email = ?,Resume=?,Skill=?,Exp=?,Info=? WHERE ApplicantID = ?",
    [customer.FirstName, customer.LastName, customer.Email,customer.Resume,customer.Skill,customer.Exp,customer.Info, ApplicantID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Applicant with the ApplicantID
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { ApplicantID: ApplicantID, ...customer });
      result(null, { ApplicantID: ApplicantID, ...customer });
    }
  );
};

Applicant.remove = (ApplicantID, result) => {
  sql.query("DELETE FROM Applicants WHERE ApplicantID = ?", ApplicantID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Applicant with the ApplicantID
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with ApplicantID: ", ApplicantID);
    result(null, res);
  });
};

Applicant.removeAll = result => {
  sql.query("DELETE FROM Applicants", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Applicants`);
    result(null, res);
  });
};

module.exports = Applicant;