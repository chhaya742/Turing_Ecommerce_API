const knex=require("../database/db")
getshipping=(req, res) => {
    knex.select("*").from("shipping_region")
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
  


getShippingById=(req, res) => {
    knex
      .select("*")
      .from("shipping")
      .where("shipping.shipping_id",'=',parseInt(req.params.id))
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

module.exports={getshipping,getShippingById}
  