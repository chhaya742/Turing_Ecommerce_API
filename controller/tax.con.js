const knex=require("../database/db")
gettax=(req, res) => {
    knex.select("*").from("tax")
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
  


gettaxById=(req, res) => {
    knex
      .select("*")
      .from("tax").where("tax.tax_id",'=',parseInt(req.params.id))
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

module.exports={gettax,gettaxById}
  