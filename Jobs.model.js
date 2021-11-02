const sql = require("./db.js");

// constructor
const Job = function(customer) {
  this.Company = customer.Company;
  this.Title = customer.Title;
  this.Location = customer.Location;
  this.Description = customer.Description;
  this.Skill= customer.Skill;
  this.Salary= customer.Salary;
  this.Info= customer.Info;
};

Job.create = (newCustomer, result) => {
  sql.query("INSERT INTO Jobs SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { JobID: res.insertId, ...newCustomer });
    result(null, { JobID: res.insertId, ...newCustomer });
  });
};

Job.findById = (customerId, result) => {
  sql.query(`SELECT * FROM Jobs WHERE JobID = ${customerId}`, (err, res) => {
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

    // not found Job with the JobID
    result({ kind: "not_found" }, null);
  });
};

Job.getAll = result => {
  sql.query("SELECT * FROM Jobs", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Jobs: ", res);
    result(null, res);
  });
};

Job.updateById = (JobID, customer, result) => {
  sql.query(
    "UPDATE Jobs SET Company = ?, Title = ?, Location = ?,Description=?,Skill=?,Salary=?,Info=? WHERE JobID = ?",
    [customer.Company, customer.Title, customer.Location,customer.Description,customer.Skill,customer.Salary,customer.Info, JobID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Job with the JobID
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { JobID: JobID, ...customer });
      result(null, { JobID: JobID, ...customer });
    }
  );
};

Job.remove = (JobID, result) => {
  sql.query("DELETE FROM Jobs WHERE JobID = ?", JobID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Job with the JobID
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with JobID: ", JobID);
    result(null, res);
  });
};

Job.removeAll = result => {
  sql.query("DELETE FROM Jobs", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Jobs`);
    result(null, res);
  });
};

module.exports = Job;