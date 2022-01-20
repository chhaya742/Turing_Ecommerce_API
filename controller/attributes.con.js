const knex = require("../database/db");

getattributes=(req, res) => {
    knex
      .select("*")
      .from("attribute")
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
  


getattributebyID=(req, res) => {
    knex
      .select("*")
      .from("attribute").where(" attribute.attribute_id",'=',parseInt(req.params.id))
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

getValue=(req, res) => {
    knex
      .select("attribute_value_id","value")
      .from("attribute_value")
      .where("attribute_value.attribute_id",'=',parseInt(req.params.id))
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

getallattribut=(req, res) => {
    knex
      .select("*")
      .from("product_attribute")
      .where("product_attribute.product_id",'=',parseInt(req.params.id))
      .then((data) => {
        if(data.length!=0){
        knex
          .select("attribute_value_id","value")
          .from("attribute_value")
          .then((data1)=>{
            res.send(data1)})}

      else{
        res.send(data)
      }
    })
      .catch((er) => {
        console.log(er);
        res.json({ message: er });
      });
  };


module.exports={getattributes,getattributebyID,getValue,getallattribut}
  