const knex = require("../database/db");



get1=(req, res) => {
    knex
      .select("*")
      .from("department")
      .then((data) => {
        console.log(data);
        res.json({ "success": true,
        "status": 200,
        "user": data });
      })
      .catch((er) => {
        console.log(er);
        res.json({ message: er });
      });
  };
  


getbyID=(req, res) => {
    knex
      .select("*")
      .from("department").where("department.department_id",'=',parseInt(req.params.id))
      .then((data) => {
        console.log(data);
        res.json({ "success": true,
        "status": 200,
        "user": data });
      })
      .catch((er) => {
        console.log(er);
        res.json({ message: er });
      });
  };

module.exports={get1,getbyID}
  
