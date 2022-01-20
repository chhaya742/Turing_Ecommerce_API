require("dotenv").config();
const authentication=require("../auth")
const express = require("express");
const router = express.Router();
const {get,getbyID}=require("../controller/department.con")

const {getCategories,getCategoriesbyID,getCategoriesby_p_ID,getCategoriesby_d_ID}=require("../controller/categories.con")

const {getattributes,getattributebyID,getValue,getallattribut}=require("../controller/attributes.con")

const {getproduct,searchproduct,getproductbyID,categoryId,departmentId,getDetailbyID,getLocation,getReview,Postreview}=require("../controller/product.con")

const {findbyId,register,updatec,UPDATEcustomerADDRESS,UserLogin,delete1,UPDATEcustomercreadit}=require("../controller/customer.con")

const { order,getOrder, getOrderBYc_id ,getordrDetail} = require("../controller/orders");

const {generateId,addShopping_cart, getp,delete2, Update}=require("../controller/shoppingCart")

const {gettax,gettaxById}=require("../controller/tax.con")

const {getshipping,getShippingById}=require("../controller/shipping.region")

const cookieparser=require("cookie-parser");
router.use(cookieparser());
// department
router.get("/departments",get);
router.get("/departments/:id",getbyID);

// category
router.get("/categories",getCategories);
router.get("/categories/:id",getCategoriesbyID);
router.get("/categories/inProduct/:id",getCategoriesby_p_ID)
router.get("/categories/inDepartment/:id",getCategoriesby_d_ID)

// attribute
router.get("/attributes",getattributes);
router.get("/attributes/:id",getattributebyID);
router.get("/attributes/values/:id",getValue);
router.get("/attributes/inProduct/:id",getallattribut);



// product
router.get("/products",getproduct);
router.get("/product/search",searchproduct);
router.get("/product/:id",getproductbyID);
router.get("/products/incategory/:id",categoryId);
router.get("/products/indepartment/:id",departmentId);
router.get("/products/:id/details",getDetailbyID);
router.get("/products/:id/location",getLocation);
router.get("/products/:id/Reviews",getReview);
router.post("/product/:id/review",authentication,Postreview);



// customer
router.get("/customer/:id",authentication,findbyId);
router.post("/register",register);
router.post("/login",UserLogin);
router.put("/customer",authentication,updatec);
router.put("/update1",authentication,UPDATEcustomerADDRESS);
router.delete("/delete",delete1)
router.put("/creditcard",authentication,UPDATEcustomercreadit)


// orders
router.post("/orders",authentication,order)
router.get("/orders/incustomer",authentication,getOrderBYc_id)
router.get("/orders/:id",authentication,getOrder)
router.get("/orders/shortdetail/:id",authentication,getordrDetail)



// shopping cart
router.get("/shoppingcart/generatUniqueId",generateId)
router.get("/shoppingcart/:id",getp)

router.post("/shoppingcart/add",addShopping_cart)
router.delete("/delete2/:id",delete2)
router.put("/shoppingcart/update/:id",Update)






// tax
router.get("/tax",gettax);
router.get("/tax/:id",gettaxById);


// shipping
router.get("/shipping/regions",getshipping);
router.get("/shipping/regions/:id",getShippingById);




module.exports = router;