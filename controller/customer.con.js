const knex = require("../database/db");
const {sign}=require("jsonwebtoken")
const bcrypt=require("bcrypt")


//get customer by id

findbyId=(req, res) => {
  console.log(res.tokendata);
  knex
    .select("*")
    .from("customer").where('customer_id', '=', res.tokendata.customer_id)
    .then((data) => {
      if (data.length==0){
        console.log("user account not exist");
        res.json({message:"this user account not exist"})
      }
      else{
          res.json({"success": true,
          "status": 200,
          "message": "get successfull.",
        "customer":data})
        console.log({message:data});
        }
      })
}   
//Register customer
register=(req, res) => {
  const userdata = {     
    name:req.body.name,
    email :req.body.email,
    password:req.body.password
  };
  knex("customer")
    .insert(userdata)
    .join("shipping_region","customer.shipping_region_id ","shipping_region.shipping_region_id")
    .then((data) => {
      const token =sign({ customer_id: data[0].customer_id}, "chhayabagwan")
      console.log(token);
      // res.cookie("user",token)
      knex.select("customer_id","name","email","address_1","address_2","city","region","postal_code","shipping_region_id","credit_card","day_phone","eve_phone","mob_phone")
      .from("customer").where("customer.customer_id",data).then((data1)=>
        res.json({customer:data1,token:token,expires_in:"6h"})

      )
    })
    .catch((err) => {
      if (res.errorno=1062){
        res.json({message:"this email already exist"})}
        else{
        console.log(err);

      }
    });
};

// customer Login
UserLogin=(req,res)=>{
knex.from('customer').select("*").where("email","=",req.body.email,"password","=",req.body.password)
  .then((data) => {
    // console.log(data);
    if (data.length==0){
      console.log("user account not exist");
      res.json({message:"this user account not exist"})
    }
    else{
    const token=sign({customer_id:data[0].customer_id},"chhayabagwan",{ expiresIn:"6h"})
    res.cookie("user",token)
    // console.log(data.customer_id);
    // knex.select("customer_id","name","email","address_1","address_2","city","region","postal_code","shipping_region_id","credit_card","day_phone","eve_phone","mob_phone")
    // .from("customer").where("customer.customer_id",data.customer_id)
    // .then((data1)=>
          res.json({customer:{schema:data},token:token,expires_in:"2h"})
          console.log({message:data});
    }
  })
  .catch((err) => { 
    res.json({message:err })
    console.log({message:err });
    })
}
  

// UPDATE customer

updatec=(req, res) => {
  // console.log(res.tokendata);
  knex('customer').
      where('customer_id', '=', res.tokendata.customer_id)
      .update({
        name: req.body.name,
        email: req.body.email,
        password:req.body.password,
        day_phone:req.body.day_phone,
        eve_phone:req.body.eve_phone,
        mob_phone:req.body.mob_phone          
      })
      .then((data) => {
        knex.select("customer_id","name","email","address_1","address_2","city","region","postal_code","shipping_region_id","credit_card","day_phone","eve_phone","mob_phone")
        .from("customer").where('customer_id', '=', res.tokendata.customer_id).then((data1)=>
          res.json(data1)
  
        )

      })
      .catch((er) => {
          console.log(er);
          res.json({ "message": er })
      });
}

// UPDATE customer ADDRESS
UPDATEcustomerADDRESS=(req, res) => {
  knex('customer').where('customer_id', '=', res.tokendata.customer_id)
      .update({
         address_1: req.body. address_1,
         address_2: req.body.address_2,
         city:req.body.city,
         region:req.body.region,
         postal_code:req.body. postal_code,
         country:req.body.country,
         shipping_region_id:req.body.shipping_region_id         
      })
      .then((data) => {
        knex.select("customer_id","name","email","address_1","address_2","city","region","postal_code","shipping_region_id","credit_card","day_phone","eve_phone","mob_phone")
        .from("customer").where('customer_id', '=', res.tokendata.customer_id).then((data1)=>
          res.json(data1)
  
        )
      })
      .catch((er) => {
          console.log(er);
          res.json({ "message": er })
      });
}


// creadit cart update
UPDATEcustomercreadit=(req, res) => {
  knex('customer').where('customer_id', '=', res.tokendata.customer_id)
      .update({
        credit_card:req.body.credit_card
      })
      .then((data) => {
        knex.select("customer_id","name","email","address_1","address_2","city","region","postal_code","shipping_region_id","credit_card","day_phone","eve_phone","mob_phone")
        .from("customer").where('customer_id', '=', res.tokendata.customer_id).then((data1)=>
          res.json(data1)
  
        )
      })
      .catch((er) => {
          console.log(er);
          res.json({ "message": er })
      });
}



// //UserLogout
// userLogout = (req,res)=>{
//   res.clearCookie('user')
//   res.json({message:'logout successfully'})
// }

delete1=(req,res)=>{
  knex.delete("*").from("customer")
  .then((data)=>{
    res.send("deleted")

  })


}



module.exports = {findbyId,register,updatec,UPDATEcustomerADDRESS,UserLogin,delete1,UPDATEcustomercreadit}

