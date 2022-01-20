require("dotenv").config();
const {verify } = require("jsonwebtoken");
authentication=(req,res,next)=>{
    token1=req.cookies;
    // console.log(token1);
    if (token1.user==undefined){
        res.send({succses:0,
        message:"authentication erroe"})
    }
    else{
    verify(token1.user,process.env.secret_key,(err,tokendata)=>{
        if(err){
            console.log(err);
            res.send({message:"authentication  erro"});
  
        }
        else if(tokendata==undefined){
            res.send({message:"authentication error"})
        }
        else{
            res.tokendata=tokendata
            next()
    }
  
    })}
  
  }
module.exports=authentication
