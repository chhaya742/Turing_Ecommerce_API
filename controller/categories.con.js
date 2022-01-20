const knex = require("../database/db");



getCategories=(req, res) => {
  console.log(req.query);
  let order_list=[]
  let order_q=req.query.order
  let page_q=req.query.page
  let limit_q=req.query.limit
  if(order_q){
    let order=order_q.split(",")
    console.log(order);
    order_list.push({"column":order[0],"order":order[1]})
  }
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
      .select("*")
      .from("category")
      .orderBy(order_list)
      .limit(limit_q).offset(page_q)
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
  
getCategoriesbyID=(req, res) => {
    knex
      .select("*")
      .from("category").where(" category. category_id",'=',parseInt(req.params.id))
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

  getCategoriesby_p_ID=(req, res) => {
    knex
        .select("category_id","department_id","name")
        .from("category")
        .where(" category.category_id",'=',parseInt(req.params.id))
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

getCategoriesby_d_ID=(req, res) => {
    knex
        .select("*")
        .from("category").join("department","category.department_id","department.department_id")
        .where(" category.department_id",'=',parseInt(req.params.id))
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



module.exports={getCategories,getCategoriesbyID,getCategoriesby_p_ID,getCategoriesby_d_ID}
  