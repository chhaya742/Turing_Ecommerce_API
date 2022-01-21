const knex=require("../database/db")
const generateUniqueId = require('generate-unique-id');


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
        quantity :1,
        added_on:new Date()
    }
    knex("shopping_cart").insert(add).where("shopping_cart.product_id",req.body.product_id)
    .then((d)=>{
        knex.select("shopping_cart.item_id","product.name",
        "shopping_cart.attributes",
        "product.product_id",
        "product.price",
        "shopping_cart.quantity",
        "product.image").from("shopping_cart").join("product","shopping_cart.product_id","product.product_id").where("item_id",d)
        .then((d2)=>{
            for(i of d2){
                const subtotal=d2[0].quantity*d2[0].price
               i["subtotal"]=subtotal

            }
            
            res.send(d2)
        })
        .catch((e)=>{
            res.send(e)
        })
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
Update1=(req,res)=>{
    knex("shopping_cart")
    .where("item_id",req.params.id)
    .update({
        quantity:req.body.quantity
    })
    .then((data)=>{
        res.send(data)
        knex.select("shopping_cart.item_id","product.name","shopping_cart.attributes","product.product_id","product.price","shopping_cart.quantity").from("shopping_cart")
        .join("product","shopping_cart.product_id","product.product_id").where("cart_id",data)
        .then((d)=>{
            res.send(d)
            console.log(d);
        }).catch((e)=>{
            res.send(e)
            console.log(e);
        })
        
    }).catch((err)=>{
        res.send(err)
        console.log(err);
    })
}

//empty cart
delete2=(req,res)=>{
    knex.delete("*").from("shopping_cart").where("cart_id",req.params.id)
    .then((data)=>{
      res.send("deleted")
  
    }).catch((err)=>{
        res.send(err)
    })
  
  
  }
 
// get total amount
getAmount=(req,res)=>{
    knex.select("*").from("shopping_cart").join("product","shopping_cart.product_id","product.product_id").where("cart_id",req.params.id)
    .then((data)=>{
        total_amount=0
        for ( i of data){
            total_amount+=data[0].quantity*data[0].price
        }
        // console.log(total_amount);
        res.send({"total_amount":total_amount})

    }).catch((err)=>{
        res.send(err)
    })
}

// remove product
removeProduct=(req,res)=>{
    knex.delete("*").from("shopping_cart").where("product_id",req.params.id)
    .then((data)=>{
        res.send("no data")
    }).catch((err)=>{
        res.send(err)
    })
}

module.exports={generateId,addShopping_cart,getp,Update1,delete2,getAmount,removeProduct}
