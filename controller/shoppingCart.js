const knex=require("../database/db")
const generateUniqueId = require('generate-unique-id');
const { put } = require("../routes/router");
const { updatec } = require("./customer.con");
const { DATETIME } = require("mysql/lib/protocol/constants/types");
 

generateId=(req,res)=>{
    const id = generateUniqueId({
        length: 32,
        useLetters: true
      });
    res.send(id)

}

addShopping_cart=(req,res)=>{
    const add={
        cart_id :req.body.cart_id,
        product_id:req.body.product_id,
        attributes:req.body.attributes,
        quantity :req.body.quantity,
        added_on:new Date()
    }
    knex("shopping_cart").insert(add).where("shopping_cart.product_id",req.body.product_id)
    .then((d)=>{
        res.send(d)
        })
    .catch((err)=>{
        res.send(err)
    })
}
// get all all product
getp=(req,res)=>{
    knex.select("shopping_cart.item_id","product.name","shopping_cart.attributes","product.product_id","product.price","shopping_cart.quantity","product.image").from("shopping_cart").join("product","shopping_cart.product_id","product.product_id")
    .where("cart_id",req.params.id)
    .then((data)=>{
        res.send(data)
    })

}
// put
Update=(req,res)=>{
    knex("shopping_cart").where("item_id",req.params.id)
    .update({
        item_id:req.body.item_id,
        // name: req.body.name,
        attributes:req.body.attributes,
        product_id:req.body.product_id,
        // price:req.body.price,
        quantity:req.body.quantity,
        subtotal:req.body.subtotal
    })
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
}


delete2=(req,res)=>{
    knex.delete("*").from("shopping_cart").where("cart_id",req.params.id)
    .then((data)=>{
      res.send("deleted")
  
    }).catch((err)=>{
        res.send(err)
    })
  
  
  }
  

module.exports={generateId,addShopping_cart,getp,Update,delete2}