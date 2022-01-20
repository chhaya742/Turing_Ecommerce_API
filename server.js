const express=require("express")
const router=require("./routes/router")
const app=express();

require("dotenv").config();

const multer=require("multer")
const upload=multer();
app.use(upload.array());



app.get("/",(req,res)=>{
  res.json("hello")
});


app.use("/",router)

app.listen(process.env.port,()=>{
  console.log("done");
})