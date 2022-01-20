const knex=require("../database/db")

order=(req,res)=>{
    or={
        // cart_id:req.body.cart_id,
        shipping_id:req.body.shipping_id,
        tax_id:req.body.tax_id,
        customer_id:res.tokendata.customer_id,
        created_on:new Date()

    }
    knex("orders").insert(or)
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })

}


getOrder=(req,res)=>{
    knex.select("*").from("orders").where("order_id",req.params.id)
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res,send(err)
    })
}

// get order bye customer id
getOrderBYc_id=(req,res)=>{
    console.log(res.tokendata.customer_id);
    knex.select("*").from("orders").where("customer_id",res.tokendata.customer_id)
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res,send(err)
    })
}


// get order detail
getordrDetail=(req,res)=>{
    console.log(res.tokendata.customer_id);
    knex.select("*").from("order_detail").where("oder_id",req.params.order_id)
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res,send(err)
    })
}


module.exports={order,getOrder,getOrderBYc_id,getordrDetail}