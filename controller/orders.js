const knex=require("../database/db")

order=(req,res)=>{
    knex.select("*").from("shopping_cart").where("cart_id",req.body.cart_id).join("product","shopping_cart.product_id","product.product_id")
    .then((d1)=>{
        // console.log(d1.length);
        if(d1.length==0)
        {
            console.log("product is not in shopping_cart");
            res.send("product is not in shopping_cart")
        }
        else{
        knex("orders").insert({
            total_amount :d1[0].quantity*d1[0].price,
            created_on :new Date(),   
            customer_id :res.tokendata.customer_id,
            shipping_id:req.body.shipping_id,
            tax_id:req.body.tax_id
        })
        .then((d2)=>{
            // console.log(d1[0].product_id);
            knex("order_detail").insert({
                order_id:d2[0],
                product_id :d1[0].product_id,
                attributes:d1[0].attributes,
                product_name:d1[0].name,
                quantity:d1[0].quantity,
                unit_cost:d1[0].price
                })
                .then((d3)=>{
                    knex.del("*").from("shopping_cart").where("product_id",d1[0].product_id)
                    .then(()=>{
                        res.send({
                            "orderId": 1
                          })

                    })
                    
                    
                })
                .catch((e)=>{
                    res.send(e)
                    console.log(e);
                })
        })
        .catch((er)=>{
            res.send(er)
            console.log(er);
        })
    }
    }).catch((err)=>{
        res.send(err)
        console.log(err);
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
    knex.select("*").from("order_detail").where("order_id",req.params.id)
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
}


module.exports={order,getOrder,getOrderBYc_id,getordrDetail}
