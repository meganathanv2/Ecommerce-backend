const express = require("express");
const mongoose = require("mongoose");
const Productrouter = require("./routes/productRoutes");
const userRouter = require('./routes/userRoutes');
const cardRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');
const cors=require('cors');
const bodyparser = require("body-parser");


const app = express();
app.use(bodyparser.json());

app.use(cors());
mongoose.connect(
  "mongodb+srv://Meganathan:Meganathan2005@cluster0.pxyjfnm.mongodb.net/database?retryWrites=true&w=majority&appName=Cluster0"
).then(() => {
  console.log("Mongodb connected");
});

app.set("view engine", "ejs");
app.use(express.json());

app.use('/', Productrouter);

app.use('/api/users', userRouter);
app.use('/api/carts', cardRouter);
app.use('/api/orders', orderRouter);

app.listen(3000, () => {
  console.log("server is running on the port 3000");
});
