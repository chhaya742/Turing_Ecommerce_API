const knex = require("../database/db");

getproduct=(req, res) => {
    // console.log(req.query);
    let order_list=[]
    let order_q=req.query.order
    let page_q=req.query.page
    let limit_q=req.query.limit
    
    if(page_q&&limit_q){
      page_q=parseInt(page_q)
      limit_q=parseInt(limit_q)
      page_q=(page_q*limit_q-limit_q)
    }
    else{
      page_q=0
      limit_q=50
    }
    knex.select("product_id","name","description","price","discounted_price","thumbnail").from("product")
      .limit(limit_q).offset(page_q)
      .then((data) => {
        res.json({ "count":data.length,
        "row": data });
      })
      .catch((er) => {
        console.log(er);
        res.json({ message: er });
      });
  };
    
  
// search product


searchproduct=(req, res) => {
  // console.log(req.query);
  let page_q=req.query.page
  let limit_q=req.query.limit
  let query_string=req.query.query_string
    term = "%" + query_string + "%";
    console.log(term);
  if(page_q&&limit_q){
    page_q=parseInt(page_q)
    limit_q=parseInt(limit_q)
    page_q=(page_q*limit_q-limit_q)
  }
  else{
    page_q=0
    limit_q=50
  }
    knex.select("product_id","name","description","price","discounted_price","thumbnail").from("product")
    .where('name', 'like', `%${term}%`)
      .limit(limit_q).offset(page_q)
      .then((data) => {
        console.log(data);
        res.json({ "count":data.length,
        "row": data });
      })
      .catch((er) => {
        console.log(er);
        res.json({ message: er });
      });
  };
  
// productId

getproductbyID=(req, res) => {
  knex.select("*").from("product")
    .from("product").where(" product. product_id",'=',parseInt(req.params.id))
    .then((data) => {
      console.log(data);
      res.json({
      "row": data });
    })
    .catch((er) => {
      console.log(er);
      res.json({ message: er });
    });
};

// categoryId
categoryId=(req, res) => {
  let page_q=req.query.page
  let limit_q=req.query.limit
  
  if(page_q&&limit_q){
    page_q=parseInt(page_q)
    limit_q=parseInt(limit_q)
    page_q=(page_q*limit_q-limit_q)
  }
  else{
    page_q=0
    limit_q=50
  }
  knex
    .select("product.product_id","product.name","product.description","product.price","product.discounted_price","product.thumbnail")
    .from("product_category")
    .join("product","product_category.product_id","product.product_id")
    .where("product_category.category_id",'=',parseInt(req.params.id))
    .limit(limit_q).offset(page_q)
    .then((data) => {
      console.log(data);
      res.json({
      "row": data });
    })
    .catch((er) => {
      console.log(er);
      res.json({ message: er });
    });
};


// by department id
departmentId=(req, res) => {
  let page_q=req.query.page
  let limit_q=req.query.limit
  
  if(page_q&&limit_q){
    page_q=parseInt(page_q)
    limit_q=parseInt(limit_q)
    page_q=(page_q*limit_q-limit_q)
  }
  else{
    page_q=0
    limit_q=50
  }
  knex
    .select("product.product_id","product.name","product.description","product.price","product.discounted_price","product.thumbnail")
    .from("category")
    .join("product_category","category.category_id","product_category.category_id")
    .join("product","product_category.product_id","product.product_id")
    .where("category.department_id",'=',parseInt(req.params.id))
    .limit(limit_q).offset(page_q)
    .then((data) => {
      console.log(data);
      res.json({ 
      "count":data.length,
      "row": data });
    })
    .catch((er) => {
      console.log(er);
      res.json({ message: er });
    });
};

// get details of project 
getDetailbyID=(req, res) => {
  knex
    .select("product_id","name","description","price","discounted_price","image","image_2")
    .from("product").where(" product. product_id",'=',parseInt(req.params.id))
    .then((data) => {
      console.log(data);
      res.json(data );
    })
    .catch((er) => {
      console.log(er);
      res.json({ message: er });
    });
};

// location

getLocation=(req, res) => {
  knex
    .select("category.category_id","category.name","department.department_id","department.name")
    .from("product_category")
    .join("category","product_category.category_id","category.category_id")
    .join("department","category.department_id","department.department_id")
    .where("product_category.product_id",'=',req.params.id)
     .then((data) => {
      console.log(data);
      res.json( data );
    })
    .catch((er) => {
      console.log(er);
      res.json({ message: er });
    });
};

// get review

 getReview=(req, res) => {
  knex
  .select( "customer.name","review.review","review.rating","review.created_on " )
    .from("review")
    .join("customer","review.customer_id","customer.customer_id")
    .where("product_id",parseInt(req.params.id))
  .then((data) => {
    console.log(data);
    res.json({ data: data });
  })
  .catch((er) => {
    console.log(er);
    res.json({ message: er });
  });
};


// post Review
Postreview=(req,res)=>{
  reviews={
      product_id :req.params.id, 
      review :"wertyuio",   
      rating:req.body.rating ,
      customer_id:res.tokendata.customer_id,
      created_on:new Date()

         
    }
    // console.log(req.body.review);
    knex("review").insert(reviews)
    .then((data)=>{
      res.send({message:"review post succesfuly"})
    }).catch((err)=>{
      res.send(err)
      console.log(err);

    });

}
module.exports={getproduct,searchproduct,getproductbyID,categoryId,departmentId,getDetailbyID,getLocation,getReview,Postreview}
