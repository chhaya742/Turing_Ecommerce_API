require("dotenv").config();
const knex = require("knex")({
  client: "mysql",
  connection: {
    host:process.env.host,
    user:process.env.user,
    password:process.env.pass,
    database:process.env.db
  },
  // useNullAsDefault: true,
});

knex.schema.createTable("Shopping_cart", (table) => {
  table.increments("item_id").primary();
  table.string("cart_id").notNullable();
  table.integer("product_id").notNullable()
  table.string("attributes").notNullable();
  table.integer("quantity").notNullable();
  table.tinyint(" buy_now").default(1).notNullable();
  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.integer("subtotal").notNullable();

//   table.increments("item_id").primary();
//   table.varchar("cart_id").unique().notNullable()
//   table.string("attributes").notNullable();
//   table.integer("quantity").notNullable()
//   table.integer("product_id").notNullable()
//   table.tinyint("buy_now").default(1).notNullable()
//   table.datetime("added_on").notNullable()
//   table.integer("subtotal").notNullable()
//   table.decimal("price", [10], [2]).notNullable()
//   table.string("image").notNullable()
//   table.string("name").notNullable()
  
})
.then(()=>{
  console.log("table created");
}).catch((err)=>{
  console.log("table already created");
})
module.exports = knex